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
  console.log('\n📝 Admin Credentials:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log('\n⚠️  IMPORTANT: Change the admin password after first login!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
