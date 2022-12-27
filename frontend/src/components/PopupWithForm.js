import React from "react";
function PopupWithForm({ name, title, isOpen, onClose, buttonName, children, onSubmit }) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form
            onSubmit={onSubmit}
            className="popup__form"
            name={`${name}_form`}
            noValidate>
            {children}
            <button type="submit" className="popup__button">
              {buttonName}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default PopupWithForm;