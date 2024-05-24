import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/style.scss"
import "./assets/css/materialdesignicons.min.css"
import JobCategories from "./pages/job-categories";
import JobGridFour from "./pages/job-grid-four";
import JobPost from "./pages/job-post";
import JobDetailTwo from "./pages/job-detail-two";
import Employers from "./pages/employers";
import EmployerProfile from "./pages/employer-profile";
import Candidates from "./pages/candidates";
import CandidateProfile from "./pages/candidate-profile";
import CandidateProfileSetting from "./pages/candidate-profile-setting";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ResetPassword from "./pages/reset-password";
import LockScreen from "./pages/lock-screen";
import Error from "./pages/error";
import Comingsoon from "./pages/comingsoon";
import Maintenance from "./pages/maintenance";
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import { allVacan ,allVacanForEmployee,allCompanies,allCat ,oneVac} from "./data/api";
import IndexUser from './pages/index' 
import JobList from "./pages/job-list-user";
import JobCategoriesUser from "./pages/job-categories-user";
import Career from "./pages/career";
import JobDetailUser from "./pages/job-detail-user";
import { useEffect } from "react";
import { useState } from "react";
function App() {


const [routes, setRoutes] = useState(null);

useEffect(() => {
  const userJson = localStorage.getItem("userData");
  const user = JSON.parse(userJson) ;
  if (user && user.role === "COMPANY") {
    setRoutes(createBrowserRouter([
            { path: "/", element: <JobGridFour />, loader: allVacan  },
            { path: "/home", element: <JobGridFour />, loader: allVacan },
            { path: "/job-categories", element: <JobCategories /> ,loader: allCat},
            { path: "/job-gridr/:id", element: <JobGridFour />, loader: async ({params})=>{
              return oneVac(parseInt(params.id))
            } },
            { path: "/job-post", element: <JobPost /> },
            { path: "/job-detail-two", element: <JobDetailTwo /> },
            { path: "/job-detail-two/:id", element: <JobDetailTwo /> },
            { path: "/employers", element: <Employers /> },
            { path: "/employer-profile", element: <EmployerProfile /> },
            { path: "/employer-profile/:id", element: <EmployerProfile /> },
            { path: "/candidates", element: <Candidates /> },
            { path: "/candidate-profile", element: <CandidateProfile /> },
            { path: "/candidate-profile/:id", element: <CandidateProfile /> },
            { path: "/candidate-profile-setting", element: <CandidateProfileSetting /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/reset-password", element: <ResetPassword /> },
            { path: "/lock-screen", element: <LockScreen /> },
            { path: "*", element: <Error /> },
            { path: "/error", element: <Error /> },
            { path: "/comingsoon", element: <Comingsoon /> },
            { path: "/maintenance", element: <Maintenance /> },
        
    ]));
  } else if (user && user.role === "USER") {
    setRoutes(createBrowserRouter([
        { path: "/", element: <IndexUser /> },
        { path: "/home", element: <IndexUser />},
        { path: "/job-categories-user", element: <JobCategoriesUser /> ,loader: allCat},
        { path: "/job-list-one", element: <JobList /> },
        { path: "/career", element: <Career /> },
        { path: "/job-detail-three", element: <JobDetailUser /> },
        { path: "/job-detail-three/:id", element: <JobDetailUser /> },
        { path: "/employers", element: <Employers /> ,loader:allCompanies},
        { path: "/employer-profile", element: <EmployerProfile /> },
        { path: "/employer-profile/:id", element: <EmployerProfile /> },
        { path: "/candidate-profile", element: <CandidateProfile /> },
        { path: "/candidate-profile/:id", element: <CandidateProfile /> },
        { path: "/candidate-profile-setting", element: <CandidateProfileSetting /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/lock-screen", element: <LockScreen /> },
        { path: "/error", element: <Error /> },
        { path: "/comingsoon", element: <Comingsoon /> },
        { path: "/maintenance", element: <Maintenance /> },
        { path: "*", element: <Error /> }  
      
    ]));
  } else {
    setRoutes(createBrowserRouter([
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "*", element: <Login/> }
    ]));
  }
}, []);

if (!routes) {
  return <div>Загрузка...</div>; 
}



    return (
      <RouterProvider router={routes}/>
    );
  }
  
  export default App;
  