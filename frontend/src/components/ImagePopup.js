import React from 'react';

function ImagePopup(props) {
  return (
    <section className={`popup popup_image_zoom ${props.card && 'popup_opened'}`}>
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
        <h2 className="popup__caption">{props.card ? props.card.name : ''}</h2>
      </div>
    </section>
  );
}
export default ImagePopup;