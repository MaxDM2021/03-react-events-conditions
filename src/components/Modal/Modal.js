import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log("Modal componentWillUnmount");


window.removeEventListener('keydown', this.handleKeyDown);

  }

handleKeyDown = e => {
  
  if (e.code === 'Escape') {
    console.log("Нажали ESC, нужно закрыть модалку");
    this.props.onClose();
  }
}

handleBackdropClick = e => {
 

  if (e.currentTarget === e.target) {
    console.log('Кликнули в бекдроп, нужно закрыть модалку')
    this.props.onClose();
  }
}


  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
