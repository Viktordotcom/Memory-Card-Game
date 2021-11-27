import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import Card from "./components/Card";
import "./components/styles/App.css";

function App() {
  const [cardDeck, setCardDeck] = useImmer([[]]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [score, setScore] = useState(-1);
  const [highScore, setHighScore] = useState(0);
  const [change, setChange] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const cardData = await fetch(
          "https://db.ygoprodeck.com/api/v7/cardinfo.php"
        );
        const json = await cardData.json();

        setRandomNumber(Math.floor(Math.random() * json.data.length));
        setCardDeck((draft) => {
          draft.splice(0, 1);

          const slicedArray = json.data.splice(randomNumber, 6);
          slicedArray.map((item) => {
            item.clicks = 0;
            return {
              ...item,
              clicks: 0,
            };
          });
          draft.push(slicedArray);
        });
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, [change]);

  useEffect(() => {
    const isMistake = cardDeck[0].some((card) => card.clicks > 1);
    const noMistake = cardDeck[0].every((card) => card.clicks === 1);
    !isMistake && setScore(score + 1);
    isMistake && setScore(0);
    score > highScore && setHighScore(highScore + 1);

    isMistake || noMistake ? setChange(!change) : console.log("No change");
  }, [isClicked]);

  const handleClick = (e) => {
    setCardDeck((draft) => {
      draft[0].map((card) => {
        if (Number(e.target.id) === card.id) {
          card.clicks += 1;
          return {
            ...card,
            clicks: card.clicks + 1,
          };
        }
        return card;
      });
    });
    setCardDeck((draft) => {
      shuffleArray(draft[0]);
    });
    setIsClicked(!isClicked);
  };
  return (
    <div className="App">
      <Header score={score} highScore={highScore} />
      <CardContainer>
        {cardDeck.length > 0 &&
          cardDeck[0].map((card) => (
            <Card
              key={card.id}
              id={card.id}
              onClick={handleClick}
              src={card.card_images[0].image_url}
            />
          ))}
      </CardContainer>
      <div className="footer">
        Instructions: Don't click the same card twice!
      </div>
    </div>
  );
}

export default App;
