import { Router } from 'express';
import usersAdminRoutes from './users.admin.routes';
import domainsAdminRoutes from './domains.admin.routes';
import coursesAdminRoutes from './courses.admin.routes';
import internshipsAdminRoutes from './internships.admin.routes';

const router = Router();

router.use('/users', usersAdminRoutes);
router.use('/domains', domainsAdminRoutes);
router.use('/courses', coursesAdminRoutes);
router.use('/internships', internshipsAdminRoutes);

export default router;
