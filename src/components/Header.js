import logoPicture from "./../images/header-logo.svg"

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <img src={logoPicture} className="logo__picture" alt="Logo picture"/>
                </div>
                <div className="header__buttons-group">
                    <a href="#Users" className="header__button button">Users</a>
                    <a href="#SignUp" className="header__button button">Sign up</a>
                </div>
            </div>
        </header>
    )
}

export default Header;