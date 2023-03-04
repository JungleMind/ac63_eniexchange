import React, {useState} from 'react'
import Nav from "./Nav";
import '../css/accueil.css';
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline } from "react-icons/md";
import maharo from "../images/Maharo.png"

const Accueil = () =>{
    const [showapercu,setShowapercu] =useState(true);
    const [showquestion,setShowquestion] =useState(false);
    const [showanswer,setShowanswer] =useState(false);
    const [showreputation,setShowreputation] =useState(false);

    const [borderapercu,setBorderapercu] = useState("2px solid green");
    const [borderquestion,setBorderquestion] = useState("none");
    const [borderanswer,setBorderanswer] = useState("none");
    const [borderrep,setBorderrep] = useState("none");


    return(
        <div>
            <Nav />
            <div>
                <div className='menu_acc'>
                    <div 
                        className='menu_items_acc' 
                        style={{borderBottom:borderapercu}} 
                        onClick={()=>{
                            setBorderapercu("none");
                            setBorderquestion("2px solid green");
                            setBorderanswer("2px solid green");
                            setBorderrep("2px solid green");
                    }}>
                        <MdOutlineSummarize className='icon_items_acc' size={15}/>
                        Aperçu
                    </div>
                    <div className='menu_items_acc' style={{borderBottom:borderquestion}}>
                        <MdQuestionMark className='icon_items_acc' size={15}/>
                        Questions
                    </div>
                    <div className='menu_items_acc' style={{borderBottom:borderanswer}}>
                        <MdOutlineQuestionAnswer className='icon_items_acc' size={15}/>
                        Réponses
                    </div>
                    <div className='menu_items_acc' style={{borderBottom:borderrep}}>
                        <MdStarOutline className='icon_items_acc' size={15}/>
                        Réputation
                    </div>
                </div>
                <div className='content_acc'>
                    <div className='content_left_acc'>
                        <div className='image_profil_acc'>
                            <img src={maharo} alt="Photo de profil"/>
                        </div>
                        <div className='name_profil_acc'>
                            <div className='nom_acc'>
                                <b>RAJAONARISON</b>
                            </div>
                            <div>
                                <MdInfoOutline className='icon_items_acc' size={15}/>
                                809H-F | M2
                            </div>
                        </div>
                        <div className='edit_profil_acc'>
                            Modifier les infos
                        </div>

                    </div>
                    <div className='content_right_acc'>
                        {
                            showapercu && (
                                <div className='apercu_div'>
                                <b>Question/Réponse</b>
                                <div className='box_acc'>
                                    
                                        <div className='details_details_acc'>
                                           <div>0</div>
                                           <div className='soratra_details'>Question</div>
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
                                <div>
                                    Question
                                </div>
                            ) 
                        }

                        {
                            showanswer && (
                                <div>
                                    Réponse
                                </div>
                            ) 
                        }

                        {
                            showreputation && (
                                <div>
                                    Réputation
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

