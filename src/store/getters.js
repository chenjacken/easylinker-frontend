const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles || [],
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  globalCode: state => code => state.globalCode.codeList.find(item => item.code === code),

  sceneSecurityIdMap: state => state.scene.list.map(item => ({ name: item.name, key: item.securityId }))
}

export default getters
