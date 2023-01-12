import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.ownerId === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_active' : ''}`
  );
  const isLiked = props.likeUser.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    props.onCardClick(props);
  }
  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }
  return (
    <div className="element">
      <div className="element__item">
        <img
          src={props.link}
          alt={props.name}
          className="element__image"
          onClick={handleClick}
        />
        <div className="element__group">
          <h3 className="element__title">{props.name}</h3>
          <div className="element__group-like">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}></button>
            <p className="element__like_counter">{props.like}</p>
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