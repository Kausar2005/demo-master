import React from "react";
import { Link } from "react-router-dom";

import heroImg from "../assets/images/hero/bg.jpg"
import { useLoaderData } from "react-router-dom";
import Navbar from "../componants/usernavbar";
import FormSelect from "../componants/formSelect";
import AboutUs from "../componants/aboutUs";
import Companies from "../componants/companies";
import Blog from "../componants/blog";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import { FiClock, FiMapPin, FiBookmark,FiDollarSign } from "../assets/icons/vander"
import { useState } from "react";
import { format } from "date-fns";
import { candidate , allVacanForEmployee } from "../data/api";
import { useEffect } from "react";
export default function IndexTwo(){
    
    const thisdate = new Date();
    const userJson = localStorage.getItem("userData");
    const thisUser = JSON.parse(userJson) ;
    const handleSubmit=async (id) => {
        const candidatedata={vacancy:parseInt(id),user:thisUser.id,date: format(thisdate, 'dd/MM/yyyy'),coverLetter:"dsvsddsvsdvsdv"}
        const response=await candidate(candidatedata)
    } 
    console.log(localStorage)
    const [jobData, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await allVacanForEmployee(thisUser.id);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-260 d-table w-100" >
            <div className="bg-overlay bg-primary-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-10">
                        <div className="title-heading text-center">
                            <h1 className="heading text-white fw-bold">Find & Hire Experts <br/> for any Job</h1>
                            <p className="para-desc text-white-50 mx-auto mb-0">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                        
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-2 mt-4">
                                <FormSelect/>
                            </div>

                            <div className="mt-2">
                                <span className="text-white-50"><span className="text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                            </div>
                        </div>
                    </div>
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
            

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center mb-4 pb-2">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h4 className="title mb-3">Popular Job Listing</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mt-0">
                    {jobData.slice(0,8).map((item, index)=>{
                        return(
                            <div className="col-12" key={index}>
                                <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
                                    <div className="d-flex align-items-center w-310px">
        
                                        <div className="ms-3">
                                            <Link to={`/job-detail-one/${item.id}`} className="h5 title text-dark">{item.name}</Link>
                                        </div>
                                    </div>
        
                                    <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                                        <span className="text-muted d-flex align-items-center fw-medium mt-md-2"><FiClock className="fea icon-sm me-1 align-middle"/>{item.date} </span>
                                    </div>
        
                                    <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                                        <span className="text-muted d-flex align-items-center"><FiMapPin className="fea icon-sm me-1 align-middle"/>{item.century}</span>
                                        <span className="d-flex fw-medium mt-md-2"><FiDollarSign className="fea icon-sm text-primary me-1"/>{item.salaryA}/{item.salaryA}</span>
                                    </div>
        
                                    <div className="mt-3 mt-md-0">
                                        <Link to="" className="btn btn-sm btn-icon btn-pills btn-soft-primary bookmark"><FiBookmark className="icons"/></Link>
                                        <button onClick={()=>(handleSubmit(item.id))} className="btn btn-sm btn-primary w-full ms-md-1">On Click</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="col-12">
                        <div className="text-center">
                            <Link to="/job-list-one" className="btn btn-link primary text-muted">See More Jobs <i className="mdi mdi-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            

            
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}