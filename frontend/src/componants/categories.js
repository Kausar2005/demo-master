import React from "react";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { allCat } from "../data/api";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import { useNavigate } from "react-router-dom";
export default function Categories(){
    const navigate=useNavigate();
    const categoriesData=[]
    // useEffect(() => {
    //     const fetchData = async () => {
    //       const categoriesData = await allCat(); 
    //     };
      
    //     fetchData();  
    //     navigate(0);
    //   }, []);
    let settings = {
        container: '.tiny-five-item',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            1025: {
                items: 5
            },

            992: {
                items: 4
            },

            767: {
                items: 3
            },

            425: {
                items: 1
            },
        },
      };
    return(
        <>
            <div className="container mt-100 mt-60">
                <div className="row justify-content-center mb-4 pb-2">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h4 className="title mb-3">Popular Categories</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="tiny-five-item">
                            <TinySlider settings={settings}>
                                {categoriesData.map((item,index)=>{
                                    let Icon = item.icon
                                    return(
                                    <div className="tiny-slide" key={index}>
                                        <div className="position-relative job-category text-center px-4 py-5 rounded shadow m-2">
                                            
                    
                                            <div className="mt-4">
                                                <Link to="" className="title h5 text-dark">{item.name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </TinySlider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}