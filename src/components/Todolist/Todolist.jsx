import React from "react";
import './Todolist.css'
import classNames from "classnames";

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

// ===== Вариант 2 =====

const TodoList = ({ todos,  onDeleteTodo, onToggleCompleted}) =>
(
<ul className="TodoList">
{todos.map(({ id, text, comleted }) => (
    <li
    key={id}
    className={classNames('TodoList__item', {'TodoList__item--comleted': comleted})}>

        <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={comleted}
        onChange={()=>onToggleCompleted(id)}
        />
        <p className="TodoList__text">{text}</p>
<button
type="button"
className="TodoList__btn"
onClick={()=> onDeleteTodo(id)}
>
    Удалить
</button>
    </li>
    ))} 
    </ul>
)

export default TodoList;
