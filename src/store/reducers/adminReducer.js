import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  isLoadingGender: false,
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START: {
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    }

    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      copyState.isLoadingGender = false;

      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED: {
      let copyState = { ...state };
      copyState.genders = [];
      copyState.isLoadingGender = false;

      return {
        ...copyState,
      };
    }

    case actionTypes.FETCH_POSITION_SUCCESS: {
      let copyState = { ...state };
      copyState.positions = action.data;

      return {
        ...copyState,
      };
    }

    case actionTypes.FETCH_POSITION_FAILED: {
      let copyState = { ...state };
      copyState.positions = [];

      return {
        ...copyState,
      };
    }

    case actionTypes.FETCH_ROLE_SUCCESS: {
      let copyState = { ...state };
      copyState.roles = action.data;

      return {
        ...copyState,
      };
    }

    case actionTypes.FETCH_ROLE_FAILED: {
      let copyState = { ...state };
      copyState.roles = [];

      return {
        ...copyState,
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
