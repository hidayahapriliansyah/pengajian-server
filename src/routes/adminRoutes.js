import express from 'express';
import * as adminController from '../controller/adminController/index.js';

const router = express.Router();

router.get('/signup', (req, res) => res.send('hello'));
router.post('/signup', adminController.signup_post);

router.get('/login', adminController.login_get);
router.post('/login', adminController.login_post);

router.get('/invite', () => {});
router.get('/invite:id', () => {});
router.patch('/invite', () => {});

router.get('/sponsor', () => {});
router.get('/sponsor/:id', () => {});
router.patch('/sponsor', () => {});

router.get('/user', () => {});
router.get('/user/:id', () => {});

router.patch('/user', () => {});
router.delete('/user', () => {});

// calendar of event
router.get('/events', () => {});
router.get('/events/history', () => {});

export default router;
