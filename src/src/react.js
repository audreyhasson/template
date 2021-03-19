'use strict';
import React from 'react'
import {render} from 'react-dom'

const ten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let move = false;
const timeTotal = 15000;
const wait = 1000;

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
const quizContent = [
  ["Texts from Android users are _____ to read as texts from iPhone users.", [
    ["Twice as hard", true],
    ["Twice as easy", false],
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
      timeLeft: timeTotal,
      timeStarted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleColors = this.handleColors.bind(this);
  }
  componentDidMount() {
    this.setState((state) =>{
      let question = quizContent[quizOrder[this.state.progress]];
      return {
        question,
      }
    });
  }
  componentDidUpdate() {
    if (this.state.timeLeft <= 0 && !this.state.stop) {
      if (this.state.progress === 9) {
        this.setState((state) => {
          return {stop: true}
      })} else if (this.state.progress < 9) {
        this.setState((state) => {
          const newProg = state.progress + 1
          const newQuestion = quizContent[quizOrder[newProg]];
          return {
            progress: newProg,
            question: newQuestion,
            timeLeft: timeTotal,
          }
          })
        }
      } else if (this.props.data === "show" && this.state.timeLeft > 0 && !this.state.timeStarted) {
      //excute -1 function every second
      setInterval(this.countDown, 1000);
      this.setState((state) => {
        return{timeStarted: true}
      })
    }
  }
  countDown(){
    this.setState((state) => {
      return {timeLeft: state.timeLeft - 1000}
    });
  }
  handleChange(choice) {
    const theirPick = event.target;
    if (this.state.progress === 9) {
      if (choice != null) {
        if (choice[1]) {
          setTimeout(() => {
            this.setState((state) => {
              return {right: state.right +1}
            });
          }, wait);
        }
      }
      //this needs to be delayed as well
      setTimeout(() => {
        this.setState((state) => {
          return {stop: true}
        })
      }, wait);
    } else {
      if (choice != null) {
        if (choice[1]) {
          this.setState((state) => {
            return {right: state.right +1}
          })
        } else if (!choice[1]){
        }
      }
      //below is what needs to be delayed in order for styling changes to be visible
      setTimeout(() => {
        this.setState((state) => {
          const newProg = state.progress + 1
          const newQuestion = quizContent[quizOrder[newProg]];
          return {
            progress: newProg,
            question: newQuestion,
            timeLeft: timeTotal,
          }
        });
      }, wait)
    }

  }
  handleColors() {
    let response = event.target;
    console.log(response.tagName);
    let fullList = response.parentElement;
    let wrongOnes = fullList.getElementsByClassName("n");
    let correctAnswer = fullList.getElementsByClassName("v");
    if (response.tagName === "LI") {
      correctAnswer.item(0).classList.add("correct-answer");
    }
    if (!response.classList.contains("v") && response.tagName === "LI") {
      response.classList.add("wrong-answer");
    }
    setTimeout(() => {
      response.classList.remove("wrong-answer");
      correctAnswer.item(0).classList.remove("correct-answer");
    }, wait)

  }
  render() {
    const time = this.state.timeLeft/1000;
    if (this.props.data === "show") {
      return (
        <div>
          <div className={["slide", this.state.stop ? "hide" : "show"].join(' ')}>
            <div className="has-background-dark has-text-white question is-size-4 columns mx-0">
              <div className="column">
                <p>{this.state.question[0]}</p>
              </div>
              <div className="column is-narrow timer-c">
                <p className="timer-text">{time}</p>
              </div>
            </div>
            <div className="answers quiz-element" onClick={() => this.handleColors()}>
              {this.state.question[1].map((answer, index) => (
                <li key={index} className={answer[1]? "v" : "n"} onClick={() => this.handleChange(answer)}>{answer}</li>
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
  }
  render() {
    if (this.props.data.stop) {
      let correct = this.props.data.right;
      let percent = correct*10;
      let goodJob = "Wow, you learn fast! We're very proud of you. Now that you're a cyberostracism expert, go teach everyone you know all about it!";
      let niceTry = "Well, that went OK. A for effort (even though you didn't actually get an A). Try again?";
      let yikes = "Wow. That was pretty bad. Did you read anything on the site? No? Hm. Try again.";
      return (
        <div>
          <div className="has-background-dark has-text-white results-title has-text-centered is-size-1">
            <p> Results: {percent}% </p>
          </div>
          <div className="results-spiel">
            <p>{correct>= 8 ? goodJob : correct < 8 && correct > 5 ? niceTry : yikes}</p>
            <a href="javascript:window.location.href=window.location.href" className="retry-button has-text-white has-background-dark">TRY AGAIN</a>
          </div>
        </div>
      )
    } else {
      return (
        null
      )
    }
  }
}

const domContainer = document.querySelector('#quiz-container');
ReactDOM.render(<Display />, domContainer);
