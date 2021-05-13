/**
 * @description 格式化用户的头像
 * @param {*} obj 用户对象
 */
function _formatUser(obj) {
  return {
    id: obj.id,
    username: obj.username,
    createAt: obj.createAt,
    updateAt: obj.updateAt,
    avatarUrl: obj.avatarUrl || `https://yayxs.github.io/avatar.jpg`,
    gender: obj.gender || 3,
    password: obj.password || '',
  }
}

module.exports = {
  _formatUser,
}
