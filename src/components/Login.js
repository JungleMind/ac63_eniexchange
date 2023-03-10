import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/login.css';
import illustration_login from '../images/illustration_login.png' 
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios'

const initialState = {
    mail:"",
    mdp:""
}

const Login = () =>{
    const [state,setState]= useState(initialState);
    const {mail,mdp} =state;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
    }

    const loginUser = ()=> {
        if(mail == "" || mdp==""){
            setError('Veuillez remplir les champs')
        }
        else{
          
                axios.post("http://localhost:6969/api/user/login",{email:mail,password:mdp}).then(function (response) {
                    setLoading(true);
                    if(response.status === 400) {
                        setError('Adresse email ou mot de passe incorrecte.')
                        setLoading(false);
                    } else if(response.status === 201) {
                        console.log(response.data)
                        localStorage.clear()
                        localStorage.setItem('user', response.data.user._id);
                        localStorage.setItem('accessToken', response.data.access_token);
                        localStorage.setItem('isSignedIn', true);
                        setLoading(false);
                        navigate('/accueil');
                        
                    }
                })
                .catch((error) => { // error is handled in catch block
                    if(error.response.status === 400) {
                            setError('Adresse email ou mot de passe incorrecte.')
                            setLoading(false);
                        }
                    else if(error.response.status === 404) {
                            setError('Adresse email introuvable.')
                            setLoading(false);
                        }
                  })
          
            
        }
       
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
                            <label>Adresse e-mail</label>
                            {error &&
                                <p 
                                    style={{
                                        fontSize: "10px",
                                        color: "#D32F2F",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {error}
                                </p>                                        
                            }
                            <input 
                                type="text" 
                                placeholder='Entrez votre email'
                                id="mail"
                                name="mail"
                                value={mail}
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
                        <div 
                            className='bouton_login'
                            onClick={loginUser}
                        >
                            {loading ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                :
                                <input type="button" value="Se connecter"/>
                            }
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