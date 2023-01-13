import React from "react";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from './Main.js';
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg'

function App() {
  //хуки
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState({ opened: false, success: false });
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserProfile()])
        .then(([initialCards, currentUserData]) => {
          setCards(initialCards);
          setCurrentUser(currentUserData);
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

const tokenCheck = () => {
  api.getContent()
    .then((res) => {
      setLoggedIn(true);
      setUserEmail(res.email);
      history.push('/');
    })
    .catch((err) => console.log(err));
}
React.useEffect(() => {
  if (!loggedIn) {
    tokenCheck();
  }
}, []);

function handleSignupSubmit(email, password) {
  auth.login(email, password)
    .then(result => {
      if (result) {
        setUserEmail(result.email);
        setInfoTooltipOpen({ opened: true, success: true })
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
      setInfoTooltipOpen({ opened: true, success: false })
    })
}

function handleSigninSubmit(email, password) {
  auth.authorization(email, password)
    .then((res) => {
      setUserEmail(email);
      setLoggedIn(true);
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setInfoTooltipOpen({ opened: true, success: false })
    })
}

function handleLogout() {
  auth.logout();
  history.push("/sign-in");
  setLoggedIn(false);
  setUserEmail("");
}

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleClickCard(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen({ opened: false, success: false });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUserProfile({ name, about }) {
    api
      .setUserProfile({ name, about })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUserAvatar({ avatar }) {
    api
      .updateUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          onLogout={handleLogout}
          loggedIn={loggedIn}
        />
        <Switch>
          <ProtectedRoute exact path='/'
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleClickCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Route path="/sign-in">
            <Login
              onSignin={handleSigninSubmit}
            />
          </Route>

          <Route path="/sign-up">
            <Register
              onSignup={handleSignupSubmit}
            />
          </Route>

          <Route exact path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUserProfile}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateUserAvatar}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen.opened}
          statusImage={isInfoTooltipOpen.success ? successImage : failImage}
          title={isInfoTooltipOpen.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;