import { createServer } from 'node:http'

const server = createServer((req, res) => {
  console.log(req.method, req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World!\n')
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
