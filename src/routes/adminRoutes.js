import express from 'express';
import * as adminController from '../controller/adminController/index.js';

const router = express.Router();

// router.get('/signup', (req, res) => res.send('hello'));
// router.post('/signup', adminController.signup_post);

router.get('/login', adminController.login_get);
router.post('/login', adminController.login_post);

router.get('/', adminController.login_get);
router.post('/', adminController.login_post);

router.get('/dashboard', adminController.dashboard);

router.get('/invite', adminController.invite_get);
router.get('/invite:id', adminController.invite_detail_get);
router.patch('/invite', adminController.invite_patch);

router.get('/sponsor', adminController.sponsor_get);
router.get('/sponsor/:id', adminController.sponsor_detail_get);
router.patch('/sponsor', adminController.sponsor_patch);

router.get('/user', adminController.user_get);
router.get('/user/:id', adminController.user_detail_get);
router.delete('/user/:id', adminController.user_delete);
router.patch('/user/:id', adminController.user_patch);

router.get('/notification', adminController.adminnotifitacation_get);
router.post('/notification', adminController.adminnotification_post);
router.patch('/notification/:id', adminController.adminnotification_patch);

// calendar of event
// TODO
// ini nanti aja. Datanya bisa ngambil dari invitations ditampilin di tampilin di view dengan 
// fullcalendar
router.get('/events', () => {});
router.get('/events/history', () => {});

export default router;
