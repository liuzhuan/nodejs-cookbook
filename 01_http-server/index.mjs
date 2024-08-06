import { createServer } from 'node:http'
import querystring from 'node:querystring'

const server = createServer((req, res) => {
  console.log(req.method, req.url)

  req.query = querystring.parse(req.url.split('?')[1])
  console.log(`query string: ${JSON.stringify(req.query)}`)

  if (req.method === 'POST') {
    console.log('content-type:', req.headers['content-type'])

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      console.log(`post data: ${postData}`)
      res.end('hello world')
    })
  } else {
    // use `document.charset` to see current document's charset
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    res.end(`Hello Node.js!\nquery string: ${JSON.stringify(req.query)}`)
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
