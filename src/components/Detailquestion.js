import React, {useState,useEffect} from 'react'
import Nav from "./Nav";
import '../css/detailquestion.css';
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline } from "react-icons/md";
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";

import { Link,useParams } from 'react-router-dom';
import axios from 'axios'
import HtmlContent from './HtmlContent';

const Detailquestion = () => {    
    const params = useParams();
    const {id} = params; 
    const [detail,setDetail]= useState([]) 
    
    const loadDataDetails = async()=>{
        const response = await axios.get("http://localhost:6969/api/question/"+id);
        setDetail(response.data)
     }

    useEffect(() => {
        getQuestionDetailsById()
        loadDataDetails()
     }, []);
    
    const getQuestionDetailsById= ()=>{
        axios.get("http://localhost:6969/api/question/"+id).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 200) {
                console.log(response.data)
                setDetail(response.data)
            }
        });
    }
  return (
    <div>
        <Nav />
        <div>
            <div className='entete_detail'>
                    <div className='toutes_les_detail'>
                        <div>
                            {detail.questionTitle}                       
                        </div>
                        
                    </div>
                    <Link className='link' to="/demander">
                        <div className='poser_detail'>
                            Poser une question
                        </div>
                    </Link>
            </div>
            <div className='container_detail'>
                <div className='container_left_detail'>
                    <div className='score_rep_detail'>
                        
                        <MdOutlineQuestionAnswer className='icon_items_acc' size={30}/>
                        
                    </div>
                    <div className='detail_score_rep_detail'>
                        Aider les autres à résoudre les problèmes pour augmenter votre score.
                        Discuter entre vous et respectez les autres.
                        {/* <BsEmojiSunglasses size={17} id="emoji_solomaso"/>     */}
                    </div>
                </div>
                <div className='container_right_detail'>
                    <div className='vote_detail'>
                        <div>
                            <AiOutlineLike className='icon_items_acc' size={30}/>
                        </div>
                        <div>
                            0
                        </div>
                        <div>
                            <AiOutlineDislike className='icon_items_acc' size={30}/>
                        </div>
                    </div>
                    <div className='content_detail'>
                        <HtmlContent content= {detail.content}/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Detailquestion
