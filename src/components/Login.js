import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/login.css';
import illustration_login from '../images/illustration_login.png' 
import { Link } from 'react-router-dom';

const initialState = {
    matricule:"",
    mdp:""
}

const Login = () =>{
    const [state,setState]= useState(initialState);
    const {matricule,mdp} =state;

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
     }
    
    return(
        <div className='container_login'>
            <div className='content_login'>
                <div className='content_left_login'>
                    <div className='titre_login'>
                        <p><b id='texte_eni_login'>Eni</b>Exchange<b>.</b></p>
                    </div>
                    <div className='para_login'>
                        <p>Collaborons et trouvons une solution <b>ensemble.</b></p>
                    </div>
                    <div className='illustration_login'>
                        <img src={illustration_login} alt="Collaboration en ligne"/>
                    </div>
                </div>
                <div className='content_right_login'>
                    <div className='bienvenu_login'>
                        <p id='bienvenu'><b>Heureux de vous revoir</b></p>
                    </div>
                    <form className='form_login'>
                        <div className='input_login'>
                            <label>N° Matricule</label>
                            <input 
                                type="text" 
                                placeholder='Entrez votre n° matricule'
                                id="matricule"
                                name="matricule"
                                value={matricule}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className='input_login'>
                            <label>Mot de passe</label>
                            <input 
                                type="password" 
                                placeholder='Entrez votre mot de passe'
                                id="mdp"
                                name="mdp"
                                value={mdp}
                                onChange={handleInputChange}
                                required/>
                        </div>
                        <div className='bouton_login'>
                            <Link id="link" to="/accueil">
                                <input type="button" value="Se connecter"/>
                            </Link>
                           
                        </div>
                        <div className='signup_login'>
                            <p>Vous êtes un nouvel utilisateur ? </p>
                            
                            <Link id="link" to="/register">
                            <p id='creer_compte_login'>Créer un compte</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
           
        </div>
    )
}

export default Login; 