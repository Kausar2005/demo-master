import React from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import bg1 from '../assets/images/hero/bg.jpg'

import Navbar from "../componants/usernavbar";
import Faq from "../componants/faq";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import {FiMapPin} from '../assets/icons/vander'

export default function Employers(){
    const employers=useLoaderData();
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Employers / Companies</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Employers</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section">
            <div className="container">
                <div className="row g-4 gy-5">
                    {employers.map((item,index)=>{
                        return(
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <div className="employer-card position-relative bg-white rounded shadow p-4 mt-3">
                                    

                                    <div className="content mt-3">
                                        <Link to={`/employer-profile/${item.id}`} className="title text-dark h5">{item.firstName+" "+item.lastName}</Link>

                                    </div>

                                    <ul className="list-unstyled d-flex justify-content-between align-items-center border-top mt-3 pt-3 mb-0">
                                        <li className="text-muted d-inline-flex align-items-center"><FiMapPin className="fea icon-sm me-1 align-middle"/>Qazaqstan</li>
                                    
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>

                
            </div>
           
        </section>
        <Footer top={false}/>
        <ScrollTop/>
        </>
        
    )
}