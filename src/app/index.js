import netPkg from 'net'

import { Request, Response } from './libs/http/index.js'
import { PORT } from './config.js'
import app from './app.js'

const server = netPkg.createServer((socket) => {
  socket.on('data', (data) => {
    const req = new Request(data.toString())
    const res = new Response(req)
    socket.end(app.run(req, res).toString())
  })
})

server.listen(PORT, () => console.log(`on port ${PORT}`))
