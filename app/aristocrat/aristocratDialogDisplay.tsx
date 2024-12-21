"use client";
import PlayerInformation from "./dialogs/PlayerInformationDialog";
import { useEffect } from "react";

type Props = {
  activeDialog: string | null;
  aspectRatioClass: string;
  uploadedImage: string;
  pos: number;
  playerImgScale: number;
};

export default function DialogDisplay({
  activeDialog,
  aspectRatioClass,
  pos,
  uploadedImage,
  playerImgScale,
}: Props) {
  useEffect(() => {
    console.log("activeDialog:", activeDialog);
  }, [activeDialog]);

  return (
    <>
      {activeDialog === "PlayerInformation" && (
        <PlayerInformation
          playerImgScale={playerImgScale}
          pos={pos}
          animate="true"
          imgSrc={uploadedImage}
          playerImgSrc="/Chippy.png"
          aspectRatio={aspectRatioClass}
        />
      )}
    </>
  );
}
