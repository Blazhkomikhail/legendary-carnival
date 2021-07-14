import React, { ReactElement, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { getCardsByCategoryName } from '../../../api/api';
import WordCard from '../WordCard/WordCard';
import NewCardModal from '../NewCardModal/NewCardModal';

type MatchId = {
  id: string;
};

const AdminCategotyPage = ({
  match,
}: RouteComponentProps<MatchId>): ReactElement => {
  const [wordCards, setWordCards] = useState([]);
  const [isModalShowed, setModalShowed] = useState(false);

  useEffect(() => {
    getCardsByCategoryName(match.params.id).then((response) => {
      const cards = response.map((card: any) => {
        return (
          <WordCard
            word={card.word}
            translation={card.translation}
            sound={card.audioSrc}
            picture={card.picture}
            id={card._id}
            key={card._id}
          />
        );
      });
      setWordCards(cards);
    });
  }, [match.params.id]);

  return (
    <div className="admin__category-page">
      {wordCards}
      <button
        className="admin__add-new-button"
        type="button"
        onClick={() => setModalShowed(true)}
      >
        Add new card
      </button>
      {isModalShowed ? (
        <NewCardModal
          categoryName={match.params.id}
          cancelHandler={() => setModalShowed(false)}
        />
      ) : null}
    </div>
  );
};

export default AdminCategotyPage;
