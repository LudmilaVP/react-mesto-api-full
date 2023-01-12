import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards }) {
  const profileContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img className="profile__image" src={profileContext.avatar} alt="Фото аватара" />
          <button className="profile__image-overlay" type="button"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{profileContext.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{profileContext.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => {
          return <Card
            key={item._id}
            cardId={item._id}
            name={item.name}
            link={item.link}
            likeUser={item.likes}
            like={item.likes.length}
            ownerId={item.owner}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />;
        })}
      </section>
    </main>
  );
}

export default Main;