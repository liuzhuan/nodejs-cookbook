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
  const query = 'SELECT * FROM users WHERE username = ?'
  // 使用预处理语句
  const [results, fields] = await connection.execute(query, ['tony'])

  // results 包含服务器返回的行数据
  console.log('results:', results)
  // fields 包含查询结果相关的元数据
  console.log('fields:', fields)
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
    fields: [
        `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `username` VARCHAR(20) NOT NULL,
        `password` VARCHAR(20) NOT NULL,
        `realname` VARCHAR(10) NOT NULL,
        `state` INT NOT NULL
    ]
   */
} catch (e) {
  console.error(e)
}

connection.end()
