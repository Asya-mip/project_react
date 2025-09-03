import Logo from "./logo";
import ProfileDropdown from "./profile-dropdown";
import './styles.module.css';

const Header = () => {
    return (
        <header className = "header">
            <Logo />
            <ProfileDropdown />
        </header>
    );
};

export default Header;