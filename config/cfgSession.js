//////////////////////////////////////////
//记录 session 中可能存在的数据
const cfgSession = {
  // 用户登录信息
  user: {
    userid: '',
    username: ''
  },
  //站点配置信息
  options: [],
  //分类信息
  cates:[],

  //分页信息
  postCounts : 0,
  postPages : 1,
  postCurPage: 1,
  postAdminCounts: 0,
  postAdminPages:1,
  postAdminCurPage:1,

  isInit: false

}
