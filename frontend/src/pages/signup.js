import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import bg1 from '../assets/images/hero/bg3.jpg'
import logo from '../assets/images/logo-dark.png'
import { registerUser } from "../data/api";
import { useNavigate } from "react-router-dom";

import { NotificationManager,NotificationContainer } from "react-notifications";
export default function Signup(){
    const [registerElements, setRegisterElements] = useState({ gmail: '', password: '', confirmPassword: '', birthdate: '', firstName: '', lastName: '', role: 'user' ,birthdate:''});
    const [dirty, setDirty] = useState({ gmailDirty: false, passwordDirty: false, confirmPasswordDirty: false,firstName:false , lastName:false });
    const [errors, setErrors] = useState({ gmailError: 'gmail is empty', passwordError: 'Password is empty', confirmPasswordError: 'Confirm password is Empty' 
        ,firstNameError: 'first name is empty', lastNameError: 'first name is empty'
    });
    const [formValid, setFormValid] = useState(false);
    const handleFirstName = (ev) => {
        setRegisterElements({ ...registerElements, firstName: ev.target.value });
       
        const nameRegex = /^[A-Za-z]+$/;  

        if (!nameRegex.test(ev.target.value)|| ev.target.value.length<2) {
            setErrors({ ...errors, firstNameError: 'Invalid first name format' });
        } else { 
            setErrors({...errors, firstNameError:''});
        }
    }; 
    const navigate=useNavigate();
    const handleLastName = (ev) => {
        setRegisterElements({ ...registerElements, lastName: ev.target.value });
       
        const nameRegex = /^[A-Za-z]+$/;  

        if (!nameRegex.test(ev.target.value)|| ev.target.value.length<2) {
            setErrors({ ...errors, lastNameNameError: 'Invalid first name format' });
        } else { 
            setErrors({...errors, lastNameError:''});
        }
    };
    const handlegmail = (ev) => {
        setRegisterElements({ ...registerElements, gmail: ev.target.value });
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

    const handleConfirmPassword = (ev) => {
        const confirmPassword = ev.target.value;
        setRegisterElements({ ...registerElements, confirmPassword: confirmPassword });

        if (confirmPassword !== registerElements.password) {
            setErrors({ ...errors, confirmPasswordError: "Passwords do not match" });
        } else {
            setErrors({ ...errors, confirmPasswordError: "" });
            
        }
    };

    const handleBirthdate = (ev) => {
        setRegisterElements({ ...registerElements, birthdate: ev.target.value });
    };

    const handleRole = (ev) => {
        
        setRegisterElements({ ...registerElements, role: ev.target.value });
    };

    const blurHandle = (ev) => {
        switch (ev.target.name) {
            case 'gmail':
                setDirty({ ...dirty, gmailDirty: true });
                break;
            case 'password':
                setDirty({ ...dirty, passwordDirty: true });
                break;
            case 'confirmPassword':
                setDirty({ ...dirty, confirmPasswordDirty: true });
                break;
            case 'firstname':
                setDirty({ ...dirty, firstName: true });
                break;
            case 'lastname':
                setDirty({ ...dirty, lastName: true });
                break;        
            default:
                break;
        }
    };

    useEffect(() => {
        const isgmailValid = !errors.gmailError && registerElements.gmail.trim() !== '';
        const isPasswordValid = !errors.passwordError && registerElements.password.trim() !== '';
        const isConfirmPasswordValid = registerElements.confirmPassword === registerElements.password;

        setFormValid(isgmailValid && isPasswordValid && isConfirmPasswordValid);
    }, [errors, registerElements]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await registerUser(registerElements);
        if(user.accessToken){
             navigate("/login",{state:{message:registerElements.gmail}});
        }
        else{
            setRegisterElements({ ...registerElements, gmail: ""});
            NotificationManager.error("Error", "This Email Not Free");
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
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h6 className="mb-3 text-uppercase fw-semibold">Register your account</h6>
                                <NotificationContainer/>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">First Name</label>
                                    <input name="firstname" onBlur={ev=> blurHandle(ev)} id="name" type="text" value={registerElements.firstName} onChange={handleFirstName} className="form-control" placeholder="Azamat "/>
                                    {dirty.firstName && errors.firstNameError && <div style={{ color: 'red' }}>{errors.firstNameError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Last Name</label>
                                    <input name="lastname" onBlur={ev=> blurHandle(ev)} id="lastname" type="text" value={registerElements.lastName} onChange={handleLastName} className="form-control" placeholder="Tolegenov"/>
                                    {dirty.lastName && errors.lastNameError && <div style={{ color: 'red' }}>{errors.lastNameError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Email</label>
                                    <input name="gmail" onBlur={ev=> blurHandle(ev)} id="email" value={registerElements.gmail} onChange={handlegmail}   type="email" className="form-control" placeholder="example@narxoz.kz"/>
                                    {dirty.gmailDirty && errors.gmailError && <div style={{ color: 'red' }}>{errors.gmailError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="role">Role:</label>
                                    <select name="role" className="form-control" id="role" value={registerElements.role} onChange={handleRole}>
                                        <option value="user">User</option>
                                        <option value="company">Company</option>
                                        
                                    </select>
                                </div>

                                <div className="mb-3 ">
                                    <label className="form-label fw-semibold"  >Birth Date:</label>
                                    <input  type="date" name="birthdate" className="form-label fw-semibold"  value={registerElements.birthdate}
                                     min="1965-01-01" max="2014-12-31"
                                        onBlur={blurHandle} onChange={handleBirthdate} />
                                        
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <input type="password" name="password" value={registerElements.password} onChange={handlePassword} onBlur={ev=> blurHandle(ev)} className="form-control" id="loginpass" placeholder="Password"/>
                                    {dirty.passwordDirty && errors.passwordError && <div style={{ color: 'red' }}>{errors.passwordError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={registerElements.confirmPassword} onChange={handleConfirmPassword} onBlur={ev=> blurHandle(ev)}  className="form-control" id="confirmloginpass" placeholder="Password"/>
                                    {dirty.confirmPasswordDirty && errors.confirmPasswordError && <div style={{ color: 'red' }}>{errors.confirmPasswordError}</div>}
                                </div>

                                <div className="form-check mb-3">
                                    <input  className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-label form-check-label text-muted" htmlFor="flexCheckDefault">Barca is the best football club in history</label>
                                </div>
                
                                <button type="submit" disabled={!formValid}  className="btn btn-primary w-100"  >Register</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted small me-2">Already have an account ? </span> <Link to="/login" className="text-dark fw-semibold small">Sign in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}