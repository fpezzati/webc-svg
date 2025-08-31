import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

import picons from "primeicons/primeicons.css";

class Dumb extends HTMLElement {
  constructor() {
    super();
    console.log("FCK");
    this._shadowRoot = this.attachShadow({ mode: "open" });
    var style1 = document.createElement("style");
    style1.innerText = picons.toString();
    var mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(style1);
    this._shadowRoot.appendChild(mountPoint);
    var reactroot = createRoot(mountPoint);
    reactroot.render(<App />);
  }

  connectedCallback() {}
}

window.customElements.define("dumb-app", Dumb);
