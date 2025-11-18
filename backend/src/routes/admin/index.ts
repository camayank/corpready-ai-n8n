import { Router } from 'express';
import usersAdminRoutes from './users.admin.routes';
// Import other admin routes as they are created
// import domainsAdminRoutes from './domains.admin.routes';
// import coursesAdminRoutes from './courses.admin.routes';
// import internshipsAdminRoutes from './internships.admin.routes';
// import certificatesAdminRoutes from './certificates.admin.routes';
// import analyticsAdminRoutes from './analytics.admin.routes';

const router = Router();

// Mount admin sub-routes
router.use('/users', usersAdminRoutes);
// router.use('/domains', domainsAdminRoutes);
// router.use('/courses', coursesAdminRoutes);
// router.use('/internships', internshipsAdminRoutes);
// router.use('/certificates', certificatesAdminRoutes);
// router.use('/analytics', analyticsAdminRoutes);

export default router;
