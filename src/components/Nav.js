import React, {useState} from 'react'
import '../css/nav.css';
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";


const Nav = () =>{
    return(
        <>
        <header>
            <div className='container_left_nav'>
                <div className='logo_nav'>
                    <b id='texte_eni_nav'>Eni</b>Exchange<b></b>
                </div>
                <div className='menu_nav'>
                    <Link className='link'>
                        <div className='menu_items_nav'>
                            Dashboard
                        </div>
                    </Link>
                    <Link className='link'>
                        <div className='menu_items_nav'>
                            Questions
                        </div>
                    </Link>
                    <Link className='link'>
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
                <div className='menu_profil_nav'>
                    J
                </div>
            </div>
        </header>
        </>
    )
}

export default Nav; 

