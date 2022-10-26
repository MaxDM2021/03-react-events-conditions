import React from "react";
import Controls from "./Controls"
import Value from "./Value";
// import "./Counter.css";

class Counter extends React.Component {

//1. Статика
static defaultProps = {
    initialvalue: 0
};

//2. Состояние
  state = { value: this.props.initialvalue, 
};

// 3. Кастомные методы
  handleIncrement = () => {
    // Замена относительно исходного состояния
    // this.setState({ value: 666})
  
    // Замена относительно текущего состояния
  this.setState(prevState => ({
        value: prevState.value + 1,
  }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
        value: prevState.value - 1,
    }));
    };
  
// Рендер

  render() {
const { value } = this.state;

    return (
      <div className="Counter">
       <Value onValue={value}/>
<Controls onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} />
      </div>
    );
  }
}

export default Counter;
