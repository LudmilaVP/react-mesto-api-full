import React from 'react';

function ImagePopup(props) {
  return (
    <section className={props.card.opened ? 'popup popup_opened' : 'popup'} onClick={props.onClose}>
      <div className="popup__box">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}>
        </button>
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <h2 className="popup__caption">{props.card?.name ?? ""}</h2>
      </div>
    </section>
  );
}
export default ImagePopup;