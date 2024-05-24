import React,{useEffect, useState} from "react";
import { Link, useLocation } from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoLight from "../assets/images/logo-light.png"
import client from "../assets/images/team/01.jpg"
import { LuSearch,FiUser,FiSettings,FiLock,FiLogOut } from "../assets/icons/vander";
 import { useNavigate } from "react-router-dom";
export default function NavbarDark(){
    
    const navigate=useNavigate();
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');

    if (userToken === null || userToken === "undefined" || userData === null || userData === "undefined") {
        navigate("/login");
    }
    

    const handleLogout = () => {
        if (window.confirm("Вы уверены, что хотите выйти?")) {
            localStorage.removeItem('userData');
            localStorage.removeItem('userToken');  
            navigate('/login');
        }
    };

    let [isOpen, setMenu] = useState(true);
    let [scroll, setScroll] = useState(false);
    let [search, setSearch] = useState(false);
    let [cartitem, setCartitem] = useState(false);

    let [manu , setManu] = useState('');
    let location = useLocation();
    useEffect(()=>{
        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)
    },[location.pathname.substring(location.pathname.lastIndexOf('/') + 1)])

    useEffect(() => {
        function scrollHandler() {
            setScroll(window.scrollY > 50)
          }
        window.addEventListener('scroll', scrollHandler);

        let searchModal = () => {setSearch(false)}
        document.addEventListener('mousedown',searchModal);

        let cartModal = () => {setCartitem(false)}
        document.addEventListener('mousedown',cartModal);

        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('mousedown',searchModal);
            document.removeEventListener('mousedown',cartModal);
        };

    }, []);
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
    <header id="topnav" className={ `${scroll ? 'nav-sticky' :''} defaultscroll sticky`}>
        <div className="container">
                <Link className="logo" to="/">
                    <img src={logoDark} className="logo-light-mode" alt=""/>
                    <img src={logoLight} className="logo-dark-mode" alt=""/>
                </Link>
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
                    <div className="dropdown">
                        <button type="button" onClick={() => setSearch(!search)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                            <LuSearch className="icons"/>
                        </button>
                        <div style={{display: search === true ? 'block' : 'none'}}>
                            <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`} style={{width:'240px', position:'absolute',right:'0'}}>
                                <div className="search-bar">
                                    <div id="itemSearch" className="menu-search mb-0">
                                        <form role="search" method="get" id="searchItemform" className="searchform">
                                            <input type="text" className="form-control rounded border" name="s" id="searchItem" placeholder="Search..."/>
                                            <input type="submit" id="searchItemsubmit" value="Search"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li className="list-inline-item ps-1 mb-0">
                    <div className="dropdown dropdown-primary">
                        <button type="button" onClick={()=>setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                            <img src={client} className="img-fluid rounded-pill" alt=""/>
                        </button>
                        <div style={{display: cartitem === true ? 'block' : 'none'}}>
                            <div className={` dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}>
                                <Link to="candidate-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                                <Link to="candidate-profile-setting" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle"/>Settings</Link>
                                <div className="dropdown-divider border-top"></div>
                                <Link to="lock-screen" className="dropdown-item fw-medium fs-6"><FiLock className="fea icon-sm me-2 align-middle"/>Lockscreen</Link>
                                <Link to="login" className="dropdown-item fw-medium fs-6"><FiLogOut className="fea icon-sm me-2 align-middle"/>Logout</Link>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
    
            <div id="navigation">  
                <ul className="navigation-menu nav-right">
                    <li className={`${["", "index","index-two", "index-three"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                        <Link to="/home">Home</Link><span className="menu-arrow"></span>
                       
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
            
                    <li className={`${["employers", "employer-profile"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
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