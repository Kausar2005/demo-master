import React from "react";
import { Link } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import bg1 from '../assets/images/hero/bg3.jpg'
import logo from '../assets/images/logo-dark.png'
import { NotificationManager,NotificationContainer } from "react-notifications";
import { useLoaderData ,useLocation} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../data/api";
export default function Login(){



    const location = useLocation();
    const [notificationShown, setNotificationShown] = useState(false);

    

    useEffect(() => { 
        const notificationWasShown = localStorage.getItem('notificationShownAuth'); 
        if (notificationWasShown === 'true') {
            return;
        }
        if (location.state) {
            NotificationManager.success(location.state.message, "Success registered");
            setNotificationShown(true); 
            localStorage.setItem('notificationShownAuth', 'true');
        }
    }, [location.state]);




    const [registerElements, setRegisterElements] = useState({ email: '', password: ''});
    const [dirty, setDirty] = useState({ gmailDirty: false, passwordDirty: false});
    const [errors, setErrors] = useState({ gmailError: 'gmail is empty', passwordError: 'Password is empty'
    });
    const [formValid, setFormValid] = useState(false);
    
    const navigate=useNavigate();
    
    const handlegmail = (ev) => {
        setRegisterElements({ ...registerElements, email: ev.target.value });
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(String(ev.target.value).toLocaleLowerCase())) {
            setErrors({ ...errors, gmailError: 'Invalid gmail format' });
        } else {
            setErrors({ ...errors, gmailError: '' });
        }
    };

    const handlePassword = (ev) => {
        const password = ev.target.value;
        setRegisterElements({ ...registerElements, password: password });

        if (password.length < 8) {
            setErrors({ ...errors, passwordError: "Password should be at least 8 characters long" });
        } else {
            setErrors({ ...errors, passwordError: "" });
        }
    };


    const blurHandle = (ev) => {
        switch (ev.target.name) {
            case 'gmail':
                setDirty({ ...dirty, gmailDirty: true });
                break;
            case 'password':
                setDirty({ ...dirty, passwordDirty: true });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const isgmailValid = !errors.gmailError && registerElements.email.trim() !== '';
        const isPasswordValid = !errors.passwordError && registerElements.password.trim() !== '';
        setFormValid(isgmailValid && isPasswordValid );

    }, [errors, registerElements]);




    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await loginUser(registerElements);
        console.log(response);
        
        if (response) {

            localStorage.setItem('userToken', response.data.refreshToken);
            localStorage.setItem('userData',JSON.stringify(response.data.user)); 
            console.log(localStorage);
            if(localStorage.getItem('userData')&&localStorage.getItem('userToken')){
                navigate("/home",{state:{message:registerElements.email}});
                
            }
          }
        else{
            setRegisterElements({ ...registerElements, gmail: ""});
            NotificationManager.error("Error", "Erroor Password or Email");
        }
    };

    return(
        
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleSubmit}>
                            <NotificationContainer/>
                            <img src={logo} className="mb-4 d-block mx-auto" alt=""/>
                                <h6 className="mb-3 text-uppercase fw-semibold">Please sign in</h6>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Email</label>
                                    <input name="gmail" onBlur={ev=> blurHandle(ev)} id="email" value={registerElements.email} onChange={handlegmail}   type="email" className="form-control" placeholder="example@narxoz.kz"/>
                                    {dirty.gmailDirty && errors.gmailError && <div style={{ color: 'red' }}>{errors.gmailError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <input type="password" name="password" value={registerElements.password} onChange={handlePassword} onBlur={ev=> blurHandle(ev)} className="form-control" id="loginpass" placeholder="Password"/>
                                    {dirty.passwordDirty && errors.passwordError && <div style={{ color: 'red' }}>{errors.passwordError}</div>}
                                </div>
                            
                                <div className="d-flex justify-content-between">
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                            <label className="form-label form-check-label text-muted" htmlFor="flexCheckDefault">Remember me</label>
                                        </div>
                                    </div>
                                </div>
                
                                <button type="submit" disabled={!formValid}  className="btn btn-primary w-100"  >Sign in</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2 small">Don't have an account ?</span> <Link to="/signup" className="text-dark fw-semibold small">Sign Up</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}