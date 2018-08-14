import React from "react";
import { render } from "react-dom";

import "./App.css";

const sfx1 = new Audio(require("./sfx/roll_1.mp3"));
const sfx2 = new Audio(require("./sfx/roll_2.mp3"));
const sfx3 = new Audio(require("./sfx/roll_3.mp3"));
const sfxArr = [sfx1, sfx2, sfx3];

let sfxCount = 0;
const diceSet = [20, 12, 10, 8, 6, 4];

class Dice extends React.Component {
	constructor(props) {
    	super(props);
    	// Receives num (int) as prop from Container
    	this.state = { cls: "" };

    	// Receives updateRolls() as function from Container
  	}
  	randomNum = max => {
    	return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  	};
  	roll = n => {
    	const value = this.randomNum(n);

    	sfxArr[sfxCount].play();
    	sfxCount >= 2 ? (sfxCount = 0) : (sfxCount += 1);

    	this.setState({ cls: "rotate" });

    	setTimeout(() => {
      		this.setState({ cls: "" });
      		this.props.updateRolls("d" + n, value);
    	}, 250);
	};
  	render() {
  		let rolls = this.props.rollArray;
  		let rollSum = rolls.reduce((x, y) => {
            	return x + y;
          	}, 0);

  		let rollResult = rolls.length > 0 ? rolls[rolls.length-1] : null;
    	let rollHistory = rolls.length > 1 ? rolls.join(", ") + " [" + rollSum + "]" : null;

    	return (
      		<div className="dice" onClick={() => this.roll(this.props.num)}>
        		<h1 className="dice__label">{this.props.num}</h1>
        		<img
          			className={"dice__icon " + this.state.cls}
          			alt='Dice'
          			src={require("../src/img/d" + this.props.num + ".png")} />
        		<div className="dice__result">
          			<h3>{rollResult}</h3>
        		</div>
        		<p className="dice__history">{rollHistory}</p>
      		</div>
    	);
  	}
}

class Reset extends React.Component {
  	// Receives resetRolls() function from Container
  	render() {
    	return (
      		<input
        		className="dice__reset"
        		type="button"
        		onClick={() => {
          			this.props.resetRolls();
        		}} />
    	);
  	}
}

class App extends React.Component {
  	constructor(props) {
    	super(props);

    	this.state = {
      		dHistory: {
        		d20: [],
        		d12: [],
        		d10: [],
        		d8: [],
        		d6: [],
        		d4: []
      		}
    	};
  	}
 	resetRolls = () => {
    	for (let rArr in this.state.dHistory) {
      		this.setState((this.state.dHistory[rArr] = []));
    	}
  	};
 	updateRolls = (dice, value) => {
    	let diceArr = this.state.dHistory[dice];
    	diceArr.push(value);

    	this.setState({ dice: diceArr });
  	};
  	render() {
    	return (
      		<div className="dice-container">
      			{
      				diceSet.map((d, ind) => (
      					<Dice
      						key={ind}
				        	num={d}
				        	rollArray={this.state.dHistory['d'+d]}
				          	updateRolls={this.updateRolls} />
      				))
				}
        		
        		<Reset resetRolls={this.resetRolls} />
      		</div>
    	);
  	}
}

render(<App />, document.getElementById("root"));

