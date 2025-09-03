import { useState } from "react";
import styles from './styles.module.css';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const arrowSrc = isOpen ? '/assets/images/arrow-up.png' : '/assets/images/arrow-down.png';

    return(
        <div className ={styles['profile-dropdown']}>
            <div className={styles['profile-dropdown-item']}>
                <img className={styles['user-img']} src='/assets/images/user-avatar.png' alt="Профиль" />
                <button className={styles['button-no-bg']} onClick={() => setIsOpen(!isOpen)}><img src={arrowSrc}  alt="Стрелка" /></button>
                {
                    isOpen && (
                        <ul className={styles['profile-dropdown-list']}>
                            <li>Profile</li>
                            <li>Log Out</li>
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default ProfileDropdown;