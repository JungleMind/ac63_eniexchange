import React,{useState,useEffect} from 'react'
import Nav from "./Nav";
import '../css/question.css';
import {BsPerson,BsEmojiSunglasses,BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios'


const Question = () => {
    const [question_list,setQuestion_list] = useState([]);


    const loadDataquestions = async()=>{
        const response = await axios.get("http://localhost:6969/api/question");
        setQuestion_list(response.data);
     }
  
     useEffect(() => {
        getAllquestions();
       loadDataquestions();
     }, []);

    const getAllquestions = ()=> {
        axios.get("http://localhost:6969/api/question").then(function (response) {
          if (response.status === 200) {
            setQuestion_list(response.data);
            console.log(JSON.stringify(response.data))
          } else {
            console.log("Vous n'êtes pas autorisé à accéder à cette page!");
          }
        });
      }

    // const getUserById = async(id)=>{

    //     const response =  await axios.get("http://localhost:6969/api/user/"+id);
    //     console.log(JSON.stringify(response.data)) 
    //     return(
    //         <div>
                
    //         </div>
    //     )
        
    //  }
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
                        {question_list.length} questions
                    </div>
                    <div className='liste_toutes_questions'>
                    {question_list.length != 0 &&  question_list.map((question,index) => {
                        var username = axios.get("http://localhost:6969/api/user/"+question.questionAuthorId);
                        console.log(JSON.stringify(username))


                               return(
                                <Link className='link' to={"/detailquestion/" + question._id}>
                                    <div className='question_box_questions' >
                                    <div className='tete_kely_questions'>
                                        <div className='qb_reponse_questions'>
                                        {question.voteTotal} votes | {question.answers == null ? '0' : question.answers } réponses 
                                        </div>
                                            {
                                                question.resolu &&(
                                                    <div className='qb_resolu_questions'>
                                                        <b style={{color:"rgb(0,127,0)"}}>Résolue</b>
                                                    </div>  
                                                )
                                            }
            
                                    </div> 
                                    <div className='qb_titre_questions'>
                                        <b>{question.questionTitle}</b>
                                    </div>
                                    <div className='qb_techno_questions'>
                                    {
                                                            question.technology.length != 0 && question.technology.map((tech,index)=>(
                                                                <div className='techno_style_questions'>{tech}</div>
                                                            ))
                                                        }
                                    </div>
                                    <div className='qb_nom_questions'>
                                        <div className='nom_res_questions'>
                                            <BsPerson size={15}/>
                                            {username.firstName}
                                        </div>
                                        <div className='nom_resolu_questions'>
                                            {question.createdAt}
                                        </div> 
                                    </div>
                                </div>
                                </Link>
                            
                        )
                    } 
                        
                  
                    )
                    
                    }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Question
