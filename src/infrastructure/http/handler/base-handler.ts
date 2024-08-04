import { Response } from 'express'
import { ZodError } from 'zod'
import { ApiError } from '../util/api-errors'

export class BaseHandler {
  protected handleError(res: Response, error: unknown): Response<any, Record<string, any>> {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).send({ message: error.message })
    } else if (error instanceof ZodError) {
      const errors = error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
        type: issue.code
      }))

      return res.status(400).send({ message: 'Invalid fields', errors })
    } else {
      return res.status(500).send({ message: 'Internal server error' })
    }
  }
}
