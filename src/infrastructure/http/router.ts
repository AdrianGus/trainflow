import { Router } from 'express'
import { AthleteHandler } from './handler/athlete-handler'
import { authMiddleware } from './middleware/auth-middleware'

const router = Router()

const athleteHandler = new AthleteHandler()

router.route('/athlete/register').post(athleteHandler.register.bind(athleteHandler))

router.route('/athlete/login').post(athleteHandler.login.bind(athleteHandler))

router.use(authMiddleware)

router.route('/athlete').get(athleteHandler.get.bind(athleteHandler))

export { router }
