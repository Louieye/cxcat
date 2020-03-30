const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routes: state => state.user.routes,
  username: state => state.user.username,
  roles: state => state.user.roles,
  access_token: state => state.user.access_token,
  timeOut: state => state.user.timeOut
}
export default getters
