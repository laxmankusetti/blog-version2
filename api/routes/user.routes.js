import express from 'express';
import { deleteUser, getUser, getUsers, signout, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId',verifyUser, updateUser)
router.delete('/delete/:userId',verifyUser, deleteUser)
router.get('/getusers', verifyUser, getUsers);
router.post('/signout', signout);
router.get('/:userId', getUser);

export default router;