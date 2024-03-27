import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacilities from "./Section/MedicalFacilities";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss'
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./Section/HomeFooter";

class HomePage extends Component {
  handleAfterChange = (event, slick, currentSlide) => {
    console.log("currentSlide: ", currentSlide);
  }
  
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      afterChange: this.handleAfterChange
    };
    return (
        <div>
            <HomeHeader />
            <Specialty settings={settings} />
            <MedicalFacilities settings={settings} />
            <OutStandingDoctor settings={settings} />
            <Handbook settings={settings}/>
            <About />
            <HomeFooter />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
