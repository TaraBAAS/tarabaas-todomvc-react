import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

class App extends Component {
  componentDidMount() {
    let {fetchAll} = this.props.actions;
    fetchAll();
  }

  render() {
    const { todos, actions } = this.props
    const { createTodo } = actions;

    return (
      <div>
        <Header createTodo={createTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  let {todos} = state;

  return {
    isLoading: todos.isLoading,
    todos: todos.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
