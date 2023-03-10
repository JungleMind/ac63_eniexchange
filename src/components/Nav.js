import React, {useState} from 'react'
import '../css/nav.css';
import { Link,useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

import avatar from '../images/avatar.png' 


const Nav = () =>{
    const navigate = useNavigate();
    return(
        <>
        <header>
            <div className='container_left_nav'>
                <div className='logo_nav'>
                    <b id='texte_eni_nav'>Eni</b>Exchange<b></b>
                </div>
                <div className='menu_nav'>
                    <Link className='link' to="/accueil">
                        <div className='menu_items_nav'>
                            Dashboard
                        </div>
                    </Link>
                    <Link className='link' to="/question">
                        <div className='menu_items_nav'>
                            Questions
                        </div>
                    </Link>
                    <Link className='link' to="/utilisateurs">
                        <div className='menu_items_nav'>
                            Utilisateurs
                        </div>
                    </Link>
                </div>
            </div>
            <div className='container_right_nav'>
                <div className='icon_notif_nav'>
                    <IoMdNotificationsOutline  size={25}/>
                </div>
                <div className='menu_profil_nav' onClick={()=>{
                    if (window.confirm("Vous allez vous déconnecter")) {
                        localStorage.setItem('user',null)
                        localStorage.setItem('isSignedIn',false)
                        navigate('/');
                    }
                }}>
                    <AiOutlineLogout  size={23} title="Se déconnecter"/>
                </div>
            </div>
        </header>
        </>
    )
}

export default Nav; 

