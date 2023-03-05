import React, { useState, setState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/register.css';
import illustration_login from '../images/illustration_login.png' 
import { BsArrowRight,BsArrowLeft,BsCheckLg } from "react-icons/bs";
import { createUserApi, verifyEmailApi } from '../services/UserServices';
import { registerUser, verifyEmail } from '../store/user/UserAction/registerUser';
import { Form, Spinner } from 'react-bootstrap';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    matricule: "",
    niveau: "L1",
    confirmationCode: ""
}


const Register = () => {
    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(false);
    const [state, setState] = useState(initialState);

    const [validatedFirstName, setValidatedFirstName] = useState(true);
    const [validatedLastName, setValidatedLastName] = useState(true);
    const [validatedEmail, setValidatedEmail] = useState(true);
    const [validatedMatricule, setValidatedMatricule] = useState(true);
    const [validatedPassword, setValidatedPassword] = useState(true);
    const [validatedCode, setValidatedCode] = useState(true);
    // const [validatedFirstName, setValidatedFirstName] = useState(true);

    const [loading, setLoading] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMail, setErrorMail] = useState(false);

    const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        matricule,
        niveau,
        confirmationCode
    } = state;

    // Redux states 
	const user = useSelector( (state) => state.user)
	// let loading = user.register.loading;
	// let error = user.register.error;
	// let success = user.register.success;

	const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]:value});
    };

    // FIXME: validEmail
    const validEmail = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        console.log(regex.test(email) === false)
        if(regex.test(email) === false){
            setErrorMail(true);
            return false;
        }
        return true;
    }

    const validateFirstForm = () => {
        setLoading(true);
        if(!firstName) {
            setValidatedFirstName(false);
            setLoading(false);
            return null;
        }
        if(!lastName) {
            setValidatedLastName(false);
            setLoading(false);
            return null;
        };
        
        setTimeout(() => {
            setLoading(false);
            setForm1(false);
            setForm2(true);  
            setForm3(false);       
        }, 500);
    }

    const validateSecondForm = () => {
        setLoading(true);
        validEmail();
        if(!email) {
            setValidatedEmail(false);
            setLoading(false);
            return null;
        }
        if(!matricule) {
            setValidatedMatricule(false);
            setLoading(false);
            return null;
        };
        if(!password || !passwordConfirmation) {
            setValidatedPassword(false);
            setLoading(false);
            return null;
        };
        if(password !== passwordConfirmation) {
            setValidatedPassword(false);
            setLoading(false);
            setErrorPassword(true);
            return null;
        };
        
        setTimeout(() => {
            createUser()
                .then(() => {
                    setLoading(false);
                    setForm1(false);
                    setForm2(false);
                    setForm3(true);      
                })
        }, 500);
    }
    
    const createUser = async() => {
		const userData = {
			firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            matricule: matricule,
            niveau: niveau,
		};
        
		await(createUserApi(dispatch(registerUser({ userData }))));
	};

    const verifyEmail = async() => {
        const userData = {
            email: email,
            code: confirmationCode
        }

		await(verifyEmailApi(dispatch(verifyEmail({ userData }))))
            .then(() => {
                Navigate.navigate("/accueil");
            });
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
                                        <label 
                                            style={{ 
                                                color: !validatedFirstName && '#D32F2F',
                                                fontWeight: !validatedFirstName && 'bold',
                                            }}
                                        >
                                            Nom
                                        </label>
                                        <input 
                                            type="text" 
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder='Entrez votre nom'
                                            style={{ 
                                                backgroundColor: !validatedFirstName && '#D32F2F'
                                            }}
                                        />
                                    </div>
                                    <div className='input_register'>
                                        <label
                                            style={{ 
                                                color: !validatedLastName && '#D32F2F',
                                                fontWeight: !validatedLastName && 'bold',
                                            }}
                                        >
                                            Prénom(s)
                                        </label>
                                        <input type="text" placeholder='Entrez votre prénom(s)' 
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleInputChange}
                                        required
                                        style={{ 
                                            backgroundColor: !validatedLastName && '#D32F2F'
                                        }}
                                        />
                                    </div>
                                    <div className='input_register'>
                                        <label>
                                            Niveau
                                        </label>
                                        <div 
                                            className='select_register'
                                        >
                                            <select
                                                name="niveau"
                                                value={niveau}
                                                onChange={handleInputChange}
                                            >
                                                <option value="L1">L1</option>
                                                <option value="L2">L2</option>
                                                <option value="L3">L3</option>
                                                <option value="M1">M1</option>
                                                <option value="M2">M2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div 
                                        className='bouton_suivant1' 
                                        onClick={validateFirstForm}
                                    >
                                        <div className='icon_register'>
                                        {loading ?
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            :
                                            <BsArrowRight  size={22}/>
                                        }
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
                                        <label 
                                            style={{ 
                                                color: !validatedEmail && '#D32F2F',
                                                fontWeight: !validatedEmail && 'bold',
                                            }}
                                        >
                                            Email
                                        </label>
                                        {errorMail &&
                                            <p 
                                            id="EmailHelpBlock" 
                                            muted
                                            style={{
                                                fontSize: "10px",
                                                color: "#D32F2F",
                                                fontWeight: "bold"
                                            }}
                                            >
                                                Veuillez entrer une adresse email valide
                                            </p>                                        
                                        }
                                        <input type="text" placeholder='Entrez votre email' 
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        required 
                                        style={{ 
                                            backgroundColor: !validatedEmail && '#D32F2F'
                                        }}
                                        />
                                    </div>
                                    <div className='input_register'>
                                        <label 
                                            style={{ 
                                                color: !validatedMatricule && '#D32F2F',
                                                fontWeight: !validatedMatricule && 'bold',
                                            }}
                                        >
                                            N° Matricule
                                        </label>
                                        <input 
                                        type="text" 
                                        placeholder='Entrez votre n° matricule'
                                        id="matricule"
                                        name="matricule"
                                        value={matricule}
                                        onChange={handleInputChange}
                                        required
                                        style={{ 
                                            backgroundColor: !validatedMatricule && '#D32F2F'
                                        }}
                                        />

                                    </div>
                                    <div className='input_register'>
                                        <label 
                                            style={{ 
                                                color: !validatedPassword && '#D32F2F',
                                                fontWeight: !validatedPassword && 'bold',
                                            }}
                                        >
                                            Mot de passe
                                        </label>
                                        {errorPassword &&
                                            <p 
                                            id="passwordHelpBlock" 
                                            muted
                                            style={{
                                                fontSize: "10px",
                                                color: "#D32F2F",
                                                fontWeight: "bold"
                                            }}
                                            >
                                                Vos mots de passes ne sont pas identiques
                                            </p>                                        
                                        }
                                        <input 
                                        type="password" 
                                        placeholder='Entrez votre mot de passe'
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        required
                                        style={{ 
                                            backgroundColor: !validatedPassword && '#D32F2F'
                                        }}
                                        />
                                    </div>
                                    <div className='input_register'>
                                        <label 
                                            style={{ 
                                                color: !validatedPassword && '#D32F2F',
                                                fontWeight: !validatedPassword && 'bold',
                                            }}
                                        >
                                            Confirmation du mot de passe
                                        </label>
                                        {errorPassword &&
                                            <p 
                                            id="passwordHelpBlock" 
                                            muted
                                            style={{
                                                fontSize: "10px",
                                                color: "#D32F2F",
                                                fontWeight: "bold"
                                            }}
                                            >
                                                Vos mots de passes ne sont pas identiques
                                            </p>                                        
                                        }
                                        <input 
                                        type="password" 
                                        placeholder='Confirmer votre mot de passe'
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        value={passwordConfirmation}
                                        onChange={handleInputChange}
                                        required
                                        style={{ 
                                            backgroundColor: !validatedPassword && '#D32F2F'
                                        }}
                                        />
                                    </div>
                                    <div className='bouton_suivant2' >
                                        <div 
                                            className='icon_register' 
                                            onClick={()=>{
                                                setForm1(true)
                                                setForm2(false)
                                                setForm3(false)
                                            }}
                                        >
                                            <BsArrowLeft  size={22}/>
                                        </div>
                                        <div 
                                            className='icon_register' 
                                            onClick={validateSecondForm}
                                        >
                                            {loading ?
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                                :
                                                <div className='icon_register'>
                                                    <BsArrowRight  size={22}/>
                                                </div>
                                            }
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
                                        <input 
                                            type="text" 
                                            placeholder='Entrez le code' 
                                            name="confirmationCode"
                                            value={confirmationCode}
                                            onChange={handleInputChange}    
                                        />
                                    </div>

                                    <div className='bouton_register'>
                                        <input 
                                            type="button" 
                                            value="Vérifier"
                                            onClick={verifyEmail}
                                        />
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