import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email - CorpReady',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Welcome to CorpReady! 🚀</h1>
            <p style="margin: 10px 0 0;">From Campus to Corporate Success</p>
          </div>
          <div class="content">
            <h2>Verify Your Email</h2>
            <p>Thank you for joining CorpReady! Click the button below to verify your email and start your corporate readiness journey:</p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
            <p style="color: #6b7280; font-size: 14px;">Or copy this link: <br/>${verificationUrl}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your Password - CorpReady',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
          .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your CorpReady account password. Click the button below to choose a new password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p style="color: #6b7280; font-size: 14px;">Or copy this link: <br/>${resetUrl}</p>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <div class="warning">
              <strong>⚠️ Security Notice</strong><br/>
              If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
            </div>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendCertificateEmail = async (
  email: string,
  userName: string,
  courseName: string,
  certificateId: string
) => {
  const certificateUrl = `${process.env.FRONTEND_URL}/app/certificates?id=${certificateId}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: '🎓 Congratulations! Your Certificate is Ready - CorpReady',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
          .success { background: #D1FAE5; border-left: 4px solid #10B981; padding: 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎓 Congratulations, ${userName}!</h1>
            <p style="margin: 10px 0 0;">You've Earned a Certificate</p>
          </div>
          <div class="content">
            <div class="success">
              <strong>Course Completed!</strong><br/>
              You've successfully completed <strong>${courseName}</strong>
            </div>
            <p>Your dedication and hard work have paid off. We're proud to present you with your completion certificate!</p>
            <a href="${certificateUrl}" class="button">Download Certificate</a>
            <p><strong>Share your achievement:</strong></p>
            <ul>
              <li>Add it to your LinkedIn profile</li>
              <li>Include it in your resume</li>
              <li>Share it with potential employers</li>
            </ul>
            <p>Keep learning and growing with CorpReady!</p>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendCourseCompletionEmail = async (
  email: string,
  userName: string,
  courseName: string
) => {
  const dashboardUrl = `${process.env.FRONTEND_URL}/app`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `🎉 Course Completed: ${courseName} - CorpReady`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Amazing Progress, ${userName}!</h1>
          </div>
          <div class="content">
            <h2>You've Completed ${courseName}</h2>
            <p>Congratulations on finishing this course! You're one step closer to your corporate success goals.</p>
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Continue with your next recommended course</li>
              <li>Explore internship opportunities</li>
              <li>Book a mentorship session</li>
              <li>Take assessment quizzes to test your knowledge</li>
            </ul>
            <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendInternshipApplicationEmail = async (
  email: string,
  userName: string,
  internshipTitle: string,
  companyName: string
) => {
  const internshipsUrl = `${process.env.FRONTEND_URL}/app/internships`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Application Received: ${internshipTitle} - CorpReady`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
          .info-box { background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📨 Application Submitted!</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>We've successfully received your application for:</p>
            <div class="info-box">
              <strong>${internshipTitle}</strong><br/>
              ${companyName}
            </div>
            <p><strong>What happens next?</strong></p>
            <ol>
              <li>Your application is under review by our team</li>
              <li>We'll notify you of any status updates</li>
              <li>If shortlisted, you'll receive next steps via email</li>
            </ol>
            <p>Track your application status on your dashboard:</p>
            <a href="${internshipsUrl}" class="button">View My Applications</a>
            <p>Good luck! 🍀</p>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendInternshipStatusUpdateEmail = async (
  email: string,
  userName: string,
  internshipTitle: string,
  status: string,
  message?: string
) => {
  const internshipsUrl = `${process.env.FRONTEND_URL}/app/internships`;
  const statusColors: Record<string, string> = {
    approved: '#10B981',
    rejected: '#EF4444',
    shortlisted: '#F59E0B',
  };
  const statusColor = statusColors[status.toLowerCase()] || '#3B82F6';

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Application Update: ${internshipTitle} - CorpReady`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
          .status-box { background: ${statusColor}20; border-left: 4px solid ${statusColor}; padding: 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📢 Application Update</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>Your application for <strong>${internshipTitle}</strong> has been updated:</p>
            <div class="status-box">
              <strong>New Status:</strong> ${status.toUpperCase()}
              ${message ? `<br/><br/>${message}` : ''}
            </div>
            <a href="${internshipsUrl}" class="button">View Details</a>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

export const sendMentorshipBookingConfirmation = async (
  email: string,
  userName: string,
  mentorName: string,
  date: string,
  time: string,
  topic: string
) => {
  const mentorshipUrl = `${process.env.FRONTEND_URL}/app/mentorship`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Mentorship Session Confirmed: ${mentorName} - CorpReady`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
          .booking-details { background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">✅ Booking Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>Your mentorship session has been successfully booked:</p>
            <div class="booking-details">
              <strong>Mentor:</strong> ${mentorName}<br/>
              <strong>Date:</strong> ${date}<br/>
              <strong>Time:</strong> ${time}<br/>
              <strong>Topic:</strong> ${topic}
            </div>
            <p><strong>Prepare for your session:</strong></p>
            <ul>
              <li>Review the mentor's profile and expertise</li>
              <li>Prepare your questions in advance</li>
              <li>Have a notebook ready for key insights</li>
              <li>Join 5 minutes early to test your connection</li>
            </ul>
            <a href="${mentorshipUrl}" class="button">View My Bookings</a>
            <p>We'll send you a reminder 24 hours before your session.</p>
          </div>
          <div class="footer">
            <p>© 2025 CorpReady. Building careers, one skill at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};
