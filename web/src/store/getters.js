const getters = {
  // 程序
  title: state => state.app.title,
  logo: state => state.app.logo,
  code_img: state => state.app.code_img,
  keywords: state => state.app.keywords,
  description: state => state.app.description,
  version: state => state.app.version,
  author: state => state.app.author,
  icp: state => state.app.icp,
  create_time: state => state.app.create_time,
  routes: state => state.app.routes,
  is_close: state => state.app.is_close,
  is_login: state => state.app.is_login,
  is_register: state => state.app.is_register,
  visit_code: state => state.app.visit_code,
  // 用户
  user: state => state.user.state,
  id: state => state.user.id,
  ip: state => state.user.ip,
  username: state => state.user.username,
  role: state => state.user.role,
  token: state => state.user.token,
  language: state => state.user.language,
  history: state => state.user.history,
  sidebar: state => state.user.sidebar,
  login_count: state => state.user.login_count,
  img_count: state => state.user.img_count,
  visit_count: state => state.user.visit_count,
  img_visit_counts: state => state.user.img_visit_counts,

};

export default getters;
