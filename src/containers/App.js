import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  componentDidMount() {
    let { init } = this.props.actions;
    init();
  }

  render() {
    const { todos, actions, isLoading } = this.props
    const { createTodo } = actions;

    return (
      <div>
        <Header createTodo={createTodo} isLoading={isLoading} />
        <MainSection todos={todos} isLoading={isLoading} actions={actions} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  let { todos } = state;

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
