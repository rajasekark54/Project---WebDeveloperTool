const initialState = {
  host: "",
  image: "",
  clearness: 0.5,
  height: 100,
  width: 100,
  top: 0,
  bottom: 0,
  imageBlob: "",
};

const webReducer = (state = initialState, action) => {
  // console.log("web reducer ===>", action);

  switch (action.type) {
    case "SET_WEB_PROP":
      return action.data;
    case "RESET_WEB_PROP":
      return initialState;
    default:
      return state;
  }
};

export default webReducer;
