    import { Router } from 'express';
    import { createUser, upload, authUser, updateUserProfile } from '../controllers/userController.js';
import protect from '../Middleware/authMiddleWaire.js';
    const userRouter = Router();
   

    userRouter.post('/signup',upload.single('file'),createUser)
    userRouter.post('/login',authUser)

    userRouter.route("/profile").post(protect,upload.single('file'),updateUserProfile)




    export default userRouter;