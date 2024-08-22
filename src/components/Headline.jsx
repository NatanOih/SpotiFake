import React from "react";

export default function Headline({ className, children }) {
  return <h1 className={` uppercase ${className}`}>{children}</h1>;
}
