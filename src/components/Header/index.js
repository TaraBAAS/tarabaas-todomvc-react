import React, { PropTypes, Component } from 'react'
import TodoTextInput from '../TodoTextInput'

import loader from './loader.svg';

import './Header.css';

class Header extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.createTodo(text)
    }
  }

  loader() {
    let {isLoading} = this.props;
    if (isLoading) {
      return (
        <img src={loader} className="loader" alt="loading..." />
      );
    }
  }

  render() {
    return (
      <header className="header">
        <h1>TaraBAAS</h1>
        {this.loader()}
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}

export default Header
