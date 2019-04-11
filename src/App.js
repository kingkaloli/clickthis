///Connections here to imports 
import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';
///css 
import './styles/main.css';

class App extends PureComponent {
///Card flip area 
  state = { 
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1
  };
///dipliciate card info here 
  static duplicateCard = () => {
    return [0,1,2,3,4,5,6,7].reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    },[]);
  };
///click event 
  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });
///If else statements here(newFlips)
    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));
///If else statements here(clickCount)
      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };
///card match/winner)
  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };
///card 
  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1
    });
  };
///Game Over
  isGameOver = () => {
    return this.state.isFlipped.every((element, index, array) => element !== false);
  };

  render() {
    return (
     <div>
       <Header restartGame={this.restartGame} />
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
     </div>
    );
  }
}
///Exports
export default App;