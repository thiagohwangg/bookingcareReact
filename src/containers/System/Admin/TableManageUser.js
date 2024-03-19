import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    if (prevProp.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  render() {
    console.log("check all user", this.state.usersRedux);
    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>{"item.email"}</td>
            <td>{"item.firstName"}</td>
            <td>{"item.lastName"}</td>
            <td>{"item.address"}</td>
            <td>
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button className="btn-delete">
                <i className="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
