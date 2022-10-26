import React, { Component } from "react";
import Counter from "./components/Counter"
import Dropdown from "./components/Dropdown";
import ColorPicker from "./components/ColorPicker";
import TodoList from "./components/Todolist";
import initialTodos from "./todos.json";

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;
    const totalTodosCount = todos.length;
    const comletedTodosCount = todos.reduce((acc, todo) => (todo.comleted? acc +1: acc), 0)

    console.log(comletedTodosCount );

    return (
      <>
        <h1>Состояние компонента</h1>
        <Counter initialvalue={10} />
<Dropdown/>
<ColorPicker options={colorPickerOptions}/>

<div>
  <p>Общее кол-во: {totalTodosCount}</p>
  <p>Количество выполненных: {comletedTodosCount } </p>
</div>

        <TodoList todos={todos} onDeleteTodo={this.deleteTodo}/>
      </>
    );
  }
}

export default App;
