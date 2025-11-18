import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@skillpath.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'System Administrator',
      role: UserRole.ADMIN,
      isEmailVerified: true,
      isOnboardingComplete: true,
      isActive: true,
      consentGiven: true,
    },
  });

  console.log('✅ Admin user created:', {
    email: admin.email,
    role: admin.role,
  });

  // Create test users for all roles
  const testUsers = [
    {
      email: 'student@skillpath.com',
      password: 'Student@123',
      name: 'Test Student',
      role: UserRole.USER,
      isEmailVerified: true,
      isOnboardingComplete: true,
      isActive: true,
      consentGiven: true,
      areaOfStudy: 'Computer Science',
      graduationYear: 2024,
    },
    {
      email: 'curator@skillpath.com',
      password: 'Curator@123',
      name: 'Content Curator',
      role: UserRole.CURATOR,
      isEmailVerified: true,
      isOnboardingComplete: true,
      isActive: true,
      consentGiven: true,
    },
    {
      email: 'ops@skillpath.com',
      password: 'Ops@123456',
      name: 'Operations Manager',
      role: UserRole.OPS,
      isEmailVerified: true,
      isOnboardingComplete: true,
      isActive: true,
      consentGiven: true,
    },
    {
      email: 'partner@skillpath.com',
      password: 'Partner@123',
      name: 'Partner Organization',
      role: UserRole.PARTNER,
      isEmailVerified: true,
      isOnboardingComplete: true,
      isActive: true,
      consentGiven: true,
    },
  ];

  for (const userData of testUsers) {
    const hashedUserPassword = await bcrypt.hash(userData.password, 10);
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedUserPassword,
      },
    });
  }

  console.log('✅ Test users created for all roles');

  // Create sample domains
  const domains = [
    {
      name: 'Technology',
      description: 'Software development, data science, and IT skills',
      icon: '💻',
    },
    {
      name: 'Business',
      description: 'Management, marketing, and entrepreneurship',
      icon: '💼',
    },
    {
      name: 'Design',
      description: 'UI/UX design, graphic design, and creative skills',
      icon: '🎨',
    },
    {
      name: 'Data Science',
      description: 'Data analysis, machine learning, and AI',
      icon: '📊',
    },
    {
      name: 'Marketing',
      description: 'Digital marketing, SEO, and content marketing',
      icon: '📱',
    },
  ];

  for (const domain of domains) {
    await prisma.domain.upsert({
      where: { name: domain.name },
      update: {},
      create: domain,
    });
  }

  console.log('✅ Domains created');

  // Create sample topics for Technology domain
  const techDomain = await prisma.domain.findUnique({
    where: { name: 'Technology' },
  });

  if (techDomain) {
    const topics = [
      { name: 'Web Development', description: 'HTML, CSS, JavaScript, React, Node.js' },
      { name: 'Mobile Development', description: 'React Native, Flutter, iOS, Android' },
      { name: 'Cloud Computing', description: 'AWS, Azure, GCP, DevOps' },
      { name: 'Cybersecurity', description: 'Network security, ethical hacking' },
      { name: 'Database Management', description: 'SQL, MongoDB, PostgreSQL' },
      { name: 'AI & Machine Learning', description: 'Python, TensorFlow, PyTorch' },
    ];

    for (const topic of topics) {
      await prisma.topic.upsert({
        where: {
          id: `${techDomain.id}-${topic.name}`,
        },
        update: {},
        create: {
          ...topic,
          domainId: techDomain.id,
        },
      });
    }

    console.log('✅ Topics created for Technology domain');
  }

  console.log('🌱 Seed completed successfully!');
  console.log('\n📝 Test Credentials for All Roles:');
  console.log('\n👨‍💼 ADMIN (Full System Access):');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log('\n🎓 STUDENT (Regular User):');
  console.log('   Email: student@skillpath.com');
  console.log('   Password: Student@123');
  console.log('\n📚 CURATOR (Content Management):');
  console.log('   Email: curator@skillpath.com');
  console.log('   Password: Curator@123');
  console.log('\n⚙️  OPS (Operations):');
  console.log('   Email: ops@skillpath.com');
  console.log('   Password: Ops@123456');
  console.log('\n🤝 PARTNER (Partner Organization):');
  console.log('   Email: partner@skillpath.com');
  console.log('   Password: Partner@123');
  console.log('\n⚠️  IMPORTANT: These are test credentials for development only!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
