import React from "react";
import Navbar from "./Component/Navbar/page";
import HomePage from "./Home/page";
import Features from "./Feature/page";
import Footer from "./Component/Footer/page";
import About from "./About/page";

const Page = () => {
  return (
    
      
      <div >
      
        <Navbar></Navbar>
        <HomePage></HomePage>
        <About></About>
        <Features></Features>
        <Footer></Footer>

      
      </div>
     
  );
};

export default Page;
