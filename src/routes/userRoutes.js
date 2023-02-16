import express from 'express';
import userController from '../controller/userController.js'; 

const router = express.Router();

router.get('/', userController.index);

router.get('/signup', userController.signup_get);
router.post('/signup', userController.signup_post);

router.get('/login', userController.login_get);
router.post('/login', userController.login_post);

router.get('/invite', userController.invite_get);
router.post('/invite', userController.invite_post);
router.get('/invite/create', userController.invite_create);
router.get('/invite/:id', userController.invite_detail);
router.patch('/invite/:id', userController.invite_patch);
router.delete('/invite/:id', userController.invite_delete);

router.get('/profile', userController.profile_get);
router.get('/profile/edit', userController.profile_edit);
router.patch('/profile', userController.profile_patch);

router.get('/sponsor', () => {});
router.get('/sponsor/create', () => {});
router.post('/sponsor/create', () => {});
router.get('/sponsor/:id', () => {});
router.get('/sponsor/:id/edit', () => {});
router.patch('/sponsor/:id/edit', () => {});

router.get('/notifications', () => {});
router.patch('/notifications/:id', () => {});

export default router;