import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import "../UserManage.scss";
import { LANGUAGES } from "../../../utils";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../../services/userService";
import ModalUser from "../ModalUser";
import ModalEditUser from "../ModalEditUser";
import { emitter } from "../../../utils/emitter";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        this.setState({
          genderArr: res.data,
        });
      }
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    console.log("check state", this.state.genderArray);
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div class="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <form>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="email"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      name="password"
                    />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="inputFirstName">
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                      name="firstName"
                    />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="inputLastName">
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      name="lastName"
                    />
                  </div>
                </div>
                <div class="row">
                  <div className="form-group col-3">
                    <label htmlFor="inputPhoneNumber">
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPhoneNumber"
                      name="phoneNumber"
                    />
                  </div>
                  <div className="form-group col-9">
                    <label htmlFor="inputAddress2">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="Apartment, studio, or floor"
                      name="address"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label htmlFor="gender">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select className="form-control">
                      {genders && genders.length > 0 &&
                       genders.map((item, index) => {
                        return (
                          <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="position">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="position"
                      name="position"
                      className="form-control"
                    >
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="roleId">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select id="roleId" name="roleId" className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="roleId">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-primary">
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
