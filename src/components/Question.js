import React from 'react'
import Nav from "./Nav";
import '../css/question.css';
import {BsPerson,BsEmojiSunglasses,BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';


const Question = () => {
  return (
    <div>
        <Nav />
        <div>
            <div className='entete_questions'>
                <div className='toutes_les_questions'>
                    <div>
                        Toutes les questions
                    </div>
                    <div className='rechercher_questions'>

                        <input placeholder='Rechercher...' type="text" />
                        <BsSearch id='search_icon' size={20}/>  
                    </div>
                    
                </div>
                <Link className='link' to="/demander">
                    <div className='poser_questions'>
                        Poser une question
                    </div>
                </Link>
               
            </div>
            <div className='container_questions'>
                <div className='container_left_quest'>
                    <div className='score_rep_quest'>
                        
                        <b>Augmenter votre score de réputation</b>
                        
                    </div>
                    <div className='detail_score_rep_quest'>
                        Aider les autres à résoudre les problèmes pour augmenter votre score.
                        <BsEmojiSunglasses size={17} id="emoji_solomaso"/>    
                    </div>
                   
                </div>
                <div className='container_right_quest'>
                    <div className='nbr_questions'>
                        120,562 questions
                    </div>
                    <div className='liste_toutes_questions'>
                        <div className='question_box_questions'>
                            <div className='tete_kely_questions'>
                                <div className='qb_reponse_questions'>
                                    4 votes | 6 réponses 
                                </div>
                                <div className='qb_resolu_questions'>
                                    <b style={{color:"rgb(0,127,0)"}}>Résolue</b>
                                </div>          
                            </div> 
                            <div className='qb_titre_questions'>
                                <b>Generate graph from a list of connected components</b>
                            </div>
                            <div className='qb_techno_questions'>
                                <div className='techno_style_questions'>Javascript</div>
                                <div className='techno_style_questions'>Html</div>
                                <div className='techno_style_questions'>Css</div>
                            </div>
                            <div className='qb_nom_questions'>
                                <div className='nom_res_questions'>
                                    <BsPerson size={15}/>
                                    Garabs_Kely
                                </div>
                                <div className='nom_resolu_questions'>
                                    02-02-2023
                                </div> 
                            </div>
                        </div>
                        <div className='question_box_questions'>
                            <div className='tete_kely_questions'>
                                <div className='qb_reponse_questions'>
                                    4 votes | 6 réponses 
                                </div>
                                <div className='qb_resolu_questions'>
                                    
                                </div>          
                            </div> 
                            <div className='qb_titre_questions'>
                                <b>Generate graph from a list of connected components</b>
                            </div>
                            <div className='qb_techno_questions'>
                                <div className='techno_style_questions'>Javascript</div>
                                <div className='techno_style_questions'>Html</div>
                                <div className='techno_style_questions'>Css</div>
                            </div>
                            <div className='qb_nom_questions'>
                                <div className='nom_res_questions'>
                                    <BsPerson size={15}/>
                                    Garabs_Kely
                                </div>
                                <div className='nom_resolu_questions'>
                                    02-02-2023
                                </div> 
                            </div>
                        </div>
                        <div className='question_box_questions'>
                            <div className='tete_kely_questions'>
                                <div className='qb_reponse_questions'>
                                    4 votes | 6 réponses 
                                </div>
                                <div className='qb_resolu_questions'>
                                    <b style={{color:"rgb(0,127,0)"}}>Résolue</b>
                                </div>          
                            </div> 
                            <div className='qb_titre_questions'>
                                <b>Generate graph from a list of connected components</b>
                            </div>
                            <div className='qb_techno_questions'>
                                <div className='techno_style_questions'>Javascript</div>
                                <div className='techno_style_questions'>Html</div>
                                <div className='techno_style_questions'>Css</div>
                            </div>
                            <div className='qb_nom_questions'>
                                <div className='nom_res_questions'>
                                    <BsPerson size={15}/>
                                    Garabs_Kely
                                </div>
                                <div className='nom_resolu_questions'>
                                    02-02-2023
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Question
