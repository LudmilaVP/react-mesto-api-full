import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSigninSubmit = (e) => {
        e.preventDefault();
        props.onSignin(email, password);
    }
    return (
        <div>
            <form className="form" onSubmit={handleSigninSubmit}>
                <h1 className="form__title">Вход</h1>
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
                <button className="form__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;