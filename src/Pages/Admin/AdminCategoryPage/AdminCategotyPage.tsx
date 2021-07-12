import React, { ReactElement, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { getCardsByCategoryName } from '../../../api/api';
import WordCard from '../WordCard/WordCard';

type MatchId = {
  id: string;
};


const AdminCategotyPage = ({ match }: RouteComponentProps<MatchId>): ReactElement => {
  const [wordCards, setWordCards] = useState([]);

  useEffect(() => {
    getCardsByCategoryName(match.params.id)
      .then((response) => {
        console.log(response)
      const cards = response.map((card: any) => {
        return <WordCard 
          word={card.word} 
          translation={card.translation}
          sound={card.audioSrc}
          key={card._id} 
        />
      })
      setWordCards(cards);
    })
  }, []);
 

  return (
    <div className="admin__category-page">
      {wordCards}
    </div>
  )
};

export default AdminCategotyPage;
