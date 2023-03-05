import React from 'react'
import Nav from "./Nav";
import '../css/ask.css';
import ask from '../images/ask.png' 
import {BsEmojiWink } from "react-icons/bs";


const Ask = () => {
  return (
    <div>
        <Nav />
        <div className='entete_ask'>
                <div className='toutes_les_ask'>
                    <div>
                        Poser une nouvelle question
                    </div>
                </div>              
        </div>
        <div className='middle_ask'>
            <div className='left_ask'>
                <div className='ask_sary'>
                   <img src={ask} alt="Poser une nouvelle question"/>
                </div>
            </div>
            <div className='right_ask'>
                <div className='boite_ask'>
                    <div className='titre_ask'>
                        Titre
                    </div>
                    <div className='para_ask'>
                        Saisir le titre de votre question. Soyez spécifique, concis et clair. 
                        <BsEmojiWink size={17} id="emoji_wink"/> 
                    </div>
                    <input type="texte" placeholder="Titre" id='titre_titre_ask'/>
                </div>
                <div className='boite_ask'>
                    <div className='titre_ask'>
                        Détails du problème et objectifs
                    </div>
                    <div className='para_ask'>
                        Décrivez votre problème, ce que vous avez essayé, ce que vous espériez et ce qui en a résulté. 
                    </div>
                    <input type="texte" placeholder="Détails" /> 
                </div>
                <div className='boite_ask'>
                    <div className='titre_ask'>
                        Technologies
                    </div>
                    <div className='para_ask'>
                        Précisez les techno que vous avez utilisés. 
                    </div>
                    <input type="texte" placeholder="Technologie" id='titre_techno_ask'/>
                </div>
            </div>
        </div>
     
    </div>
  )
}

export default Ask
