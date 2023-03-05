import React, { useState,useEffect } from 'react'
import Nav from "./Nav";
import '../css/users.css';
import {BsSearch } from "react-icons/bs";
import users_sary_kely from '../images/users1.png' 
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline,MdOutlineSchool } from "react-icons/md";
import avatar from '../images/avatar.png' 
import axios from 'axios'

const Users = () => {
    const [usersList,setUserslist] = useState([])
    const [searchNom,setSearchnom] = useState("")



    const loadData = async()=>{
        const response = await axios.get("http://localhost:6969/api/user");
        setUserslist(response.data);
     }
  
     useEffect(() => {
       getUsers();
       loadData();
     }, []);

    const getUsers = ()=> {
        axios.get("http://localhost:6969/api/user").then(function (response) {
          if (response.status === 200) {
            setUserslist(response.data);
            console.log(JSON.stringify(response.data))
          } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
          }
        });
      }

    const searchByNom = (search_nom) =>{
        axios.get("http://localhost:6969/api/user?name="+search_nom).then(function (response) {
            if (response.status === 200) {
              setUserslist(response.data);
              console.log(JSON.stringify(response.data))
            } else {
              console.log("Vous n'êtes pas autorisé à accéder à cette page!");
            } 
    })}


  return (
    <div>
      <Nav />
      <div className='entete_users'>
        <div className='menu_users'>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdOutlineSummarize className='icon_items_users' size={15}/>
                        Tous
                    </div>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        L1
                    </div>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        L2
                    </div>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        L3
                    </div>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        M1
                    </div>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        M2
                    </div>
                    <div 
                        className='menu_items_users' 
                    >
                        <MdStarOutline className='icon_items_users' size={15}/>
                        Score
                    </div>

                </div>
           
        </div>
        <div className='middle_users'>
            <div className='left_users'>
                <div className='users_sary'>
                   <img src={users_sary_kely} alt="Utilisateurs"/>
                   <p style={{fontSize:"14px"}}>Forum communautaire des étudiants de l'Ecole Nationale d'Informatique de Fianarantsoa en ligne.</p>
                </div>
            </div>
            <div className='right_users'>
                
                <div className='filtre_container_users'>
                 <b>{usersList.length} Utilisateurs</b>
                    <div className='rechercher_users'>
                        <input 
                            placeholder='Rechercher...' 
                            type="text" 
                            onChange={(text)=>{
                                setSearchnom(text)
                            }}
                        />
                        <BsSearch 
                            id='search_icon_users' 
                            size={20} 
                            onClick={()=>{
                                searchByNom(searchNom);
                            }}/>  
                    </div>
                </div>
                <div className='liste_users'>
                    {usersList.length != 0 &&  usersList.map((user,index) =>(
                        <div className='boite_users'>
                        <div className='avatar_users'>
                            <img  src ={require('../images/'+user.image+'.png')} alt={user.firstName}/>
                        </div>
                        <div className='info_users'>
                            <div>
                                <b style={{color:"black"}}>{user.firstName}</b>
                            </div>
                            <div>
                                {user.niveau}
                            </div>
                            <div className='score_rep_users'>
                                <MdStarOutline size={15} color=""/>
                                {user.reputation}
                            </div>
                        </div>
                     </div>
                    ))}
                    
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Users
