import React from "react";

export default function Loading() {
  return (
    <div className="text-4xl flex justify-center h-screen items-center gap-4">
      Loading Items...
      <div className=" rounded-full border-0 border-t-2 w-4 h-4 animate-spin border-white " />
    </div>
  );
}
