import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_active' : ''}`
  );
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <div className="element__item">
        <img
          src={card.link}
          alt={card.name}
          className="element__image"
          onClick={handleClick}
        />
        <div className="element__group">
          <h3 className="element__title">{card.name}</h3>
          <div className="element__group-like">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}></button>
            <p className="element__like_counter">{card.likes.length}</p>
          </div>
        </div>
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleDeleteClick}></button>
      </div>
    </div>
  );
}

export default Card;