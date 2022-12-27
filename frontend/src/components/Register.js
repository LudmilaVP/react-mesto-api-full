import React from 'react';
import { Link } from 'react-router-dom';


function Register(props) {

    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handlePasswordChange = (e) => { setPassword(e.target.value) };
    const handleEmailChange = (e) => { setEmail(e.target.value) };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSignup(email, password);
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form__title">Регистрация</h1>
                <input
                    className="form__item"
                    type="email"
                    id="sign-in-email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    required
                />
                <input
                    className="form__item"
                    type="password"
                    id="sign-in-password"
                    placeholder="Пароль"
                    onChange={handlePasswordChange}
                    required
                />
                <button className="form__button" type="submit">Регистрация</button>
                <p className="form__caption">Уже зарегистрированы?<Link className="form__link" to="/sign-in">Войти</Link></p>
            </form>
        </div>
    )
}

export default Register;