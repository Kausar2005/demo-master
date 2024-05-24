import React,{useEffect, useState} from "react";
import { Link, useLocation ,useNavigate} from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoLight from "../assets/images/logo-light.png"

export default function NavbarDark(){
    
    const handleLogout = () => {
        if (window.confirm("Вы уверены, что хотите выйти?")) {
            localStorage.removeItem('userData');
            localStorage.removeItem('userToken');  
            navigate('/login');
        }
    };


    const navigate=useNavigate();

    let [scroll, setScroll] = useState(false);
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


        let cartModal = () => {setCartitem(false)}
        document.addEventListener('mousedown',cartModal);

        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('mousedown',cartModal);
        };

    }, []);



    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');

    if (userToken === null || userToken === "undefined" || userData === null || userData === "undefined") {
        navigate("/login");
    }
    return(
    <header id="topnav" className={ `${scroll ? 'nav-sticky' :''} defaultscroll sticky`}>
        <div className="container">
                <Link className="logo" to="/">
                    <img src={logoDark} className="logo-light-mode" alt=""/>
                    <img src={logoLight} className="logo-dark-mode" alt=""/>
                </Link>
           
            
    
            <div id="navigation">  
                <ul className="navigation-menu nav-right">
                    <li className={`${["", "index","index-two", "index-three"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                    <Link to="/home" className="sub-menu-item">Hero Two</Link>
                            
                    </li>

                    <li className={`${["job-categories", "job-grid-one","job-grid-two", "job-grid-three","job-grid-four","job-list-one", "job-list-two","job-detail-one", "job-detail-two","job-detail-three","job-apply","job-post","career" ].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Jobs </Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li className={manu === "job-categories"  ? "active" : ""}><Link to="/job-categories-user" className="sub-menu-item">Job Categories</Link></li>
                    
                           
                            <li className={`${["job-list-one", "job-list-two"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                <Link to="/job-list-one" className="sub-menu-item"> Job Lists </Link>
                            </li>

                            <li className={`${["job-detail-one", "job-detail-two","job-detail-three"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link to="/job-detail-three" className="sub-menu-item"> Job Detail </Link>
                                 
                            </li>
                        </ul>  
                    </li>
            
                    <li className={`${["employers", "employer-profile"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                        <Link to="#">Employers</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li className={manu === "employers"  ? "active" : ""}><Link to="/employers" className="sub-menu-item">Employers</Link></li>
                        </ul>
                    </li>
            
                    <li className={`mt-3 has-submenu parent-menu-item`}>
                        <button className=" btn  border-0 text-white" onClick={handleLogout}>Logout</button>
                    </li>
            
                    <li className={`${["aboutus", "services","pricing","helpcenter-overview", "helpcenter-faqs","helpcenter-guides",'helpcenter-support'].includes(manu)? "active" : ""} has-submenu parent-menu-item,"blogs", "blog-sidebar","blog-detail","login", "signup","reset-password","lock-screen","terms", "privacy"`}>
                        <Link to="#">Pages</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                           
                            

                            <li className={`${["login", "signup","reset-password","lock-screen"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "reset-password"  ? "active" : ""}><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                    <li className={manu === "lock-screen"  ? "active" : ""}><Link to="/lock-screen" className="sub-menu-item"> Lock Screen</Link></li>
                                </ul> 
                            </li>
                            <li><Link to="/login" className="sub-menu-item">Logout</Link></li>
                            <li className={`${["comingsoon", "maintenance","error"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Special </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "comingsoon"  ? "active" : ""}><Link to="/comingsoon" className="sub-menu-item"> Coming Soon</Link></li>
                                    <li className={manu === "maintenance"  ? "active" : ""}><Link to="/maintenance" className="sub-menu-item"> Maintenance</Link></li>
                                    <li className={manu === "error"  ? "active" : ""}><Link to="/error" className="sub-menu-item"> 404! Error</Link></li>
                                </ul> 
                            </li>
                        </ul>
                    </li>
            
                </ul>
            </div>
        </div>
    </header>
    )
}