import { combineReducers } from "redux";
import web from "./reducer/webReducer";
import trigger from "./reducer/trigger";
import figma from "./reducer/figmaReducer";
import image from "./reducer/imageReducer"

export default combineReducers({
  web,
  trigger,
  figma,
  image,
  trigger
});
