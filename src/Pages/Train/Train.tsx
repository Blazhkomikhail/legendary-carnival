import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { cardSets } from '../../assets/cards';
import { RouteComponentProps } from 'react-router';

type MatchId = {
  id: string 
}

const Train = ( { match }: RouteComponentProps<MatchId> ) => {

  useEffect(() => getItems(), []);

  const [items, setItems] = useState([]);

  const getItems = () => {
    const cardsItems = cardSets.find(set => set.id.toString() === match.params.id);
    setItems(cardsItems.items);
  }

  const handleCardClick = (sound: string) => {
    const audio = new Audio(sound);
    audio.play();
  }

  const handleFlipCardClick = () => {
    console.log('flip');
  }

  const cardsComponents = items.map(item => {
    return <Card key={item.id}
    word={item.word} 
    image={item.image}
    translation={item.translation}
    onCardClick={() => handleCardClick(item.audioSrc)} 
    onFlipClick={() => handleFlipCardClick()} 
    />
  })
 
  return (
    <div className="train">
      {cardsComponents}
    </div>
  )
}

export default Train;