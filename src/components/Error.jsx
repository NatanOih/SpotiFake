import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Error({ error }) {
  return (
    <div className="flex flex-col justify-center h-screen items-center gap-10 text-4xl">
      {error ? (
        <span>something went wrong - {error}</span>
      ) : (
        <div>
          <span> 404 page not found</span>
        </div>
      )}
      <span> Are you lost?</span>
      <Link to="/">
        <Button>Home Page</Button>
      </Link>
    </div>
  );
}
