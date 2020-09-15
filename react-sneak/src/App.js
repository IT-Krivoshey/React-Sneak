import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomFood(),
  speed: 200,
  derection: "RIGHT",
  snakePart: [
    [0, 0],
    [2, 0],
  ],
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.move, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.ifOutBorder();
    this.ifCollapse();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ derection: "UP" });
        break;
      case 40:
        this.setState({ derection: "DOWN" });
        break;
      case 37:
        this.setState({ derection: "LEFT" });
        break;
      case 39:
        this.setState({ derection: "RIGHT" });
        break;
    }
  };

  move = () => {
    let part = [...this.state.snakePart];
    let head = part[part.length - 1];

    switch (this.state.derection) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    part.push(head);
    part.shift();
    this.setState({
      snakePart: part,
    });
  };

  ifOutBorder() {
    let head = this.state.snakePart[this.state.snakePart.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }

  ifCollapse() {
    let snake = [...this.state.snakePart];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(part => {
      if (head[0] == part[0] && head[1] == part[1]) {
        this.gameOver();
      }
    })
  }

  gameOver() {
    alert(`Game Over, snake lenght is: ${this.state.snakePart.length}`);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="game">
        <Snake snakePart={this.state.snakePart} />
        <Food part={this.state.food} />
      </div>
    );
  }
}

export default App;
