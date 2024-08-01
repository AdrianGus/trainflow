import { Router } from 'express'
import { UserHandler } from './handler/user-handler'
import { authMiddleware } from './middleware/auth-middleware'

const router = Router()

const userHandler = new UserHandler()

router.route('/user/register').post(userHandler.register.bind(userHandler))

router.route('/user/login').post(userHandler.login.bind(userHandler))

router.use(authMiddleware)

router.route('/user').get(userHandler.get.bind(userHandler))

export { router }
