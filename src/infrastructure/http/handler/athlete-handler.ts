import { BaseHandler } from './base-handler'
import type { NextFunction, Request, Response } from 'express'
import { Factory } from '@/infrastructure/factory/factory'
import { registerAthleteSchema } from '@/application/usecases/athlete/register/register-athlete-schema'
import { loginAthleteSchema } from '@/application/usecases/athlete/login/login-athlete-schema'

export class AthleteHandler extends BaseHandler {
  public async register(request: Request, response: Response): Promise<void> {
    try {
      registerAthleteSchema.parse(request.body)

      const athlete = await new Factory()
        .buildUseCaseFactory()
        .buildAthlete()
        .buildRegister()
        .execute(request.body)

      response.send(athlete)
    } catch (error) {
      this.handleError(response, error)
    }
  }

  public async login(request: Request, response: Response): Promise<void> {
    try {
      loginAthleteSchema.parse(request.body)

      const athlete = await new Factory()
        .buildUseCaseFactory()
        .buildAthlete()
        .buildLogin()
        .execute(request.body)

      response.send(athlete)
    } catch (error) {
      this.handleError(response, error)
    }
  }

  public async get(request: Request, response: Response): Promise<void> {
    try {
      const athlete = await new Factory()
        .buildUseCaseFactory()
        .buildAthlete()
        .buildFindOneById()
        .execute(request.athlete.id.toString())

      response.send(athlete)
    } catch (error) {
      this.handleError(response, error)
    }
  }
}
