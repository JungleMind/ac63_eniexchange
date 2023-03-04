import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/register.css';
import illustration_login from '../images/illustration_login.png' 
import { BsArrowRight,BsArrowLeft,BsCheckLg } from "react-icons/bs";


import { Link } from 'react-router-dom';

const initialState = {
    nom:"",
    prenom:"",
    niveau:"",
    email:"",
    mdp:"",
    matricule:""
}

const Register = () =>{
    const [form1,setForm1] =useState(true);
    const [form2,setForm2] =useState(false);
    const [form3,setForm3] =useState(false);
    const [state,setState] = useState(initialState);
    const {nom,prenom,niveau,email,mdp,matricule} = state



    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
     }
    
    return(
        <div className='container_register'>
            <div className='content_register'>
                <div className='content_left_register'>
                    <div className='titre_register'>
                        <p><b id='texte_eni_register'>Eni</b>Exchange<b>.</b></p>
                    </div>
                    <div className='para_register'>
                        <p>Collaborons et trouvons une solution <b>ensemble.</b></p>
                    </div>
                    <div className='illustration_login'>
                        <img src={illustration_login} alt="Collaboration en ligne"/>
                    </div>
                </div>
                <div className='content_right_register'>
                    
                    <form className='form_register'>
                        {
                            form1 && (
                                
                                <div className='form_1_registrer'>
                                    <div className='bienvenu_register'>
                                        <p id='bienvenu'><b>Bienvenu sur Eni Exchange</b></p>
                                    </div>
                                    <div className='input_register'>
                                        <label>Nom</label>
                                        <input 
                                        type="text" 
                                        id="nom"
                                        name="nom"
                                        value={nom}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='Entrez votre nom' />
                                    </div>
                                    <div className='input_register'>
                                        <label>Prénom(s)</label>
                                        <input type="text" placeholder='Entrez votre prénom(s)' 
                                        id="prenom"
                                        name="prenom"
                                        value={prenom}
                                        onChange={handleInputChange}
                                        required/>
                                    </div>
                                    <div className='input_register'>
                                        <label>Niveau</label>
                                        <div className='select_register'>
                                            <select>
                                                <option value="L1">L1</option>
                                                <option value="L2">L2</option>
                                                <option value="L3">L3</option>
                                                <option value="M1">M1</option>
                                                <option value="M2">M2</option>
                                            </select>
                                        </div>
                                        
                                    </div>
                                    <div className='bouton_suivant1' onClick={()=>{
                                      setForm1(false)
                                      setForm2(true)
                                      setForm3(false)
                                    }}>
                                        <div className='icon_register'>
                                            <BsArrowRight  size={22}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            form2 && (
                                <div className='form_2_registrer'>
                                    <div className='bienvenu_register'>
                                        <p id='bienvenu'><b>Bienvenu sur Eni Exchange</b></p>
                                    </div>
                                    <div className='input_register'>
                                        <label>Email</label>
                                        <input type="text" placeholder='Entrez votre email' 
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        required />
                                    </div>
                                    <div className='input_register'>
                                        <label>N° Matricule</label>
                                        <input 
                                        type="text" 
                                        placeholder='Entrez votre n° matricule'
                                        id="matricule"
                                        name="matricule"
                                        value={matricule}
                                        onChange={handleInputChange}
                                        required/>

                                    </div>
                                    <div className='input_register'>
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
                                    <div className='bouton_suivant2' >
                                        <div className='icon_register' onClick={()=>{
                                        setForm1(true)
                                        setForm2(false)
                                        setForm3(false)
                                    }}>
                                            <BsArrowLeft  size={22}/>
                                        </div>
                                        <div className='icon_register' onClick={()=>{
                                        setForm1(false)
                                        setForm2(false)
                                        setForm3(true)
                                    }}>
                                            <BsArrowRight  size={22}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                         {
                            form3 && (
                                <div className='form_3_registrer'>
                                    {/* <div className='icon_register_check' >
                                            <BsCheckLg color="green"  size={25}/>
                                        </div>
                                    <p>Vous y êtes presque!</p>
                                    <p>Un code de vérification a été envoyé à <b>Votre email</b>, veuillez entrer ce code.</p> */}
                                    <div className='bienvenu_register'>
                                        <p id='bienvenu'><b>Vérification</b></p>
                                    </div>
                                    <div className='bienvenu_register_code'>
                                        <p>Veuillez entrer le code de vérification envoyé à <b>{email}</b>. </p>
                                    </div>
                                    
                                    <div className='input_register'>
                                        <input type="text" placeholder='Entrez le code' />
                                    </div>

                                    <div className='bouton_register'>
                                        <input type="button" value="Vérifier"/>
                                    </div>
                                </div>
                            )
                        }
                        
                        <div className='signup_register'>
                            <p>Vous avez déjà un compte ? </p>
                            <Link id="link" to="/login">
                            <p id='creer_compte_register'>Connectez-vous</p>
                            </Link>
                        </div> 
                    </form>
                </div>
            </div>
           
        </div>
    )
}

export default Register; 