import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Factory } from '@/infrastructure/factory/factory'

type JwtPayload = {
  id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send('Unauthorized')
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '', {
      algorithms: ['HS512']
    }) as JwtPayload

    const user = await new Factory()
      .buildUseCaseFactory()
      .buildUser()
      .buildFindOneById()
      .execute(id)

    if (!user) {
      return res.status(401).send('Unauthorized')
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(401).send('Unauthorized')
  }
}
