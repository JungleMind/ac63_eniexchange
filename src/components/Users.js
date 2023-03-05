import React, { useState,useEffect } from 'react'
import Nav from "./Nav";
import '../css/users.css';
import {BsSearch } from "react-icons/bs";
import users_sary_kely from '../images/users1.png' 
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline,MdOutlineSchool } from "react-icons/md";
import avatar from '../images/avatar.png' 
import axios from 'axios'

const initialNiv = {
    tous:"3px solid green",
    l1:"3px solid white",
    l2:"3px solid white",
    l3:"3px solid white",
    m1:"3px solid white",
    m2:"3px solid white"
}

const Users = () => {
    const [usersList,setUserslist] = useState([])
    const [searchNom,setSearchnom] = useState("")
    const [nivstate,setNiv]=useState(initialNiv)



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
            // console.log(JSON.stringify(response.data))
          } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
          }
        });
      }

    const searchByNom = (searchNom) =>{
        console.log(searchNom)
        if(searchNom == ""){
            getUsers();
        }
        else{
            console.log(searchNom)
            axios.get("http://localhost:6969/api/user?name="+searchNom).then(function (res) {
                
                if (res.status === 200) {
                  setUserslist(res.data);
                  console.log(JSON.stringify(res.data))
                } else {
                  console.log("Vous n'êtes pas autorisé à accéder à cette page!");
                } 
        })
    }




}

const getNiveau = (id)=>{
    if(id != 0){
        axios.get("http://localhost:6969/api/user/niveau?niveau="+id).then(function (res) {
            if (res.status === 200) {
              setUserslist(res.data);
              console.log(JSON.stringify(res.data))
            } else {
              console.log("Vous n'êtes pas autorisé à accéder à cette page!");
            } 
    })
    }
    else{
        getUsers()
    }
    
}


  return (
    <div>
      <Nav />
      <div className='entete_users'>
        <div className='menu_users'>
                    <div 
                        style={{borderBottom:nivstate.tous}}
                        className='menu_items_users' 
                        onClick={()=>
                            {
                                var niv = 0;
                                getNiveau(niv)
                                setNiv({
                                    tous:"3px solid green",
                                    l1:"3px solid white",
                                    l2:"3px solid white",
                                    l3:"3px solid white",
                                    m1:"3px solid white",
                                    m2:"3px solid white"
                                })
                            }}
                    >
                        <MdOutlineSummarize className='icon_items_users' size={15}/>
                        Tous
                    </div>
                    <div 
                        style={{borderBottom:nivstate.l1}}
                        className='menu_items_users' 
                        onClick={()=>
                            {
                                var niv = "L1";
                                getNiveau(niv)
                                setNiv({
                                    tous:"3px solid white",
                                    l1:"3px solid green",
                                    l2:"3px solid white",
                                    l3:"3px solid white",
                                    m1:"3px solid white",
                                    m2:"3px solid white"
                                })
                            }}
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        L1
                    </div>
                    <div 
                        className='menu_items_users'
                        style={{borderBottom:nivstate.l2}} 
                        onClick={()=>
                            {
                                var niv = "L2";
                                getNiveau(niv)
                                setNiv({
                                    tous:"3px solid white",
                                    l1:"3px solid white",
                                    l2:"3px solid green",
                                    l3:"3px solid white",
                                    m1:"3px solid white",
                                    m2:"3px solid white"
                                })
                            }}
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        L2
                    </div>
                    <div 
                        className='menu_items_users' 
                        style={{borderBottom:nivstate.l3}}
                        onClick={()=>
                            {
                                var niv = "L3";
                                getNiveau(niv)
                                setNiv({
                                    tous:"3px solid white",
                                    l1:"3px solid white",
                                    l2:"3px solid white",
                                    l3:"3px solid green",
                                    m1:"3px solid white",
                                    m2:"3px solid white"
                                })
                            }}
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        L3
                    </div>
                    <div 
                        className='menu_items_users'
                        style={{borderBottom:nivstate.m1}}
                        onClick={()=>
                            {
                                var niv = "M1";
                                getNiveau(niv)
                                setNiv({
                                    tous:"3px solid white",
                                    l1:"3px solid white",
                                    l2:"3px solid white",
                                    l3:"3px solid white",
                                    m1:"3px solid green",
                                    m2:"3px solid white"
                                })
                            }} 
                    >
                        <MdOutlineSchool className='icon_items_users' size={15}/>
                        M1
                    </div>
                    <div 
                        className='menu_items_users'
                        style={{borderBottom:nivstate.m2}} 
                        onClick={()=>
                            {
                                var niv = "M2";
                                getNiveau(niv)
                                setNiv({
                                    tous:"3px solid white",
                                    l1:"3px solid white",
                                    l2:"3px solid white",
                                    l3:"3px solid white",
                                    m1:"3px solid white",
                                    m2:"3px solid green"
                                })
                            }}
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
                            onChange={(e)=>{
                                console.log(e.target.value)
                                setSearchnom(e.target.value)
                            }}
                        />
                        <BsSearch 
                            id='search_icon_users' 
                            size={20} 
                            onClick={()=>{
                                console.log("SEARCH")
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
