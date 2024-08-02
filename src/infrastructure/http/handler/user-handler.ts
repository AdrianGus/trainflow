import { BaseHandler } from './base-handler'
import type { NextFunction, Request, Response } from 'express'
import { Factory } from '@/infrastructure/factory/factory'
import { registerUserSchema } from '@/application/usecases/user/register/register-use-schema'
import { loginUserSchema } from '@/application/usecases/user/login/login-user-schema'

export class UserHandler extends BaseHandler {
  public async register(request: Request, response: Response): Promise<void> {
    try {
      registerUserSchema.parse(request.body)

      const user = await new Factory()
        .buildUseCaseFactory()
        .buildUser()
        .buildRegister()
        .execute(request.body)

      response.send(user)
    } catch (error) {
      this.handleError(response, error)
    }
  }

  public async login(request: Request, response: Response): Promise<void> {
    try {
      loginUserSchema.parse(request.body)

      const user = await new Factory()
        .buildUseCaseFactory()
        .buildUser()
        .buildLogin()
        .execute(request.body)

      response.send(user)
    } catch (error) {
      this.handleError(response, error)
    }
  }

  public async get(request: Request, response: Response): Promise<void> {
    try {
      const user = await new Factory()
        .buildUseCaseFactory()
        .buildUser()
        .buildFindOneById()
        .execute(request.user.id.toString())

      response.send(user)
    } catch (error) {
      this.handleError(response, error)
    }
  }
}
