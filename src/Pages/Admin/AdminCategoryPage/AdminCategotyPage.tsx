import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { getCardsByCategoryName, createCard } from '../../../api/api';
import WordCard from '../WordCard/WordCard';
import newCardModal from '../newCardModal/newCardModal';

type MatchId = {
  id: string;
};

const AdminCategotyPage = ( { match }: RouteComponentProps<MatchId>): ReactElement => {
  const [wordCards, setWordCards] = useState([]);
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newSoundSrc, setNewSoundSrc] = useState('');
  const fileInput = useRef<HTMLInputElement>();

  const cancelModalHandler = () => {
    setIsModalShowed(false);
  }

  const changeModalWordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(e.target.value);
  }
  
  const changeModalTranslationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTranslation(e.target.value);
  }

  const changeModalSoundHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSoundSrc(e.target.value);
  }

  const submitModalHandler = async () => {
    const formData = new FormData();
    formData.append('picture', fileInput.current.files[0]);
    formData.set('word', newWord);
    formData.set('translation', newTranslation);
    formData.set('audioSrc', newSoundSrc);
    formData.set('categoryName', match.params.id);

    try {
      await createCard(formData);
      setIsModalShowed(false);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    } 
  }

  useEffect(() => {
    getCardsByCategoryName(match.params.id)
      .then((response) => {
        const cards = response.map((card: any) => {
          return <WordCard 
            word={card.word} 
            translation={card.translation}
            sound={card.audioSrc}
            picture={card.picture}
            id={card._id}
            key={card._id}
          />
        })
        setWordCards(cards);
      })
  }, []);
 

  return (
    <div className="admin__category-page">
      {wordCards}
      <button  
        className="admin__add-new-button" 
        type="button"
        onClick={() => setIsModalShowed(true)}
      >Add new card</button>
      { isModalShowed ? 
          newCardModal(
            cancelModalHandler,
            changeModalWordHandler,
            changeModalTranslationHandler,
            changeModalSoundHandler,
            submitModalHandler,
            fileInput
          )
          : null
      }
    </div>
  )
};

export default AdminCategotyPage;
