import { get, set, quit } from './redis-utils.mjs'

const hero = {
  name: 'Tony Stark',
  age: 42,
  company: 'Stark Industries',
}

await set('hero', hero)
console.log('set successfully')
const result = await get('hero')
console.log('hero result:', result)

await quit()
