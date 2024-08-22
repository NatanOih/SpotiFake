import React from "react";
import Headline from "../../components/Headline";
import { useAtomValue } from "jotai";
import { currentPlayListUsedStore } from "../../lib/store";

export default function PlayListMetaData() {
  const playListData = useAtomValue(currentPlayListUsedStore);

  const description = playListData?.description || "";
  const name = playListData?.name || "";
  const followers = playListData?.followers?.total || 0;
  const imageUrl = playListData?.images?.[0]?.url || "";

  return (
    <section className="flex font-bold flex-col gap-2 max-w-[40vw] text-center justify-center items-center">
      <h1 className="lg:text-4xl md:text-2xl"> {name} </h1>
      <span> {description} </span>
      <span className=""> followers: {followers} </span>
      <img
        className="max-w-[70vw] md:max-w-[50vw] h-auto p-2 rounded-lg"
        src={imageUrl}
        alt={name}
        loading="lazy"
      />
    </section>
  );
}
