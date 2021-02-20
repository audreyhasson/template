'use strict';
import React from 'react'
import {render} from 'react-dom'

const ten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function disorder(arg) {
  for (var i = 0; i < arg.length; i++) {
      if (Math.random() < 0.5) {
          var aux = arg[i];
          var rndPos = Math.floor(Math.random()) * arg.length;
          arg[i] = arg[rndPos];
          arg[rndPos] = aux;
      }
  }
  return arg;
}

const quizOrder = disorder(ten);
console.log(quizOrder);
const quizContent = [
  ["Texts from iPhone users are _____ to read as texts from Android users.", [
    ["Twice as hard", false],
    ["Twice as easy", true],
    ["The same", false],
    ["Three times as hard", false],
  ]],
  ["What percentage of teenagers own a phone?", [
    ["80%", false],
    ["90%", false],
    ["95%", true],
    ["100%", false],
  ]],
  ["Cyberostracism is...", [
    ["When cyborgs are mean to each other", false],
    ["Not as bad as bullying", false],
    ["Exclusion", false],
    ["Exclusion in a virtual environment", true],
  ]],
  ["What's the most socially sensitive age group?", [
    ["6-12", false],
    ["13-19", true],
    ["20-35", false],
    ["40-55", false],
  ]],
  ["How many teens text daily?", [
    ["80%", true],
    ["70%", false],
    ["60%", false],
    ["50%", false],
  ]],
  ["Apple has a motive to...", [
    ["Encourage people to text Android users", false],
    ["Give away money", false],
    ["Downsize", false],
    ["Sell Apple products", true],
  ]],
  ["Which of these social needs is threatened by ostracism?", [
    ["Need to belong", false],
    ["Need to control one's social environment", false],
    ["Need to have a meaningful existence", false],
    ["All of the above", true],
  ]],
  ["Do marketers have an obligation to society?", [
    ["Yes, they need to consider the effects of their marketing", false],
    ["No, society needs to be aware of malicious marketing", false],
    ["I don't know, Plato, do they?", false],
    ["There's no real answer to this one", true],
  ]],
  ["Which of the following is a long-term result of ostracism?", [
    ["Getting \"thick skin\"", false],
    ["Finding inner peace and regularly practicing goat yoga", false],
    ["Acceptance, resignation, and feeling depressed and worthless", true],
    ["Feelings of belonging", false],
  ]],
  ["What can you do to help prevent cyberostracism?", [
    ["Let people in the group chat", false],
    ["Educate others", false],
    ["Use third party messaging apps", false],
    ["All of the above", true]
  ]]
];

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPage: "show",
      question: "hide",
      endPage: "hide"
    };
    this.handleStartClick = this.handleStartClick.bind(this);
  }
  handleStartClick() {
    this.setState(state => {
      const startPage = "hide";
      const question = "show";
      return {
        startPage,
        question,
      }
    });
  }
  render(){
    return (
      <div>
        <div className={[this.state.startPage, "start", "has-background-dark", "quiz-element"].join(' ')} onClick={this.handleStartClick}>
          <p className="has-text-white has-text-centered is-size-1">START QUIZ!</p>
        </div>
        <Quiz data={this.state.question}/>
      </div>
    );
  }
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      question: [],
      right: 0,
      stop: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState((state) =>{
      let question = quizContent[quizOrder[this.state.progress]];
      console.log(question);
      return {
        question,
      }
    })
  }
  handleChange(choice) {
    if (this.state.progress === 9) {
      if (choice != null) {
        if (choice[1]) {
          console.log("Correct");
          this.setState((state) => {
            return {right: state.right +1}
          })
        }
      }
      console.log("All done!");
      this.setState((state) => {
        return {stop: true}
      })
    } else {
      if (choice != null) {
        if (choice[1]) {
          console.log("Correct");
          this.setState((state) => {
            return {right: state.right +1}
          })
        }
      }
      this.setState((state) => {
        const newProg = state.progress + 1
        const newQuestion = quizContent[quizOrder[newProg]];
        console.log(newQuestion);
        return {
          progress: newProg,
          question: newQuestion,
        }
      })
    }

  }
  render() {
    console.log("Your current score ", this.state.right*10,  "%");
    console.log("your progress uis ", this.state.progress);
    if (this.props.data === "show") {
      return (
        <div>
          <div className={["slide", this.state.stop ? "hide" : "show"].join(' ')}>
            <div className="has-background-dark has-text-white question is-size-4">
              <p>{this.state.question[0]}</p>
            </div>
            <div className="answers quiz-element">
              {this.state.question[1].map((answer, index) => (
                <li key={index} onClick={() => this.handleChange(answer)}>{answer}</li>
              ))}
            </div>
          </div>
          <Results data={this.state} />
        </div>
      )
    } else {
      return null;
    }
  };
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    //this.calculateScore = this.calculateScore.bind(this);
  }
  render() {
    if (this.props.data.stop) {
      let correct = this.props.data.right;
      let percent = correct*10;
      let goodJob = "Wow, you learn fast! we're very proud of you. Now that you're a cyberostracism expert, go teach everyone you know all about it!";
      let niceTry = "Well, that went OK. A for effort (even though you didn't actually get an A). Try again?";
      let yikes = "Wow. That was pretty bad. Did you read anything on the site? No? Hm. Try again.";
      if (percent>=80) {return (
        <div>
          <div className="has-background-dark has-text-white results-title has-text-centered is-size-1">
            <p> Results: {percent}% </p>
          </div>
          <div className="results-spiel">
            <p>{goodJob}</p>
          </div>
        </div>
      )
    } else if (80>percent && percent>=60) {
      return (
        <div>
          <div className="has-background-dark has-text-white results-title has-text-centered is-size-1">
            <p> Results: {percent}% </p>
          </div>
          <div className="results-spiel">
            <p>{niceTry}</p>
          </div>
        </div>
      )
    } else if (60>percent) {
      return (
        <div>
          <div className="has-background-dark has-text-white results-title has-text-centered is-size-1">
            <p> Results: {percent}% </p>
          </div>
          <div className="results-spiel">
            <p>{yikes}</p>
          </div>
        </div>
      )
    }
    } else {
      return (
        null
      )
    }
  }
}

const domContainer = document.querySelector('#quiz-container');
ReactDOM.render(<Display />, domContainer);
