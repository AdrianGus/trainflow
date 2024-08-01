import { Factory } from '@/infrastructure/factory/factory'
import type { NextFunction, Request, Response } from 'express'

export class UserHandler {
  public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const user = await new Factory()
        .buildUseCaseFactory()
        .buildUser()
        .buildRegister()
        .execute(request.body)

      response.send(user)
    } catch (error) {
      next(error)
    }
  }

  public async login(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const user = await new Factory()
        .buildUseCaseFactory()
        .buildUser()
        .buildLogin()
        .execute(request.body)

      response.send(user)
    } catch (error) {
      next(error)
    }
  }

  public async get(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const user = await new Factory()
        .buildUseCaseFactory()
        .buildUser()
        .buildFindOneById()
        .execute(request.user.id.toString())

      response.send(user)
    } catch (error) {
      next(error)
    }
  }
}
