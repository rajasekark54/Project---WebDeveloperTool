const initialState = {
  updateStyle:false,
  props: {}
};

const webReducer = (state = initialState, action) => {
  // console.log("web reducer ===>", action);

  switch (action.type) {
    case "UPDATE_STYLE":
      return {
        updateStyle: !state.updateStyle,
        props: action.data
      };
    case "RESET_PROP":
      return initialState;
    default:
      return state;
  }
};

export default webReducer;
