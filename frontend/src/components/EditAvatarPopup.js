import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, }) {
    const avatarRef = React.useRef('');

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(
          {
            avatar: avatarRef.current.value,
          },
          () => {
            avatarRef.current.value = '';
          }
        );
      }
    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonName="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="avatar-input"
                type="url"
                placeholder="Ссылка на картинку"
                name="avatar"
                className="popup__input popup__input_type_avatar"
                ref={avatarRef}
                required
            />
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
    );
}
export default EditAvatarPopup;