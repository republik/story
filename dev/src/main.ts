import "./style.css";

import { MyCounter } from "@story-component/test";

customElements.define("my-counter", MyCounter);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <my-counter></my-counter>
    <my-counter></my-counter>
    <my-counter></my-counter>
  </div>
`;
