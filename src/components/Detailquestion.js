import React from 'react'
import Nav from "./Nav";
import '../css/detailquestion.css';
import { MdOutlineSummarize,MdQuestionMark,MdOutlineQuestionAnswer,MdStarOutline,MdInfoOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios'

const Detailquestion = () => {
  return (
    <div>
        <Nav />
        <div>
            <div className='entete_detail'>
                    <div className='toutes_les_detail'>
                        <div>
                            Why did Bootstrap5 Carousel action is not working
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
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Detailquestion
