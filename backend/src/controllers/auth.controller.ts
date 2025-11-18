import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../utils/db';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';
import { AuthRequest } from '../middleware/auth';

export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-verify email on signup (email verification disabled)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isEmailVerified: true, // Auto-verified - no email verification needed
      },
      select: {
        id: true,
        email: true,
        name: true,
        isEmailVerified: true,
        isOnboardingComplete: true,
      },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Email verification disabled - no need to send verification email
    // Users can access the platform immediately after signup

    res.status(201).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const { password: _, refreshToken: __, ...userWithoutSensitive } = user;

    res.json({
      user: userWithoutSensitive,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    if (req.userId) {
      await prisma.user.update({
        where: { id: req.userId },
        data: { refreshToken: null },
      });
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

export const refresh = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const verifyEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { token } = req.body;

    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
      },
    });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Email verification failed' });
  }
};

export const resendVerification = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    const newToken = uuidv4();
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerificationToken: newToken },
    });

    await sendVerificationEmail(user.email, newToken);

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resend verification email' });
  }
};

export const forgotPassword = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if user exists
      return res.json({ message: 'If email exists, reset link has been sent' });
    }

    const resetToken = uuidv4();
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'If email exists, reset link has been sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request' });
  }
};

export const resetPassword = async (req: AuthRequest, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        gender: true,
        areaOfStudy: true,
        graduationYear: true,
        isEmailVerified: true,
        isOnboardingComplete: true,
        consentGiven: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/**
 * Development-only login endpoint
 * Allows instant login without credentials for testing
 * ONLY WORKS IN DEVELOPMENT MODE
 */
export const devLogin = async (req: AuthRequest, res: Response) => {
  // Security check: Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({
      error: 'Development login is only available in development mode'
    });
  }

  try {
    const { email, role } = req.body;

    // Default test user emails based on role
    const defaultEmails: Record<string, string> = {
      USER: 'student@corpready.in',
      ADMIN: 'admin@corpready.in',
      CURATOR: 'curator@corpready.in',
      OPS: 'ops@corpready.in',
      PARTNER: 'partner@corpready.in',
    };

    const targetEmail = email || defaultEmails[role || 'USER'] || defaultEmails.USER;

    // Find or create test user
    let user = await prisma.user.findUnique({ where: { email: targetEmail } });

    if (!user) {
      // Create test user if doesn't exist
      const hashedPassword = await bcrypt.hash('Test@123456', 10);

      const roleValue = role || 'USER';
      const roleName = roleValue.charAt(0).toUpperCase() + roleValue.slice(1).toLowerCase();

      user = await prisma.user.create({
        data: {
          email: targetEmail,
          password: hashedPassword,
          name: `Test ${roleName}`,
          role: roleValue as any,
          isEmailVerified: true,
          isOnboardingComplete: true,
          isActive: true,
          consentGiven: true,
          areaOfStudy: 'Computer Science',
          graduationYear: 2024,
        },
      });

      console.log(`✅ Created test user: ${user.email} (${user.role})`);
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Update refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        lastLoginAt: new Date(),
      },
    });

    const { password: _, refreshToken: __, ...userWithoutSensitive } = user;

    res.json({
      user: userWithoutSensitive,
      accessToken,
      refreshToken,
      message: `🚀 Logged in as ${user.email} (${user.role}) - Development Mode`,
    });
  } catch (error) {
    console.error('Dev login error:', error);
    res.status(500).json({ error: 'Development login failed' });
  }
};
