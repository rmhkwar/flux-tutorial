import React from 'react'
import UsersAction from '../../actions/user'
import UserList from './userList'
import UserStore from '../../stores/messages'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }
  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  handleKeyDown(e) {
     {
      UsersAction.searchUsers(this.state.value, )
      if (e.keyCode === 13){
        UsersAction.searchUsers(this.state.value, )
        this.setState({
        value: '',
        })
      }
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

	render() {
  return (
    <div className = 'search'>
    <div className='search-box'>
        <h2>ユーザーを検索する</h2>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='search-box__input'
          placeholder='Type name to search'
        />
        <span className='search-box__tip'>
          Press <span className='search-box__tip__button'>Enter</span> to search
        </span>
        <UserList />
      </div>
      </div>

    )
	}
}

export default Search
