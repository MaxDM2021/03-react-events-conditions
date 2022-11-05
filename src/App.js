import React, { Component } from "react";
import shortid from "shortid";
import Counter from "./components/Counter";
import Dropdown from "./components/Dropdown";
import ColorPicker from "./components/ColorPicker";
import TodoList from "./components/Todolist";
import TodoEditor from "./components/TodoEditor";
import Filter from "./components/Filter";
import initialTodos from "./todos.json";

import LoginForm from "./components/LoginForm";

import ProductReviewForm from "./components/ProductReviewForm"

import { GlobalStyle } from "./GlobalStyle";

const colorPickerOptions = [
  { label: "red", color: "#F44336" },
  { label: "green", color: "#4CAF50" },
  { label: "blue", color: "#2196F3" },
  { label: "grey", color: "#607D8B" },
  { label: "pink", color: "#E91E63" },
  { label: "indigo", color: "#3F51B5" },
];

class App extends Component {
  state = {
    todos: initialTodos,
    filter: "",
  };

  addTodo = (text) => {
    console.log(text);

    const todo = {
      id: shortid.generate(),
      text,
      comleted: false,
    };
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  toggleCompleted = (todoId) => {
    console.log(todoId);

    // ===== Вариант 1 =====

    //    this.setState(prevState => ({
    //     todos: prevState.todos.map(todo => {
    // if (todo.id === todoId) {
    //   console.log('Нашли тот туду который нужно!!!');
    //   return {
    //     ...todo,
    //     comleted: !todo.comleted,
    //   };
    // }
    // return todo;
    //     }),
    //    }));

    // ===== Вариант 2 =====
    // Через тернарник:

    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === todoId ? { ...todo, comleted: !todo.comleted } : todo
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;

    const normalizedFilter = filter.toLocaleLowerCase();

    return todos.filter((todo) =>
      todo.text.toLocaleLowerCase().includes(normalizedFilter)
    );
  };


  calculateComletedTodos = () => {
  const { todos } = this.state

  return todos.reduce(
    (acc, todo) => (todo.comleted ? acc + 1 : acc),
    0
  );
  }

  render() {
    const { todos, filter } = this.state;
    const totalTodosCount = todos.length;
    const comletedTodosCount = this.calculateComletedTodos();

    const visibleTodos = this.getVisibleTodos();

    return (
      <>
        <h1>Состояние компонента</h1>
        <Counter initialvalue={10} />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} />

        <div>
          <p>Общее кол-во: {totalTodosCount}</p>
          <p>Количество выполненных: {comletedTodosCount} </p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        <LoginForm/>
        <ProductReviewForm/>
{/* 
        <GlobalStyle /> */}
      </>
    );
  }
}

export default App;
