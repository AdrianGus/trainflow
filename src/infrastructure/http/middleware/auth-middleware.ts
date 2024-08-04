import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Factory } from '@/infrastructure/factory/factory'

type JwtPayload = {
  id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256']
    }) as JwtPayload

    const athlete = await new Factory()
      .buildUseCaseFactory()
      .buildAthlete()
      .buildFindOneById()
      .execute(id)

    if (!athlete) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    req.athlete = {
      id
    }

    return next()
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
