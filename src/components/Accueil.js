import React, {useState} from 'react'
import Nav from "./Nav";
import '../css/accueil.css';
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline } from "react-icons/md";
import avatar from '../images/avatar.png' 
import { Link } from 'react-router-dom';

const Accueil = () =>{
    const [showapercu,setShowapercu] =useState(true);
    const [showquestion,setShowquestion] =useState(false);
    const [showanswer,setShowanswer] =useState(false);
    const [showreputation,setShowreputation] =useState(false);

    const [borderapercu,setBorderapercu] = useState("3px solid green");
    const [borderquestion,setBorderquestion] = useState("3px solid transparent");
    const [borderanswer,setBorderanswer] = useState("3px solid transparent");
    const [borderrep,setBorderrep] = useState("3px solid transparent");

    const [edit,setEdit] = useState(false)


    return(
        <div>
            <Nav />
            <div>
                <div className='menu_acc'>
                    <div 
                        className='menu_items_acc' 
                        style={{borderBottom:borderapercu}} 
                        onClick={()=>{
                            setBorderapercu("3px solid green");
                            setBorderquestion("3px solid transparent");
                            setBorderanswer("3px solid transparent");
                            setBorderrep("3px solid transparent");

                            setShowapercu(true)
                            setShowquestion(false)
                            setShowanswer(false)
                            setShowreputation(false)

                    }}>
                        <MdOutlineSummarize className='icon_items_acc' size={15}/>
                        Aperçu
                    </div>
                    <div 
                        className='menu_items_acc' 
                        style={{borderBottom:borderquestion}}  
                        onClick={()=>{
                            setBorderapercu("3px solid transparent");
                            setBorderquestion("3px solid green");
                            setBorderanswer("3px solid transparent");
                            setBorderrep("3px solid transparent");

                            setShowapercu(false)
                            setShowquestion(true)
                            setShowanswer(false)
                            setShowreputation(false)
                        }}>
                        <MdQuestionMark className='icon_items_acc' size={15}/>
                        Questions
                    </div>
                    <div className='menu_items_acc' 
                    style={{borderBottom:borderanswer}}
                    onClick={()=>{
                        setBorderapercu("3px solid transparent");
                        setBorderquestion("3px solid transparent");
                        setBorderanswer("3px solid green");
                        setBorderrep("3px solid transparent");

                        setShowapercu(false)
                        setShowquestion(false)
                        setShowanswer(true)
                        setShowreputation(false)
                    }}>
                    
                    
                        <MdOutlineQuestionAnswer className='icon_items_acc' size={15}/>
                        Réponses
                    </div>
                    <div className='menu_items_acc' style={{borderBottom:borderrep}}
                    onClick={()=>{
                        setBorderapercu("3px solid transparent");
                        setBorderquestion("3px solid transparent");
                        setBorderanswer("3px solid transparent");
                        setBorderrep("3px solid green");

                        setShowapercu(false)
                        setShowquestion(false)
                        setShowanswer(false)
                        setShowreputation(true)
                    }} 
                    >
                        <MdStarOutline className='icon_items_acc' size={15}/>
                        Réputation
                    </div>
                </div>
                <div className='content_acc'>
                    <div className='content_left_acc'>
                        <div className='image_profil_acc'>
                            <img src={avatar} alt="Photo de profil"/>
                        </div>
                        {
                            !edit && (
                                <div>
                                    <div className='name_profil_acc'>
                                        <div className='nom_acc'>
                                            <b>RAJAONARISON</b>
                                        </div>
                                        <div>
                                            <MdInfoOutline className='icon_items_acc' size={15}/>
                                            809H-F | M2
                                        </div>
                                    </div>
                                    <div className='edit_profil_acc' onClick={()=>setEdit(true)  
                                     }>
                                        Modifier les infos
                                    </div>
                                </div>
                            )
                        }
                        {
                            edit && (
                                <div>
                                <div className='input_acceuil'>
                                    <label>Nom</label>
                                    <input 
                                        type="text" 
                                        placeholder='Entrez votre nom'
                                        id="firstname"
                                        name="firstname"
                                        // value={firstname}
                                        // onChange={handleInputChange}
                                        required />
                                </div>
                                <div className='input_acceuil'>
                                    <label>Email</label>
                                    <input 
                                        type="text" 
                                        placeholder='Entrez votre email'
                                        id="email"
                                        name="email"
                                        // value={email}
                                        // onChange={handleInputChange}
                                        required />
                                </div>
                                <div className='btn_enregistrer' >
                                    <div id='enregistrer' onClick={()=>setEdit(false)}>
                                        Enregistrer
                                    </div>
                                    <div id='annuler' onClick={()=>setEdit(false)}>
                                        Annuler
                                    </div>

                                    
                                </div>
    
                            </div>
                            )
                        }
                        

                       

                    </div>
                    <div className='content_right_acc'>
                        {
                            showapercu && (
                                <div className='apercu_div'>
                                <b>Question/Réponse</b>
                                <div className='box_acc'>
                                    
                                        <div className='details_details_acc'>
                                           <div>3</div>
                                           <div className='soratra_details'>Questions</div>
                                        </div>
                                        <div className='details_details_acc'>
                                           <div>0</div>
                                           <div className='soratra_details'>Réponse</div>
                                        </div> 
                                </div>
                                <b>Réputation</b>
                                <div className='box_acc'>
                                    
                                        <div className='details_details_acc'>
                                           <div>0</div>
                                           <div className='soratra_details'>Réputation</div>
                                        </div>
    
                                        <div className='details_details_acc'>
                                           <div>0</div>
                                           <div className='soratra_details'>Vote</div>
                                        </div>
                                </div>
                            </div>
                            )
                        }

                        {
                            showquestion && (
                                <div className='content_question'>
                                    <div className='question_div'> 
                                    <b>3 questions</b>
                                    <div className='liste_question'>
                                    <div className='question_box'>
                                            <div className='tete_kely'>
                                                <div className='qb_reponse'>
                                                    4 votes | 6 réponses
                                                </div>
                                                <div className='qb_resolu'>
                                                    <b style={{color:"rgb(0,127,0)"}}>Résolue</b>
                                                </div>
                                                
                                            </div> 
                                            <div className='qb_titre'>
                                                <b>Generate graph from a list of connected components</b>
                                            </div>
                                            <div className='qb_techno'>
                                                <div className='techno_style'>Javascript</div>
                                                <div className='techno_style'>Html</div>
                                                <div className='techno_style'>Css</div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='ajouter_question'>
                                        <div className='poser_question_title'>
                                            Poser une question
                                        </div>
                                        <div className='detail_question'>
                                            Soyez précis et imaginez que vous posez une question à une autre personne.
                                        </div>
                                        <Link className='link' to="/question">
                                            <div className='btn_add_question'>
                                                Nouvelle question
                                            </div>
                                        </Link>
                                        
                                    </div>
                                </div>
                            ) 
                        }

                        {
                            showanswer && (
                                <div className='question_div'> 
                                    <b>3 réponses</b>
                                    <div className='liste_question'>
                                        <div className='question_box'>
                                            <div className='tete_kely'>
                                                <div className='qb_reponse'>
                                                    4 votes
                                                </div>
                                                <div className='qb_resolu'>
                                                    <b style={{color:"rgb(0,127,0)"}}>Accepté</b>
                                                </div>
                                                
                                            </div> 
                                            <div className='qb_titre'>
                                                <b>Generate graph from a list of connected components</b>
                                            </div>
                                            <div className='qb_techno'>
                                                <div className='techno_style'>Javascript</div>
                                                <div className='techno_style'>Html</div>
                                                <div className='techno_style'>Css</div>
                                            </div>
                                        </div>
                                        <div className='question_box'>
                                            <div className='tete_kely'>
                                                <div className='qb_reponse'>
                                                    4 votes
                                                </div>
                                                <div className='qb_resolu'>
                                                    <b style={{color:"rgb(0,127,0)"}}>Accepté</b>
                                                </div>
                                                
                                            </div> 
                                            <div className='qb_titre'>
                                                <b>Generate graph from a list of connected components</b>
                                            </div>
                                            <div className='qb_techno'>
                                                <div className='techno_style'>Javascript</div>
                                                <div className='techno_style'>Html</div>
                                                <div className='techno_style'>Css</div>
                                            </div>
                                        </div>
                                        <div className='question_box'>
                                            <div className='tete_kely'>
                                                <div className='qb_reponse'>
                                                    4 votes
                                                </div>
                                                <div className='qb_resolu'>
                                                    <b style={{color:"rgb(0,127,0)"}}>Accepté</b>
                                                </div>
                                                
                                            </div> 
                                            <div className='qb_titre'>
                                                <b>Generate graph from a list of connected components</b>
                                            </div>
                                            <div className='qb_techno'>
                                                <div className='techno_style'>Javascript</div>
                                                <div className='techno_style'>Html</div>
                                                <div className='techno_style'>Css</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) 
                        }

                        {
                            showreputation && (
                                <div className='fizarana_reputation'>
                                    <div className='reputation_div'>
                                        <b>Réputations</b>
                                        <div className='box_rep'>
                                                <div className='details_details_rep'>
                                                <div>3</div>
                                                <div className='soratra_details'>Réputations</div>
                                                </div>
                                                <div className='details_details_rep'>
                                                <div>0</div>
                                                <div className='soratra_details'>Votes</div>
                                                </div> 
                                        </div>
                                        <b>Votes</b>
                                        <div className='box_rep'>
                                                <div className='details_details_rep'>
                                                <div>3</div>
                                                <div className='soratra_details'>Votes pour</div>
                                                </div>
                                                <div className='details_details_rep'>
                                                <div>0</div>
                                                <div className='soratra_details'>Votes contre</div>
                                                </div> 
                                        </div>
                                    </div>
                                    <div className='explication_reputation'>
                                        <b>Augmenter la réputation</b> 
                                        <div className='box_rep_rep'>
                                            Votre score de réputation augmente lorsque les autres votent pour vos questions, réponses et modifications.
                                        </div>
                                    </div>
                                </div>
                            ) 
                        }
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accueil; 

