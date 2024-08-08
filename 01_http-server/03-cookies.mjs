import { createServer } from 'node:http'

const server = createServer((req, res) => {
  if (req.url === '/set-cookie') {
    const expires = new Date(2025, 1, 1).toUTCString()
    res.setHeader('Set-Cookie', ['name=tony', 'nick=ironman', 'age=42'])
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('cookie is set')
  } else if (req.url === '/get-cookie') {
    const clientCookie = req.headers['cookie']
    const cookies = parseCookies(clientCookie)
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`client cookie: ${JSON.stringify(cookies)}`)
  } else {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(
      `<a href="/get-cookie">get cookie</a> | <a href="/set-cookie">set cookie</a>`,
    )
  }
})

function parseCookies(str) {
  return Object.fromEntries(str.split(';').map(item => item.trim().split('=')))
}

server.listen(3000, () => {
  console.log(`server running on localhost:3000`)
})
