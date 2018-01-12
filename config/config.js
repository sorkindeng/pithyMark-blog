const config = {
  // 启动端口
  port: 3000,
  // 数据库配置
  database: {
    DATABASE: 'firekylin',
    USERNAME: 'root',
    PASSWORD: 'aaasdf',
    PORT: '3306',
    HOST: 'localhost'
  },

  adminPagingSize: 5,
  postsListSize: 5
}

module.exports = config