import React, {useState,useEffect} from 'react'
import Nav from "./Nav";
import '../css/detailquestion.css';
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline } from "react-icons/md";
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import TextEditor from './TextEditor';

import { Link,useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import HtmlContent from './HtmlContent';

const Detailquestion = () => {    
    const params = useParams();
    const {id} = params; 
    const [detail,setDetail]= useState([]) 
    const navigate = useNavigate();
    const [userid,setUserid] = useState(localStorage.getItem('user'))
    const [vplus,setVp] = useState(0)
    const [vmoins,setVm] = useState(0)
    const [content,setContent] = useState("");
    
    const loadDataDetails = async()=>{
        const response = await axios.get("http://localhost:6969/api/question/"+id);
        setDetail(response.data)
        if(response.data.votePlus == null){
            setVp(0)
        }
        else{
            setVp(response.data.votePlus.length)
        }

        if(response.data.voteMoins == null){
            setVm(0)
        }
        else{
            setVm(response.data.voteMoins.length)
        }
        
        
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
                if(response.data.votePlus == null){
                    setVp(0)
                }
                else{
                    setVp(response.data.votePlus.length)
                }
        
                if(response.data.voteMoins == null){
                    setVm(0)
                }
                else{
                    setVm(response.data.voteMoins.length)
                }

            }
        });
    }

    const voteplus = () =>{
        axios.put("http://localhost:6969/api/question/votePlus",{
            userId:userid,
            questionId:id
        }).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 200) {
                console.log(response.data)
                axios.get("http://localhost:6969/api/question/"+id).then(function (response) {
                    if(response.status === 400) {
                        console.log(response.error)
                    } else if(response.status === 200) {
                        console.log(response.data)
                        if(response.data.votePlus == null){
                            setVp(0)
                        }
                        else{
                            setVp(response.data.votePlus.length)
                        }
                
                        if(response.data.voteMoins == null){
                            setVm(0)
                        }
                        else{
                            setVm(response.data.voteMoins.length)
                        }
                    }
            });
                
            }
        });
    }

    const votemoins = () =>{
        axios.put("http://localhost:6969/api/question/voteMoins",{
            userId:userid,
            questionId:id
        }).then(function (response) {
            if(response.status === 400) {
                console.log(response.error)
            } else if(response.status === 200) {
                console.log(response.data)
                axios.get("http://localhost:6969/api/question/"+id).then(function (response) {
                    if(response.status === 400) {
                        console.log(response.error)
                    } else if(response.status === 200) {
                        console.log(response.data)                
                        if(response.data.votePlus == null){
                            setVp(0)
                        }
                        else{
                            setVp(response.data.votePlus.length)
                        }
                
                        if(response.data.voteMoins == null){
                            setVm(0)
                        }
                        else{
                            setVm(response.data.voteMoins.length)
                        }
                    }
            });
                
            }
        });
    }

    const getContent = (content) => {
        console.log('data in the parent', content)
        setContent(content);
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
                        <div className='box_detail'>      
                                    <div className='details_details_detail' onClick={()=>{voteplus()}}>
                                       <div style={{fontSize:'20px',marginRight:'5px'}}><b>{vplus}</b></div>
                                       <div className='soratra_details_detail'><AiOutlineLike className='icon_items_acc' size={25}/></div>
                                    </div>

                                    <div className='details_details_detail' onClick={()=>{votemoins()}}>
                                       <div style={{fontSize:'20px',marginRight:'5px'}}><b>{vmoins}</b></div>
                                       <div className='soratra_details_detail'><AiOutlineDislike className='icon_items_acc' size={25}/></div>
                                    </div>
                            </div>
                        <div>
                            
                        </div>
                    </div>
                    <div className='content_detail'>
                        <HtmlContent content= {detail.content}/>
                    </div>
                    
                </div>
                <div className='textedit_detail'>
                    <div><b>Votre réponse</b></div>
                    <TextEditor getContent={getContent}/>
                    <div className='boite_ask_detail' id='boutonask_detail'>
                        <div className='poster_detail'>
                            Répondre
                        </div>
                        <div className='annulerpost_detail'>
                            Annuler
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Detailquestion
