import express from 'express';
import * as userController from '../controller/userController/index.js'; 

const router = express.Router();

router.get('/dashboard', userController.dashboard);

router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post);
router.get('/verify/:uniqueString', userController.verify_get);

router.get('/login', userController.login_get);
router.post('/login', userController.login_post);

router.get('/invite', userController.invite_get);
router.post('/invite', userController.invite_post);
router.get('/invite/create', userController.invite_create_get);
router.get('/invite/:id', userController.invite_detail_get);
router.get('/invite/:id/edit', userController.invite_edit_get);
router.patch('/invite', userController.invite_patch);
router.delete('/invite', userController.invite_delete);

router.get('/profile', userController.profile_get);
router.get('/profile/edit', userController.profile_edit);
router.patch('/profile', userController.profile_patch);

router.get('/sponsor', userController.sponsor_get);
router.post('/sponsor', userController.sponsor_post);
router.get('/sponsor/create', userController.sponsor_create_get);
router.get('/sponsor/:id', userController.sponsor_detail_get);
router.get('/sponsor/:id/edit', userController.sponsor_edit_get);
router.patch('/sponsor/:id', userController.sponsor_patch);
router.delete('/sponsor/:id', userController.sponsor_delete);

router.get('/notifications', userController.usernotifitacation_get);
router.post('/notifications', userController.usernotification_post);
router.patch('/notifications/:id', userController.usernotification_patch);

export default router;
