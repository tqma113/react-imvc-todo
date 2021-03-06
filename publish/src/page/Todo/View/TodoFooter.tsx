import React, { useMemo } from 'react'
import classNames from 'classnames'
import { useModel } from 'react-imvc/hook'

import { State } from '../Model'
import { Showing } from '../constant'
import { Actions } from '../Controller'

export default function TodoFooter() {
  const [state, actions] = useModel<State, Actions>()

  const { count, completedCount } = useMemo(() => {
    let count = state.todoList.filter(todo => !todo.completed).length
    let completedCount = state.todoList.length - count
    return { count, completedCount }
  }, [state.todoList])


  const handleClick = () => {
    const { REMOVE_COMPLETED_TODO } = actions
    REMOVE_COMPLETED_TODO()
  }

  const handleTagClick = (showing: Showing) => {
    const { TOGGLE_SHOWING } = actions
    TOGGLE_SHOWING(showing)
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {count > 1 ? 'items' : 'item'} left
      </span>
      <ul className="filters">
        <li>
          <a
            onClick={() => handleTagClick(Showing.ALL)}
            className={classNames({ selected: state.currentShowing === Showing.ALL })}>
            All
          </a>
        </li>
        {' '}
        <li>
          <a
            onClick={() => handleTagClick(Showing.ACTIVE)}
            className={classNames({ selected: state.currentShowing === Showing.ACTIVE })}>
            Active
          </a>
        </li>
        {' '}
        <li>
          <a
            onClick={() => handleTagClick(Showing.COMPLETED)}
            className={classNames({ selected: state.currentShowing === Showing.COMPLETED })}>
            Completed
          </a>
        </li>
      </ul>
      {completedCount > 0 &&
        <button
          className="clear-completed"
          onClick={handleClick}>
          Clear completed
    </button>}
    </footer>
  )
}