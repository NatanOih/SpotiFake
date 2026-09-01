import React from "react";
import { Outlet } from "react-router-dom";
import Player from "./Player";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Player />
    </>
  );
}
