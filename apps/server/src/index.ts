import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

// In memory storage
const sessions:any = {}

const app = express()

app.use(express.json())

app.get('/ussd', async (req, res) => {
  const { sessionId, text} = req.body;

  if (!sessions[sessionId]) {
    sessions[sessionId] = { state: "START" }
  }

  let responseText = "";
  let { state } = sessions[sessionId]

  switch (state) {
    case 'START':
      responseText = `Welcome to MUA Insurance\n1. Get Covered \n2. View Policies`
      sessions[sessionId].state = 'MENU_SELECTION'
      break;

    // case 'MENU_SELECTION':
    //   switch (text) {
    //     case '1':
    //       responseText = `Select Product. \n1. Domestic Package \n2. Medical Insurance \n3.Motor`
    //       sessions[sessionId].state = 'PRODUCT_SELECTION'
    //       break;

    //     case '2':
    //       responseText = `END Coming Soon!`
    //       sessions[sessionId].state = 'VIEW_POLICIES_SELECTION'
    //       delete sessions[sessionId]
    //       break;
          
    //     default:
    //       break;
    //   }

    default:
      break;
  }

  res.set('Content-Type', 'text/plain')
  res.send(responseText)
})

const server = app.listen(4000, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`),
)


module.exports = app;