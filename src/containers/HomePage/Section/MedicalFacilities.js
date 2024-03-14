import React, { Component } from "react";
import { connect } from "react-redux";
import './MedicalFacilities.scss'

class MedicalFacilities extends Component {
  render() {

    return (
        <div>
            MedicalFacilities
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities);
