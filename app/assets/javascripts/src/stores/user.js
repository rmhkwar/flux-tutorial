import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {

  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getUsers() {
    if (!this.get('users'))this.setUsers([])
    return this.get('users')
  }

  setUsers(json) {
    this.set('users', json)
  }

  getOpenChatUserID() {
    return this.get('openChatUserID')
  }
  setOpenChatUserID(userID){
    this.set('openChatUserID', userID)
  }

}
const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SEARCH_USERS:
      User.setUsers(action.json.users)
      User.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      User.setOpenChatUserID(action.userID)
      User.emitChange()
      break

    // case ActionTypes.UPDATE_OPEN_CHAT_ID:
    //   openChatID = action.userID
    //   // messages[openChatID].lastAccess.currentUser = +new Date()
    //    MessagesStore.emitChange()
    //   break

    case ActionTypes.GET_FRIENDSHIPS:
      User.setOpenChatUserID(action.json.user.id)
      User.setUsers(action.json.user)
      User.emitChange()
      break

  }

  return true
})

export default User
