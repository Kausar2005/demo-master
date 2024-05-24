import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import bg1 from '../assets/images/hero/bg.jpg'
import { useState } from "react";
import Navbar from "../componants/usernavbar";
import AboutTwo from "../componants/aboutTwo";
import FormSelect from "../componants/formSelect";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import { candidateVacancy } from "../data/api";
import {FiClock,FiMapPin, FiBookmark} from "../assets/icons/vander"
import { jobData } from "../data/data";

export default function JobListOne(){
    const userJson = localStorage.getItem("userData");
    const thisUser = JSON.parse(userJson) ;
    const [jobData, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await candidateVacancy(thisUser.id);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);
    console.log(jobData);
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100">
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Job Vacancies</h5>
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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 mt-4">
                        <div className="features-absolute">
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-4">
                                <FormSelect/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-60">
                <div className="row g-4">
                    {jobData.map((item,index)=>{
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
                                        <span className="d-flex fw-medium mt-md-2">${item.salaryA}- ${item.salaryB}</span>
                                    </div>

                                    <div className="mt-3 mt-md-0">
                                        <Link to="" className="btn btn-sm btn-icon btn-pills btn-soft-primary bookmark"><FiBookmark className="icons"/></Link>
                                        <Link to={`/job-detail-one/${item.id}`} className="btn btn-sm btn-primary w-full ms-md-1">Apply Now</Link>
                                    </div>
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