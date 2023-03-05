import { useState } from 'react';
import './App.css';
import Card from './Card.jsx';
import DATA from "./data.js";

//keep everything in terms of objects until return statement

function App() {
  const data = JSON.parse(DATA);

  //initialie cards by mapping data to cards
  let initialCards = [];
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
  }

  const [cards, setCards] = useState(initialCards);
  const [card, setCard] = useState(cards[0]);
  const [prevCard, setPrevCard] = useState(cards[0]);
    
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
    console.log(cards);
  }

  function clickNext(e) {
    //draw a random next card when the right arrow is clicked
    //ensures that the next card is not the same as the current card
    let index = Math.floor(Math.random() * data.length);
    while (index === card.number) {
      index = Math.floor(Math.random() * data.length);
    }
    setPrevCard(card);
    setCard(cards[index]);
    e.stopPropagation();
  }

  function clickPrev(e) {
    setCard(prevCard);
    e.stopPropagation();
  }

  return (
    <div className="App">
      <h1>React.js Flashcards</h1>
      <p>How much do you know about React? Test your frontend development knowledge here!</p>
      <h4>{"Number of Cards: " + cards.length}</h4>
      <Card 
          flipped={card.flipped}
          name={card.name}
          answer={card.answer}
          cardNumber={card.number}
          difficulty={card.difficulty}
          img={card.img}
          onClick={flipCard}
          onClickNext={clickNext}
          onClickPrev={clickPrev}
        />
    </div>
  )
}

export default App
