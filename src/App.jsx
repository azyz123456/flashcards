/*

To do:

Fix bug where going to the next card when on the "definitions" page also causes flipping
maybe just do away with the flipping animation?

Improve UI for the quiz page in full-screen mode
Allow users to create new flashcards

*/

import { useState } from 'react';
import './App.css';
import Card from './Card.jsx';
import DATA from "./data.js";
import Quiz from './Quiz.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


//keep everything in terms of objects until return statement

function App() {
  const data = JSON.parse(DATA);

  //initialize cards by mapping data to cards
  let initialCards = [];
  let initialOrder = [];

  for (let i=0; i<data.length; i++) {
    let card = {
      "flipped": false,
      "name": data[i].name,
      "answer": data[i].answer,
      "number": i,
      "difficulty": data[i].difficulty,
      "img": data[i].img
    };
    initialCards.push(card);

    initialOrder.push(i);
  }

  const [cards, setCards] = useState(initialCards);
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState(initialOrder);
  console.log(order);

  function shuffleCards() {
    let arr = [...order];
    let newOrder = [];
    while (arr.length > 0) {
      const index = Math.floor(Math.random() * arr.length);
      newOrder.push(arr[index]);
      arr = arr.filter(function (num) {
        return num !== arr[index];
    });
    }
    setOrder(newOrder);
    setIndex(0);
    console.log("new order: ", newOrder);
  }

  function test() {
    console.log("clicked shuffle button");
  }
    
  function flipCard(cardNumber) {
    //change the card flipped to the opposite value
    let newCards = [...cards];
    for (let i=0; i<cards.length; i++) {
      if (cardNumber===i) {
        newCards[i].flipped = !(cards[i].flipped);
      } else {
        newCards[i].flipped = false;
      }
    }
    setCards(newCards);
    console.log("cards:", cards);
  }

  function clickNext(e) {
    //the flipped property of the current card should be set to false

    if (index === order.length - 1) {
      setIndex(0);
    } else {
      setIndex(index+1);
    }

    let newCards = [...cards];
    for (let i=0; i<cards.length; i++) {
      if (cardNumber===i) {
        newCards[i].flipped = false;
      }
    }
    setCards(newCards);
    console.log("Cards:", cards);

    e.stopPropagation();
  }

  function clickPrev(e) {

    if (index === 0) {
      setIndex(order.length - 1);
    } else {
      setIndex(index-1);
    }

    let newCards = [...cards];
    for (let i=0; i<cards.length; i++) {
      if (cardNumber===i) {
        newCards[i].flipped = false;
      }
    }
    setCards(newCards);
    console.log("Cards:", cards);

    e.stopPropagation();
  }

  const app = (
    <div className="main">
      <h1 className="title">React.js Flashcards</h1>
      <p className="description">How much do you know about React? Test your frontend development knowledge here!</p>
      <h4 className="order">{(index+1) + "/" + data.length}</h4>
        <Card 
            flipped={cards[order[index]].flipped}
            name={cards[order[index]].name}
            answer={cards[order[index]].answer}
            cardNumber={cards[order[index]].number}
            difficulty={cards[order[index]].difficulty}
            img={cards[order[index]].img}
            onClick={flipCard}
            onClickNext={clickNext}
            onClickPrev={clickPrev}
          />
          <div className="shuffle" onClick={shuffleCards}>
            <img className="shuffle-icon" src="https://cdn-icons-png.flaticon.com/512/3580/3580329.png"></img>
            <div className="shuffle-text">Shuffle</div>
          </div>
      </div>
  );

  return (
    <Router>
      <div className="App">
            <ul id="navbar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
            </ul>
          <Routes>
            <Route path="/quiz" element={<Quiz cards={cards} />}> </Route>
            <Route path="/" element={app}> </Route>
          </Routes>
      </div>
    </Router>

  )
}

export default App
