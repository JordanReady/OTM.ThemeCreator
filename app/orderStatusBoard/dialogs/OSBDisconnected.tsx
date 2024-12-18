import React from "react";
import Image from "next/image";

type Props = {
  pos: number;
  animate?: string;
  imgSrc: string;
  aspectRatio: string;
};

export default function OSBDisconnected({
  pos,
  animate,
  imgSrc,
  aspectRatio,
}: Props) {
  return (
    <div className={`custom-dialog-backdrop margin-${pos}`}>
      <div
        className={` disconnected-dialog ${
          animate === "true" ? "animate" : ""
        }`}
      >
        <strong>Disconnected</strong>
        <Image
          src={imgSrc}
          width={350}
          height={350}
          alt={`Disconnected Logo`}
          className={`logo server-disconnected-${aspectRatio}`}
        />
        <p>The server is currently unavailable. Please try again later.</p>
        <button className="retry-button">Retry Connection</button>
      </div>
    </div>
  );
}
