import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link })
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);
    
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleCardName(e) {
        setName(e.target.value);
    }

    function handleCardLink(e) {
        setLink(e.target.value);
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="element"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            buttonName="Создать"
        >
            <input
                id="name-input"
                type="text"
                placeholder="Название"
                name="name"
                className="popup__input popup__input_type_title"
                minLength="2"
                maxLength="30"
                onChange={handleCardName}
                value={name ? name : ''}
                required
            />
            <span className="popup__input-error name-input-error"></span>
            <input
                id="url-input"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                className="popup__input popup__input_type_link"
                onChange={handleCardLink}
                value={link ? link : ''}
                required
            />
            <span className="popup__input-error url-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;