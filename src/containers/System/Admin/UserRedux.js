import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "../UserManage.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    if (prevProp.gendersRedux !== this.props.gendersRedux) {
      let arrGenders = this.props.gendersRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProp.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }

    if (prevProp.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;

      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProp.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.gendersRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: ''
      });
    }
  }

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) {
      return;
    }

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    } else if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      });
    }

    setTimeout(() => {
      this.props.fetchUserRedux();
    }, 1000);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This inputs is required:" + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = ''
    if(user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary')
    }
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: '',
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let { genderArr, positionArr, roleArr } = this.state;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div class="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isGetGenders ? "Loading genders" : ""}
              </div>

              <div>
                <div className="row">
                  <div className="form-group col-3">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="email"
                      value={email}
                      onChange={(e) => this.onChangeInput(e, "email")}
                      disabled={this.state.action === CRUD_ACTIONS.EDIT}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      name="password"
                      value={password}
                      onChange={(e) => this.onChangeInput(e, "password")}
                      disabled={this.state.action === CRUD_ACTIONS.EDIT}
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
                      value={firstName}
                      onChange={(e) => this.onChangeInput(e, "firstName")}
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
                      value={lastName}
                      onChange={(e) => this.onChangeInput(e, "lastName")}
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
                      value={phoneNumber}
                      onChange={(e) => this.onChangeInput(e, "phoneNumber")}
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
                      value={address}
                      onChange={(e) => this.onChangeInput(e, "address")}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-3">
                    <label htmlFor="gender">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => this.onChangeInput(e, "gender")}
                      value={gender}
                    >
                      {genderArr &&
                        genderArr.length > 0 &&
                        genderArr.slice(0, 3).map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="position">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="position"
                      name="position"
                      className="form-control"
                      onChange={(e) => this.onChangeInput(e, "position")}
                      value={position}
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.slice(0, 5).map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="roleId">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      id="roleId"
                      name="roleId"
                      className="form-control"
                      onChange={(e) => this.onChangeInput(e, "role")}
                      value={role}
                    >
                      {roleArr &&
                        roleArr.length > 0 &&
                        roleArr.slice(0, 3).map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="roleId">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <div className="preview-img-container">
                      <input
                        id="previewImg"
                        type="file"
                        hidden
                        onChange={(e) => this.handleOnChangeImage(e)}
                      />
                      <label className="label-upload" htmlFor="previewImg">
                        Tải ảnh <i className="fas fa-upload"></i>
                      </label>
                      <div
                        className="preview-image"
                        style={{
                          backgroundImage: `url(${this.state.previewImgURL})`,
                        }}
                        onClick={() => this.openPreviewImage()}
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-12 my-3">
                    <button
                      type="submit"
                      className={
                        this.state.action === CRUD_ACTIONS.EDIT
                          ? "btn btn-warning"
                          : "btn btn-primary"
                      }
                      onClick={() => this.handleSaveUser()}
                    >
                      {this.state.action === CRUD_ACTIONS.EDIT ? (
                        <FormattedMessage id="manage-user.edit" />
                      ) : (
                        <FormattedMessage id="manage-user.save" />
                      )}
                    </button>
                  </div>
                  <div className="col-12 mb-5">
                    <TableManageUser
                      handleEditUserFromParentKey={
                        this.handleEditUserFromParent
                      }
                      action={this.state.action}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gendersRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editAUserRedux: (user) => dispatch(actions.editAUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
