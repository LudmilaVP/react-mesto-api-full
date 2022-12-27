import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleUserName(e) {
        setName(e.target.value)
    }

    function handleUserDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            buttonName="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="username-input"
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__input popup__input_type_username"
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleUserName}
                required
            />
            <span className="popup__input-error username-input-error"></span>
            <input
                id="text-input"
                type="text"
                name="about"
                placeholder="О себе"
                className="popup__input popup__input_type_job"
                minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleUserDescription}
                required
            />
            <span className="popup__input-error text-input-error"></span>

        </PopupWithForm>
    );
}
export default EditProfilePopup;