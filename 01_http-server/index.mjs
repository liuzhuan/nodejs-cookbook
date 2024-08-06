import { createServer } from 'node:http'
import querystring from 'node:querystring'

const server = createServer((req, res) => {
  console.log(req.method, req.url)
  const qs = querystring.parse(req.url.split('?')[1])
  console.log(`query string: ${JSON.stringify(qs)}`)

  // use `document.charset` to see current document's charset
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
  res.end(`Hello Node.js!\nquery string: ${JSON.stringify(qs)}`)
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
