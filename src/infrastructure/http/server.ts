import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { router } from './router'
import { Database } from '../database/typeorm/database'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())

server.use(router)
server.set('port', 3001)

server.listen(server.get('port'), async () => {
  console.info(
    '\x1b[32m App is running at http://localhost:%d in %s mode \x1b[0m',
    server.get('port'),
    server.get('env')
  )

  await new Database().createConnection()

  try {
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
