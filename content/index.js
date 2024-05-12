import React from "react";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import { render } from "react-dom";
import Activity from "./Activity";
import './tabScript'
const proxyStore = new Store();

const indexView = chrome.extension.getURL('index.html');

chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'hirexframview') {
    console.log('hirexframview received');
    let iframe = document.getElementById('hirex-frame-view');

    if (!iframe) {
      let hirexView = document.createElement('div');
      hirexView.id = 'hirex-extension-root';
      hirexView.setAttribute(
        'style',
        'width: 334px;height: 100vh;position: fixed;top: 0px;right: 0px; z-index: 147483647;background-color: white;box-shadow: 0px 0px 5px #0000009e; visibility: visible;'
      );

      let hirexPopupDiv = document.createElement('div');
      hirexPopupDiv.id = 'hirexPopup';
      hirexPopupDiv.className = 'popSendEmail';
      hirexPopupDiv.setAttribute(
        'style',
        'height:60rem;width: 32%;background-color: ##ffffff;position: absolute;z-index: 999999;bottom: 0;box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);right: 22%;position: fixed;border-radius: 10px 0px 0px 10px;display: none;  '
      );

      hirexView.innerHTML = `<iframe id="hirex-frame-view" src = ${indexView}></iframe>`;
      document.body.insertBefore(hirexView, document.body.childNodes[0]);
      document.getElementsByTagName('html')[0].append(hirexPopupDiv);

      let iframeView = document.getElementById('hirex-frame-view');
      iframeView.setAttribute(
        'style',
        'width: 100%;height: 97vh;border: none;'
      );
    } else {
      const hirexViewProp = document.getElementById('hirex-extension-root')
        .style;
      if (hirexViewProp.visibility === 'visible') {
        hirexViewProp.visibility = 'hidden';
        iframe.setAttribute('src', '');
      } else {
        hirexViewProp.visibility = 'visible';
        iframe.setAttribute('src', indexView);
      }
    }
  }
});

const anchor = document.createElement("div");
anchor.id = "i2i-web-tool";
document.body.insertBefore(anchor, document.body.childNodes[0]);
proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <Activity />
    </Provider>,
    document.getElementById("i2i-web-tool")
  );
});
