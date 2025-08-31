import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

import picons from "primeicons/primeicons.css";
import preactbase from "primereact/resources/primereact.css";
import preacttheme from "primereact/resources/themes/lara-light-blue/theme.css";

class Dumb extends HTMLElement {
  constructor() {
    super();
    console.log("FCK");
    this._shadowRoot = this.attachShadow({ mode: "open" });
    var style = document.createElement("style");
    style.textContent = picons + preactbase + preacttheme;
    var mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(style);
    this._shadowRoot.appendChild(mountPoint);
    var reactroot = createRoot(mountPoint);
    reactroot.render(<App />);
  }

  connectedCallback() {}
}

window.customElements.define("dumb-app", Dumb);
