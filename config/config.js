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

  adminPagingSize: 15,
  postsListSize: 10
}

module.exports = config