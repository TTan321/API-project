import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal/LoginModal";
import SignUpFormModel from "../SignUpFormModal/SignUpFormModel";
import UserReviews from "../UserReviews/UserReviews";
import './ProfileButton.css'

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    const reviews = (e) => {
        e.preventDefault();
        setShowMenu(showMenu === false ? true : false);
        return history.push('/reviews')
    }

    const hostspot = (e) => {
        e.preventDefault();
        setShowMenu(showMenu === false ? true : false);
        return history.push('/hostspot')
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        setShowMenu(showMenu === false ? true : false);
    };

    if (user) {
        return (
            <div className="profile-container">
                <p onClick={() => history.push(user ? "/hostspot" : "/login")}>Become a host</p>
                <button className="profile-button" onClick={() => setShowMenu(showMenu === false ? true : false)}>
                    <i className="fas fa-bars" />
                    <i className="fas fa-user-circle fa-2x" />
                </button>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li>{user.username}</li>
                        <li className="user-email">{user.email}</li>
                        <li onClick={reviews}>Your Reviews</li>
                        <li onClick={hostspot}>Your Active Listings</li>
                        <li>
                            <button className="logout-button" onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                )}
            </div>
        )
    } else {
        return (
            <div className="profile-container">
                <p onClick={() => history.push(user ? "/hostspot" : "/login")}>Become a host</p>
                <button className="profile-button" onClick={() => setShowMenu(showMenu === false ? true : false)}>
                    <i className="fas fa-bars" />
                    <i className="fas fa-user-circle fa-2x" />
                </button>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li><LoginFormModal setShowMenu={setShowMenu} /></li>
                        <li><SignUpFormModel setShowMenu={setShowMenu} /></li>
                    </ul>
                )}
            </div>
        )
    }
}

export default ProfileButton;
