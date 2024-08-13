import { createClient } from 'redis'

// 1. 创建客户端
const client = await createClient()
  .on('error', err => console.error('Redis Client Error', err))
  .connect() // 2. <- 连接到服务器

console.log('isReady:', client.isReady)

// 3. 设置字符串
await client.set('whoami', 'Tony Stark')
// 4. 读取字符串
const value = await client.get('whoami')
console.log('whoami?', value)
//=> whoami? Tony Stark

// 5. 和服务器断开连接
await client.disconnect()
