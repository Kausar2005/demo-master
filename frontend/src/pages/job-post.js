import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import bg1 from '../assets/images/hero/bg.jpg'
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import { useState, useEffect } from "react";
import { addJob } from "../data/api";
import { allCat } from "../data/api";
import { useLoaderData } from "react-router-dom";
import { jobData } from "../data/data";
import { useNavigate } from "react-router-dom";
export default function JobPost(){
    const [categoriesData, setCategoriesData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await allCat();
            setCategoriesData(data);
        };

        fetchData();
    }, []);
    const thisdate = new Date();
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const companyId = userData.id;
    const navigate=useNavigate;
    const [jobElements, setSetElements] = useState({ name: '',company_id:companyId,descp: '', salaryA:0, salaryB:0, exp: 0, category: 0, century: 'Qazaqstan' ,location:'',date:"",img:"faq"});
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
    }
    const handleCen= (ev) => {
        setSetElements({ ...jobElements, century:ev.target.value});
    }
    const handleLoc= (ev) => {
        setSetElements({ ...jobElements, location:ev.target.value});
    }
    const handleSubmit=async (ev) => {
        ev.preventDefault();
        console.log(jobElements);
        setSetElements({ ...jobElements, date: format(thisdate, 'dd/MM/yyyy') });
        if(jobElements.date==""){
            setSetElements({ ...jobElements, date: format(thisdate, 'dd/MM/yyyy') });
            const jobadd=await addJob(jobElements);
        }
        else{
            const jobadd=await addJob(jobElements);
        }
        if(jobadd){
            navigate("/job-post");
        }
        
    }
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" >
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Create a Job Post</h5>
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

        <section className="section bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="card border-0">
                            <form className="rounded shadow p-4" onSubmit={handleSubmit}>
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
                                                {categoriesData.map((item) => (
                                                    <option key={item.id} value={parseInt(item.id)}>{item.name}</option>
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
        </>
    )
}