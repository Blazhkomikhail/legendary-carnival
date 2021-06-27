import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { cardSets } from '../../assets/cards';
import { RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';


type MatchId = {
  id: string 
}

const Train = ( { match }: RouteComponentProps<MatchId> ) => {
  const mode = useSelector(state => state);
  useEffect(() => getItems(),[]);

  const [items, setItems] = useState([]);

  const getItems = () => {
    const cardsItems = cardSets.find(set => set.id.toString() === match.params.id);
    if (!cardsItems) return;
    setItems(cardsItems.items);
  }

  const handleCardClick = (sound: string) => {
    const audio = new Audio(sound);
    audio.play();
  }

  const cardsComponents = items.map(item => {
    return <Card key={item.id}
    word={item.word} 
    image={item.image}
    translation={item.translation}
    onCardClick={() => handleCardClick(item.audioSrc)} 
    />
  })
 
  return (
    <div className={ mode === 'TRAIN' ? 'train': 'game' }>
      {cardsComponents}
    </div>
  )
}

export default Train;