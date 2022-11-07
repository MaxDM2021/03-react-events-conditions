import React, { Component } from "react";
import shortid from "shortid";
import Counter from "./components/Counter";
import Dropdown from "./components/Dropdown";
import ColorPicker from "./components/ColorPicker";
import TodoList from "./components/Todolist";
import TodoEditor from "./components/TodoEditor";
import Filter from "./components/Filter";
import IconButton from "./components/IconButton";

import { ReactComponent as AddIcon } from "./components/icons/add.svg";

import initialTodos from "./todos.json";

import LoginForm from "./components/LoginForm";

import ProductReviewForm from "./components/ProductReviewForm";

import Modal from "./components/Modal";
import Clock from "./components/Clock";
import Tabs from "./components/Tabs";
import tabs from "./tabs.json";

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
    todos: [],
    filter: "",
    showModal: false,
    showClock: false,
  };

  // ===== Методы жизненных циклов ======

  componentDidMount() {
    // console.log('App componentDidMount');

    const todos = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

const nextTodos = this.state.todos;
const prevTodos = prevState.todos;


    if (nextTodos !== prevTodos) {
      console.log("Обновилось поле todos, записываю todos в хранилище");

      localStorage.setItem("todos", JSON.stringify( nextTodos ));
    }

// Вариант **2 закрывания окна после ввода данных

if ( nextTodos.length > prevTodos.length && prevTodos.length !== 0){
  this.toggleModal();
} 
}


  // ===== Методы циклов END ======

  // ===== Кастомные методы =====

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

// Вариант **1 закрывания окна после ввода данных

    // this.toggleModal();

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
    const { todos } = this.state;

    return todos.reduce((acc, todo) => (todo.comleted ? acc + 1 : acc), 0);
  };

  // ======Modal-open-close========

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  // ======Modal-END========

  // ======Clock l-open-close========

  toggleClock = () => {
    this.setState(({ showClock }) => ({
      showClock: !showClock,
    }));
  };

  // ======Modal-END========

  render() {
    const { todos, filter, showModal, showClock } = this.state;
    const totalTodosCount = todos.length;
    const comletedTodosCount = this.calculateComletedTodos();

    const visibleTodos = this.getVisibleTodos();

    return (
      <>
        <h1>Состояние компонента</h1>
        <Counter initialvalue={10} />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} />

        <IconButton onClick={this.toggleModal} arial-lable="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        <div>
          <p>Общее кол-во: {totalTodosCount}</p>
          <p>Количество выполненных: {comletedTodosCount} </p>
        </div>
       

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        <LoginForm />
        <ProductReviewForm />
        <button type="button" onClick={this.toggleModal}>
          Открыть модальное окно
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>


<TodoEditor onSubmit={this.addTodo} />



            {/* <h1>Привет это контент модалки как children</h1>
            <p>
              В графстве Фингал в Ирландии появились зарядные станции для
              электромобилей, встроенные в фонарные столбы. Таким образом,
              энергия поступает прямо из городских электросистем, не требуя
              дополнительного оборудования.
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрыть
            </button> */}
          </Modal>
        )}
        {showClock && <Clock />}
        <button type="button" onClick={this.toggleClock}>
          Открыть/Скрыть таймер
        </button>
        <Tabs items={tabs} />

   
      </>
    );
  }
}

export default App;
