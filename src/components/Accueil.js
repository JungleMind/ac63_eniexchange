import React, {useState,useEffect} from 'react'
import Nav from "./Nav";
import '../css/accueil.css';
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline } from "react-icons/md";
import avatar from '../images/avatar.png' 
import { Link } from 'react-router-dom';
import axios from 'axios'

const Accueil = () =>{
    const [showapercu,setShowapercu] =useState(true);
    const [showquestion,setShowquestion] =useState(false);
    const [showanswer,setShowanswer] =useState(false);
    const [showreputation,setShowreputation] =useState(false);

    const [borderapercu,setBorderapercu] = useState("3px solid green");
    const [borderquestion,setBorderquestion] = useState("3px solid transparent");
    const [borderanswer,setBorderanswer] = useState("3px solid transparent");
    const [borderrep,setBorderrep] = useState("3px solid transparent");

    const [connectedUser,setConnecteduser] = useState([]);
    const [userid,setUserid] = useState(localStorage.getItem('user'))
    const [myquest,setMyquest] = useState([])
    const [myans,setMyans] = useState([])




    const [edit,setEdit] = useState(false);

    const loadDataUsers = async()=>{
        const response = await axios.get("http://localhost:6969/api/user/"+userid);
        setConnecteduser(response.data);
        const response1 = await axios.get("http://localhost:6969/api/question/MyQuestions/"+userid);
        setMyquest(response1.data);
        const response2 = await axios.get("http://localhost:6969/api/answer/user/"+userid);
        setMyans(response2.data);
     }

    useEffect(() => {
        getUserById()
        loadDataUsers()
        getMyAnswer()
        getMyQuestions()
     }, []);

    const accessToken = localStorage.getItem('accessToken');

    const getUserById= ()=>{
        axios.get("http://localhost:6969/api/user/"+userid).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 201) {
                console.log(response.data)
                setConnecteduser(response.data)
            }
        });
    }

    const getMyQuestions = ()=> {
        axios.get("http://localhost:6969/api/question/MyQuestions/"+userid).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 201) {
                console.log(response.data)
                setMyquest(response.data)
            }
        });
    }

    const getMyAnswer = ()=> {
        axios.get("http://localhost:6969/api/answer/user/"+userid).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 201) {
                console.log(response.data)
                setMyans(response.data)
            }
        });
    }

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
                            <img src ={require('../images/'+connectedUser.image+'.png')} alt="Photo de profil"/>
                        </div>
                        {
                            !edit && (
                                <div>
                                    <div className='name_profil_acc'>
                                        <div className='nom_acc'>
                                            <b>{connectedUser.firstName == undefined ? "" : connectedUser.firstName }</b>
                                            {/* {connectedUser._id} */}
                                        </div>
                                        <div>
                                            <MdInfoOutline className='icon_items_acc' size={15}/>
                                            {connectedUser.matricule} | {connectedUser.niveau}
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
                                           <div>{myquest.length}</div>
                                           <div className='soratra_details'>Questions</div>
                                        </div>
                                        <div className='details_details_acc'>
                                           <div>{myans.length}</div>
                                           <div className='soratra_details'>Réponse</div>
                                        </div> 
                                </div>
                                <b>Réputation</b>
                                <div className='box_acc'>
                                    
                                        <div className='details_details_acc'>
                                           <div>{connectedUser.reputation}</div>
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
                                        <b>{myquest.length} questions</b>
                                        <div className='liste_question'>

                                        {
                                            myquest.length != 0 && myquest.map((myq,index)=>{
                                            <div className='question_box'>
                                                <div className='tete_kely'>
                                                    <div className='qb_reponse'>
                                                    {myq.voteTotal} votes | {myq.answers == null ? '0' : myq.answers } réponses 
                                                    </div>
                                                    {
                                                        myq.resolu &&(
                                                            <div className='qb_resolu_questions'>
                                                                <b style={{color:"rgb(0,127,0)"}}>Résolue</b>
                                                            </div>  
                                                        )
                                                    }
                                                </div> 
                                                <div className='qb_titre'>
                                                <b>{myq.questionTitle}</b>
                                                </div>
                                                <div className='qb_techno'>
                                                    <div className='techno_style_questions'>{typeof(myq.technology)}</div>
                                                </div>
                                            </div>
                                            })
                                        }

                                        {
                                            myquest.length == 0 && (
                                                <Link className='link' to="/question">
                                                    <div className='btn_add_question'>
                                                        Nouvelle question
                                                    </div>
                                                </Link>
                                            )
                                        }
             
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
                                    <b>{myans.length} réponses</b>
                                    <div className='liste_question'>

                                        {
                                            myans.length != 0 && myans.map((ans,index)=>{
                                                <div className='question_box'>
                                                    <div className='tete_kely'>
                                                        <div className='qb_reponse'>
                                                            {ans.votePLus} vote + | {ans.voteMoins} vote -
                                                        </div>
                                                        {
                                                            ans.solution &&(
                                                                <div className='qb_resolu'>
                                                                    <b style={{color:"rgb(0,127,0)"}}>Accepté</b>
                                                                </div>  
                                                            )
                                                        }
                                                    </div> 
                                                    <div className='qb_titre'>
                                                        <b>{ans.content}</b>
                                                    </div>
                                                    {/* <div className='qb_techno'>
                                                        <div className='techno_style'>Javascript</div>
                                                        <div className='techno_style'>Html</div>
                                                        <div className='techno_style'>Css</div>
                                                    </div> */}
                                                </div>
                                            })
                                        }

                                        {
                                            myans.length == 0 && (
                                                <div>
                                                    Aidez les autres à trouver une solution.
                                                </div>
                                            )
                                        }
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
                                                <div>{connectedUser.reputation}</div>
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
                                                <div>{connectedUser.votePlus == null ? "0" : connectedUser.votePlus.length}</div>
                                                <div className='soratra_details'>Votes pour</div>
                                                </div>
                                                <div className='details_details_rep'>
                                                <div>{connectedUser.voteMoins == null ? "0" : connectedUser.voteMoins.length}</div>
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

