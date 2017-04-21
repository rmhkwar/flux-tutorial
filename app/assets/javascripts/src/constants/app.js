import keyMirror from 'keymirror'

export
	const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  SEARCH_USERS: null,
  GET_FRIENDSHIPS: null,
	GET_MESSAGES: null,
	})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  SEARCH_USERS: APIRoot + '/users/search',
  CREATE_FRIENDSHIP: APIRoot + '/friendships',
  GET_FRIENDSHIPS: APIRoot + '/friendships',
}
