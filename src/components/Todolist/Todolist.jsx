

import React from 'react';
import classNames from 'classnames';
import Todo from '../Todo';
import './Todolist.scss';

// ===== Вариант 1 =====

// const TodoList = ({ todos,  onDeleteTodo, }) => (<ul className="TodoList">
// {todos.map(({ id, text })=> (
//     <li key={id} className="TodoList__item" >
// <p className="TodoList__text">{text}</p>
// <button onClick={() => onDeleteTodo(id)}>Удалить</button>
//     </li>
// ))}
// </ul>
// );

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          text={text}
          completed={completed}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDelete={() => onDeleteTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;