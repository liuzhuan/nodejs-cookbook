import { createClient } from 'redis'

async function helloRedis() {
  try {
    // 创建客户端
    const client = createClient({
      url: 'redis://username:password@example.com:port',
    })

    // 处理连接错误
    client.on('error', err => console.log('Redis Client Error', err))

    // 连接到服务器
    await client.connect()

    // 设置并读取字符串
    await client.set('myname', 'codeman')
    const value = await client.get('myname')
    console.log(`myname: ${value}`)

    // 储存并检索哈希
    await client.hSet('user-session:123', {
      name: 'John',
      surname: 'Smith',
      company: 'Redis',
      age: 29,
    })
    const userSession = await client.hGetAll('user-session:123')
    console.log(JSON.stringify(userSession, null, 2))

    // Add members to a sorted set
    const numAdded = await client.zAdd('vehicles', [
      { score: 4, value: 'car' },
      { score: 2, value: 'bike' },
    ])
    console.log(`Added ${numAdded} items.`)

    // Iterate over the members of the sorted set
    for await (const { score, value } of client.zScanIterator('vehicles')) {
      console.log(`${value} -> ${score}`)
    }

    // 优雅断开连接
    await client.quit()
  } catch (e) {
    console.error(e)
  }
}

// 开始连接 Redis
helloRedis()
