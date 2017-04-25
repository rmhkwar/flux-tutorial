import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  searchUsers(search_query) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.SEARCH_USERS}`)
      .query({
        search_query,
      })
      .end((error, res) => {
        const json = JSON.parse(res.text)
        if (!error && res.status === 200) {
          Dispatcher.handleServerAction({
            type: ActionTypes.SEARCH_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  createFriendship(userID) {
    return new Promise((resolve, reject) => {
      console.log(userID)
      request
      .post(`${APIEndpoints.CREATE_FRIENDSHIP}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: userID,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          var redirect_url = 'http://localhost:3000'
          location.href = redirect_url
        } else {
          reject(res)
        }
      })
    })
  },
  deleteFriendships(userID) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${APIEndpoints.DELETE_FRIENDSHIPS + userID}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: userID,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          console.log(json)
          // 消す
          debugger
          Dispatcher.handleServerAction({
            type: ActionTypes.DELETE_FRIENDSHIPS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  getFriendships() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.GET_FRIENDSHIPS}`)
      .end((error, res) => {
        const json = JSON.parse(res.text)
        if (!error && res.status === 200) {
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDSHIPS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
}
