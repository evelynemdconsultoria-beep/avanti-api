
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { json } from 'express'
import { authRouter } from './routes/auth.js'

const app = express()
app.use(cors())
app.use(helmet())
app.use(json())

app.get('/', (_req, res) => res.json({ ok: true, name: 'Avanti GR API (Teste)' }))
app.use('/auth', authRouter)

const port = Number(process.env.PORT || 4000)
app.listen(port, () => console.log(`API running on :${port}`))
