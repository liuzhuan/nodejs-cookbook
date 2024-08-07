import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'myblog',
})

try {
  // 使用占位符查询
  const query = 'SELECT * FROM users WHERE username = ?'
  const [results] = await connection.query(query, ['tony'])

  console.log('results:', results)
  /**
    results: [
        {
            id: 1,
            username: 'tony',
            password: '3000',
            realname: 'Tony Stark',
            state: 1
        }
    ]
   */
} catch (e) {
  console.error(e)
}

connection.end()
