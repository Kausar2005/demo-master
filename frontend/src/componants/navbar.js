import React,{useEffect, useState} from "react";
import { Link, useLocation } from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoWhite from "../assets/images/logo-white.png"
import logoLight from "../assets/images/logo-light.png"
import client from "../assets/images/team/01.jpg"
import { LuSearch,FiUser,FiSettings,FiLock,FiLogOut, FaSearch  } from "../assets/icons/vander";
import { NotificationContainer , NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
export default function Navbar({navClass, navLight}){
    const handleLogout = () => {
        if (window.confirm("Вы уверены, что хотите выйти?")) {
            localStorage.removeItem('userData');
            localStorage.removeItem('userToken');  
            navigate('/login');
        }
    };
    let [isOpen, setMenu] = useState(true);
    let [scroll, setScroll] = useState(false);
    let [cartitem, setCartitem] = useState(false);

    let [manu , setManu] = useState('');
    let location = useLocation();
     const navigate=useNavigate();
    useEffect(()=>{
        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)
    },[location.pathname.substring(location.pathname.lastIndexOf('/') + 1)])
    const [notificationShown, setNotificationShown] = useState(false);
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');

    if (userToken === null || userToken === "undefined" || userData === null || userData === "undefined") {
        navigate("/login");
    }
    
    useEffect(() => { 
        const notificationWasShown = localStorage.getItem('notificationShownLog'); 
        if (notificationWasShown === 'true') {
            return;
        }
        if (location.state) {
            NotificationManager.success(location.state.message, "Success registered");
            setNotificationShown(true); 
            localStorage.setItem('notificationShownLog', 'true');
        }
    }, [location.state]);
   
    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }
    return(
    <header id="topnav" className={ `${scroll ? 'nav-sticky' :''} ${navClass}`}>
        <NotificationContainer/>
        <div className="container">
            {navLight === true ? 
                <Link className="logo" to="/">
                    <span className="logo-light-mode">
                        <img src={logoDark} className="l-dark" alt=""/>
                        <img src={logoLight} className="l-light" alt=""/>
                    </span>
                    <img src={logoLight} className="logo-dark-mode" alt=""/>
                </Link> : 
                <Link className="logo" to="/">
                    <span className="logo-light-mode">
                        <img src={logoDark} className="l-dark" alt=""/>
                        <img src={logoWhite} className="l-light" alt=""/>
                    </span>
                    <img src={logoWhite} className="logo-dark-mode" alt=""/>
                </Link>
            }
            <div className="menu-extras">
                <div className="menu-item">
                    <Link to='#' className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </div>
            </div>

            <ul className="buy-button list-inline mb-0">
                

                <li className="list-inline-item ps-1 mb-0">
                    <div className="dropdown dropdown-primary">
                        <button type="button" onClick={()=>setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                            <img src={client} className="img-fluid rounded-pill" alt=""/>
                        </button>
                        <div style={{display: cartitem === true ? 'block' : 'none'}}>
                            <div className={` dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}>
                                <Link to="/candidate-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                                <Link to="/candidate-profile-setting" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle"/>Settings</Link>
                                <div className="/dropdown-divider border-top"></div>
                                <Link to="/lock-screen" className="dropdown-item fw-medium fs-6"><FiLock className="fea icon-sm me-2 align-middle"/>Lockscreen</Link>
                                <Link to="/login" className="dropdown-item fw-medium fs-6"><FiLogOut className="fea icon-sm me-2 align-middle"/>Logout</Link>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
    
            <div id="navigation">  
                <ul className="navigation-menu nav-right nav-light">
                    <li className={`${["", "index","index-two", "index-three"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                <Link to="/home" className="sub-menu-item">Home</Link>
                    </li>

                    <li className={`${["job-categories", "job-grid-one","job-grid-two", "job-grid-three","job-grid-four","job-list-one", "job-list-two","job-detail-one", "job-detail-two","job-detail-three","job-apply","job-post","career" ].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Jobs </Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li className={manu === "job-categories"  ? "active" : ""}><Link to="/job-categories" className="sub-menu-item">Job Categories</Link></li>
                    
                            
                            <li className={`${["job-detail-one", "job-detail-two","job-detail-three"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                        <Link to="/job-detail-two" className="sub-menu-item">Job Detail </Link>
                            </li>
                            <li className={manu === "job-post"  ? "active" : ""}><Link to="/job-post" className="sub-menu-item">Job Post </Link></li>
                        </ul>  
                    </li>
            
                    <li className={`has-submenu parent-menu-item`}>
                                <Link to="/employer-profile" className="sub-menu-item">Employer Profile</Link>
                    </li>
            
                    <li className={`${["candidates", "candidate-profile","candidate-profile-setting"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                       
                                <Link to="/candidates" className="sub-menu-item">Candidates</Link>
                    </li>
                    <li className={`mt-3 has-submenu parent-menu-item`}>
                        <button className=" btn  border-0 text-white" onClick={handleLogout}>Logout</button>
                    </li>

                    <li className={`${["login", "signup","reset-password","lock-screen"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                        <ul className="submenu">
                            <li className={manu === "login"  ? "active" : ""}><Link to="/login" className="sub-menu-item"> Login</Link></li>
                            <li className={manu === "signup"  ? "active" : ""}><Link to="/signup" className="sub-menu-item"> Signup</Link></li>
                            <li className={manu === "reset-password"  ? "active" : ""}><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                            <li className={manu === "lock-screen"  ? "active" : ""}><Link to="/lock-screen" className="sub-menu-item"> Lock Screen</Link></li>
                        </ul> 
                    </li>
                </ul>
            </div>
        </div>
    </header>
    )
}