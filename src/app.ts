
import express, { Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './app/routers/routes';


const app = express()

app.use(cors({origin:['*'], credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send(' A tech server')
})




export default app;