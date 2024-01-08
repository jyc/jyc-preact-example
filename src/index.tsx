import { h, render } from "preact";

import "./style.module.scss";
import { App } from "App";

// The loading bar is animated using CSS so that it can display before this
// JavaScript has loaded.
document.getElementById("loading-bar")?.style.setProperty("display", "none");

const rootEl = document.getElementById("root");
if (rootEl == null) {
  throw new Error("no #root element");
}

render(<App initialText="hello world" />, rootEl);
