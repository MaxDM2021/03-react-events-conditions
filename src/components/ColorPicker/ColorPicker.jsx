import React, { PureComponent } from "react";
import "./ColorPicker.css";
import classNames from "classnames";


class ColorPicker extends PureComponent {
  state = {
    activeOptionIdx: 0,
  };

  setActiveIdx = index => {
    this.setState({ activeOptionIdx: index})
  }

//   makeOptionClassName = (index) => {
// Вариант 2 через className:

// return classNames('ColorPicker__option', {'ColorPicker__option--active': index === this.state.activeOptionIdx,});

// console.log(clsx);
// Вариант 2 через функцию setActiveIdx:
    // const optionClasses = ["ColorPicker__option"];

    // if (index === this.state.activeOptionIdx) {
    //   optionClasses.push("ColorPicker__option--active");
    // }
    // return optionClasses.join(" ");
  // };

  render() {
    const { activeOptionIdx } = this.state;
    const { options } = this.props;
    const { label } = options[activeOptionIdx];


    return (
      <div className="ColorPicker">
        <h2 className="ColorPicker__title">Color Picker</h2>
        <p>Выбран цвет: {label}</p>
        <div>
          {options.map(({ label, color }, index) => (
            <button
              key={label}
              // Вариан 3 инлайново
              className={classNames('ColorPicker__option', {'ColorPicker__option--active': index === this.state.activeOptionIdx,})}
              style={{ backgroundColor: color }}
              onClick={() => this.setActiveIdx(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
