import { createStore } from "redux";
import { wrapStore, Store } from "webext-redux";

import rootReducer from "./reducer";
// import TabScript from '../content/tabScript'

const store = createStore(rootReducer, {});
wrapStore(store);

chrome.runtime.onInstalled.addListener(function () {
  console.log("On Installed");
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const tabURL = tab.url;
  const { image } = store.getState()
  const isProfilePage = tabURL.includes(image.url);
  if (isProfilePage && image.url) {
    if (changeInfo.status === 'complete') {
      console.log("------calling");
      chrome.tabs.sendMessage(tabId, { type: 'tabScript', parameter: image });
    }
  }
});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   console.log("Tab Update");
//   store.dispatch({
//     type: "SET_PROP",
//     data: {
//       isAssignProp: true,
//       isActionPending: true,
//     },
//   });
// });

// chrome.runtime.onMessage.addListener(message => {
// if (message && message.type === 'sign in') {
//   console.log("-------", loginByWebflowMethod());

// }
// });

// const loginByWebflowMethod = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       const redirectURI = chrome.identity.getRedirectURL('oauth');
//       console.log("redirectURI", redirectURI);

//       const clientID = "eRPYTkMfouqVKZdBPxIjNH";
//       const state = "raj";

//       let authURL = "https://www.figma.com/oauth";
//       authURL += `? client_id = ${ clientID } `;
//       authURL += `& redirect_uri=${ encodeURIComponent(redirectURI) } `;
//       authURL += `& scope=file_read`;
//       authURL += `& state=${ state } `;
//       authURL += `& response_type=code`;

//       console.log("authURL", authURL);

//       chrome.identity.launchWebAuthFlow({ url: authURL, interactive: true }, (responseUrl) => {
//         console.log('responseUrl', responseUrl);

//         resolve(responseUrl);
//       });
//     } catch (err) {
//       console.error(err);
//       reject("Login Error");
//     }
//   });
// };

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query({}, (tabs) => {
    const script = "window.location.reload();";
    tabs.map((tab) => {
      if (tab.url?.includes("www.linkedin.com/")) {
        chrome.tabs.executeScript(tab.id, { code: script });
      }
    });
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("Onclick", tab.id);
  chrome.tabs.sendMessage(tab.id, { type: 'hirexframview' });
});

export default store;
