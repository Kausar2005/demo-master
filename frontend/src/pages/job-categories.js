import React from "react";
import { Link  } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import Navbar from "../componants/navbar";
import { useState } from "react";
import { addCat } from "../data/api";
import { NotificationContainer ,NotificationManager} from "react-notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function JobCategories(){
    const location=useLocation();
    const navigate=useNavigate();
    const [category,setCat]=useState("");
    const handle= (ev) => {
        setCat(ev.target.value);
    }
    const handleSubmit=async (ev) => {
       
        const savedCategory=await addCat(category);
        if(savedCategory!=null){
            navigate("job-categories",{state:{message:category}});
        }
       
    }
    const [notificationShown, categorySave] = useState(false);
    useEffect(() => { 
        const notificationWasShown = localStorage.getItem('categorySave'); 
        if (notificationWasShown === 'true') {
            return;
        }
        if (location.state) {
            NotificationManager.success(location.state.message, "category Saved");
            categorySave(true); 
            localStorage.setItem('categorySave', 'true');
        }
    }, [location.state]);





    const categoriesData=useLoaderData();
   

    return(
        <>
        <NotificationContainer/>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" >
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Job Categories</h5>
                        </div>
                    </div>
                </div>

                
            </div>
        </section>
        
                                        
        <section className="section">
            <div className="container">
            <div className="  col-12">
        <form className="rounded shadow p-4"onSubmit={handleSubmit} >
           <div className="row">
                <h5 className="mb-3">Job Details:</h5>                                    
                    <div className="col-12">
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Category Title:</label>
                            <input name="subject" onChange={handle} value={category} className="form-control" placeholder="Title :"/>
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
                <div className="row row-cols-lg-5 row-col-md-4 row-cols-sm-2 row-cols-1 g-4">
                    {categoriesData.map((item,index)=>{
                      
                        return(
                            <div className="col" key={index}>
                                <div className="position-relative job-category text-center px-4 py-5 rounded shadow">
                                    
            
                                    <div className="mt-4">
                                        <Link to="" className="title h5 text-dark">{item.name} </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

           
            
        </section>
        </>
    )
}