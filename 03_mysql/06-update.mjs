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
  // 更新数据
  const query = 'UPDATE users SET realname = ? WHERE username = ?'
  const [results, fields] = await connection.query(query, ['P Quill', 'peter'])

  // results 包含服务器返回的行数据
  console.log('results:', results)
  // fields 包含查询结果相关的元数据
  console.log('fields:', fields)
  /**
   results: ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 34,
        warningStatus: 0,
        changedRows: 1
    }
    fields: undefined
   */
} catch (e) {
  console.error(e)
}

connection.end()
