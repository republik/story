import React from "react";
import Choice from "./Choice";

const Estimate = ({ options, ...props }) => (
  <Choice {...props} options={options} horizontal />
);

export default Estimate;
