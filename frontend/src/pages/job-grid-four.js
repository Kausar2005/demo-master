import React from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/hero/bg.jpg'

import Navbar from "../componants/navbar";
import AboutTwo from "../componants/aboutTwo";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import {FiClock,FiMapPin, FiDollarSign} from "../assets/icons/vander"
import { deleteVac } from "../data/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { allCat } from "../data/api";
import { all } from "axios";
export default function JobGridFour(){
    const navigate=useNavigate();
    const params = useParams();
    const hasId = params.id !== undefined;
    const jobData=useLoaderData();
    
    
    function handleDelete(id) {
        if (window.confirm("Вы уверены, что хотите удалить этот элемент?")) {
            deleteVac(id);
            window.location.reload();
        } else {
            
            console.log("Удаление отменено");
        }
    }

    
    
        const [jobElements, setSetElements] = useState({ name: jobData.name,company_id:jobData.company_id,descp:jobData.descp, salaryA:jobData.salaryA, salaryB:jobData.salaryB, exp: jobData.exp, category:jobData.category, century: jobData.century ,location:jobData.location,date:jobData.location,img:"faq"});
        const handleName = (ev) => {
            setSetElements({ ...jobElements, name: ev.target.value });
        }
        const handleDescp = (ev) => {
            setSetElements({ ...jobElements, descp: ev.target.value });
        }
        const handlesalaryA = (ev) => {
            setSetElements({ ...jobElements, salaryA: parseInt(ev.target.value) });
        }
        const handlesalaryB= (ev) => {
            setSetElements({ ...jobElements, salaryB: parseInt(ev.target.value) });
        }

        const handleExp= (ev) => {
            setSetElements({ ...jobElements, exp: parseInt(ev.target.value) });
        }
        const handleCat= (ev) => {
            setSetElements({ ...jobElements, category:parseInt(ev.target.value)});
            console.log(jobElements);
        }
        const handleCen= (ev) => {
            setSetElements({ ...jobElements, century:ev.target.value});
        }
        const handleLoc= (ev) => {
            setSetElements({ ...jobElements, location:ev.target.value});
        }
        const [categoriesData, setData] = useState([]);
        async function fetchData() {
          
            const response = await allCat()
            console.log(response)
            
            setData(response); 
        
        }
        useEffect(() => {
            if (hasId) {    
                 fetchData();
                console.log(categoriesData)
            }
        }, [hasId]);
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" >
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
                <div className="row g-4">

                {hasId ? (
                <section className="section bg-light">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8">
                                <div className="card border-0">
                                    <form className="rounded shadow p-4" >
                                        <div className="row">
                                            <h5 className="mb-3">Job Details:</h5>                                    
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Job Title :</label>
                                                    <input name="subject" value={jobElements.name} onChange={handleName} id="subject2" className="form-control" placeholder="Title :"/>
                                                </div>                                                                               
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Description :</label>
                                                    <textarea name="comments" onChange={handleDescp} value={jobElements.descp} id="comments2" rows="4" className="form-control" placeholder="Describe the job :"></textarea>
                                                </div>
                                            </div>
                                            
        
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Job Categories:</label>
                                                    <select className="form-control form-select" onChange={handleCat} value={jobElements.category} id="Categories">
                                                    <option   >Categories</option>
                                                        {console.log(categoriesData)}{
                                                        categoriesData.map((item) => (
                                                            <option
                                                            key={item.id} value={parseInt(item.id)}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
        
                                            
        
                                            <div className="col-md-3">
                                                <div className="mb-3 mt-md-4 pt-md-1">
                                                    <label className="form-label small fw-bold d-none"></label>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text border" id="basic-addon1">$</span>
                                                        <input type="number" onChange={handlesalaryA}  value={jobElements.salaryA} className="form-control" min="1" max="1000" placeholder="Min" id="MIn" aria-describedby="inputGroupPrepend" required/>
                                                    </div>
                                                </div>
                                            </div>
        
                                            <div className="col-md-3">
                                                <div className="mb-3 mt-md-4 pt-md-1">
                                                    <label className="form-label small fw-bold d-none"></label>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text border" id="basic-addon1">$</span>
                                                        <input type="number" onChange={handlesalaryB} value={jobElements.salaryB} className="form-control" min="1" max="1000" placeholder="Max" id="Max" aria-describedby="inputGroupPrepend" required/>
                                                    </div>
                                                </div>
                                            </div>
                                       
        
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Experience:</label>
                                                    <input type="number" onChange={handleExp} name="name" id="Experience" value={jobElements.exp} className="form-control" placeholder="Experience"/>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Country:</label>
                                                    <input type="text" value={jobElements.century} onChange={handleCen} className="form-control " id="Country">
                                                        
                                                    </input>
                                                </div>
                                            </div>
        
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">State:</label>
                                                    <input value={jobElements.location} type="text" onChange={handleLoc} className="form-control " id="State">
                                                        
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
        
                                        <div className="row">
                                            <div className="col-12">
                                                <button  className="submitBnt btn btn-primary" type="submit">Sub</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>  
                        </div>
                    </div>
                </section>
                ):(
                    
                    <div className="col-lg-8 col-md-6 col-12">
                        <div className="row g-4">
                            {
                                
                            jobData.map((item,index)=>{
                                return(
                                <div className="col-lg-6 col-12" key={index}>
                                    <div className="job-post rounded shadow bg-white">
                                        <div className="p-4">
                                            <Link to={`/job-detail-two/${item.id}`} className="text-dark title h5">{item.name}</Link>
            
                                            <p className="text-muted d-flex align-items-center small mt-3"><FiClock className="fea icon-sm text-primary me-1"/>{item.date}</p>
            
                                            <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 mt-3">
                                                <li className="list-inline-item"><span className="badge bg-soft-primary">{item.date}</span></li>
                                                <li className="list-inline-item"><span className="text-muted d-flex align-items-center small"><FiDollarSign className="fea icon-sm text-primary me-1"/>{item.salaryA}/{item.salaryB}</span></li>
                                            </ul>
                                        </div>
                                        <div className="d-flex align-items-center p-4 border-top">
            
                                            <div className="ms-3">
                                                <p  className="h5 company text-dark">{item.century}</p>
                                                <span className="text-muted d-flex align-items-center mt-1"><FiMapPin className="fea icon-sm me-1"/>{item.location}</span>
                                            </div>
                                            <div className="ms-3">
                                                <button onClick={()=>(handleDelete(item.id))} className="btn btn-sm btn-danger w-full ms-md-1"> Delete</button>
                                                <Link to={`/job-grid/${item.id}`} className="btn btn-sm btn-primary w-full ms-md-1">Change</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
        
                        
                    </div>)}
                </div>
            </div>

         
        </section>
        
        </>
    )
}