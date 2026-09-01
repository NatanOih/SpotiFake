import React from "react";
import { useAtomValue } from "jotai";
import { currentPlayListUsedStore } from "../../lib/store";
import ImageWithLoader from "../../components/ImageWithLoader";

export default function PlayListMetaData() {
  const playListData = useAtomValue(currentPlayListUsedStore);

  const description = playListData?.description || "";
  const name = playListData?.name || "";
  const releaseDate = playListData?.releaseDate || "";
  const imageUrl = playListData?.images?.[0]?.url || "";

  return (
    <section className="flex font-bold flex-col gap-2 max-w-[40vw] text-center justify-center items-center">
      <h1 className="lg:text-4xl sm:text-nowrap text-2xl"> {name} </h1>
      <span> {description} </span>
      <span className=""> Released: {releaseDate} </span>
      <ImageWithLoader
        src={imageUrl}
        alt={name}
        containerClassName="max-w-[70vw] md:max-w-[50vw] w-full aspect-square rounded-lg shadow-xl"
        className="w-full h-full object-cover rounded-lg"
      />
    </section>
  );
}
