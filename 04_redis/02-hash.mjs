import { createClient } from 'redis'

const client = await createClient()
  .on('error', err => console.error('Redis Client Error', err))
  .connect()

// 设置哈希字段
await client.hSet('hero', {
  name: 'Tony Stark',
  age: 42,
  weapon: 'Ironman',
})

// 读取哈希值所有字段
const value = await client.hGetAll('hero')
console.log('hero:', value)
//=> hero: [Object: null prototype] {
//=>    name: 'Tony Stark'
//=>    age: '42',
//=>    weapon: 'Ironman'
//=> }

await client.quit()
