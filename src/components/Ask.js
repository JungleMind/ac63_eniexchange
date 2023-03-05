import React,{useState} from 'react'
import Nav from "./Nav";
import '../css/ask.css';
import ask from '../images/ask.png' 
import {BsEmojiWink } from "react-icons/bs";
import TextEditor from './TextEditor';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';


const Ask = () => {
    const [questionTitle,setQuestiontitle] = useState("");
    const [content,setContent] = useState("");
    const [technology,setTechnology] = useState("");
    const [userid,setUserid] = useState(localStorage.getItem('user'))
    const navigate = useNavigate();

    const questData = {
        questionTitle: questionTitle,
        content: content,
        technology: technology.split(" "),
        questionAuthorId: userid
      }
    const askQuestion = ()=>{
        axios.post("http://localhost:6969/api/question",questData).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 201) {
                console.log(response.data)
                navigate('/detailquestion/'+response.data._id);
            }
        });
    }
    const getContent = (content) => {
        console.log('data in the parent', content)
        setContent(content);
    }
    console.log('content leka', content)
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
                    <input 
                        type="texte" 
                        placeholder="Titre" 
                        id='titre_titre_ask' 
                        onChange={(e)=>{
                            setQuestiontitle(e.target.value)
                        }}
                    />
                </div>
                <div className='boite_ask'>
                    <div className='titre_ask'>
                        Détails du problème et objectifs
                    </div>
                    <div className='para_ask'>
                        Décrivez votre problème, ce que vous avez essayé, ce que vous espériez et ce qui en a résulté. 
                    </div>
                    <div className='textedit'>
                        <TextEditor getContent={getContent}/>
                    </div>
                    
                </div>
                <div className='boite_ask'>
                    <div className='titre_ask'>
                        Technologies
                    </div>
                    <div className='para_ask'>
                        Précisez les techno que vous avez utilisés. 
                    </div>
                    <input type="texte" placeholder="Technologie" id='titre_techno_ask' 
                    onChange={(e)=>{
                        setTechnology(e.target.value)
                    }}/>
                </div>
                <div className='boite_ask' id='boutonask'>
                    <div className='poster' onClick={()=>askQuestion()}>
                        Poster
                    </div>
                    <Link className='link' to="/question">
                        <div className='annulerpost'>
                            Annuler
                        </div>
                    </Link>
                   
                </div>


            </div>
        </div>
     
    </div>
  )
}

export default Ask
