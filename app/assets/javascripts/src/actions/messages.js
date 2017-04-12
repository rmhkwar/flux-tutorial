import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },

  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE,
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },

  getMessages(){
    return new Promise((resolve,reject)=>{
      request
      .get('/api/messages')
      .ens((error,res)=>{
        if(!error && res.status === 200){
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json,
          })
          resolve(json)
        }else{
          reject(res)
        }
      })
    })
  },

  getMessages(){
    return new Promise((resolve,reject) => {
      request
      .post('${APIEndpoints.MESSAGE}')
      .set('X-CSRF-Token',CSRFToken())
      .send({message_id: messageId})
      .end((error,res)=>{
        if(!error && res.status === 200){
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_MESSAGES,
            messageId,
            json,
          })
        }else{
          reject(res)
        }
      })
    })
  },
}
