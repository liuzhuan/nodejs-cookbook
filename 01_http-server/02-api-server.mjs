import { createServer } from 'node:http'
import querystring from 'node:querystring'

const port = 3000
const server = createServer((req, res) => {
  const { method, url, headers } = req
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  res.setHeader('Content-Type', 'application/json')

  const resData = {
    method,
    url,
    path,
    query,
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  } else if (method === 'POST') {
    const body = []
    req
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        const postData = Buffer.concat(body).toString()
        resData.postData = postData
        res.end(JSON.stringify(resData))
      })
  }
})

server.listen(port, () => {
  console.log(`server running on localhost:${port}`)
})
