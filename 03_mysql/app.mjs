// 使用 promise 版本更方便
import mysql from 'mysql2/promise'

// 1. 创建数据库连接
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your-database-password',
  database: 'myblog',
})

try {
  // 2. 基于数据库连接进行查询
  const query = 'select * from users;'
  const [results, fields] = await connection.query(query)

  // results 包含服务器返回的行数据
  console.log('results:', results)
  // fields 包含查询结果相关的元数据
  console.log('fields:', fields)
} catch (e) {
  console.error(e)
}

// 3. 关闭数据库连接
connection.end()
