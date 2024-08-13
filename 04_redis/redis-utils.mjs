import { createClient } from 'redis'

const client = await createClient()
  .on('error', err => console.error('Redis Client Error', err))
  .connect()

/**
 * 将值存储到 Redis 数据库
 * @param {string} key
 * @param {any} value
 */
export async function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  await client.set(key, value)
}

/**
 * 查询 Redis 数据库
 * @param {string} key
 * @returns {Promise}
 */
export async function get(key) {
  let result = await client.get(key)

  try {
    result = JSON.parse(result)
  } catch (e) {
    console.error('JSON parse error', e)
  } finally {
    return result
  }
}

export async function quit() {
  await client.quit()
}
