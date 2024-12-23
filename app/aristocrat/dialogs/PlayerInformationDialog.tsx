"use client";
import React from "react";
import "../aristocrat.scss";
import Image from "next/image";

type Props = {
  animate: string;
  imgSrc: string;
  aspectRatio: string;
  pos: number;
  playerImgSrc: string;
  playerImgScale: number;
};

export default function PlayerInformation({
  pos,
  animate,
  imgSrc,
  aspectRatio,
  playerImgSrc,
  playerImgScale,
}: Props) {
  const handleOkay = () => {
    console.log("Okay button clicked");
    // Add any desired logic for "Okay"
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    // Add any desired logic for "Cancel"
  };

  const scaleClass = `scale-${playerImgScale}`;

  return (
    <div className={`custom-dialog-backdrop margin-${pos}`}>
      <div
        className={`player-information ${animate === "true" ? "animate" : ""}`}
      >
        <Image
          src={imgSrc}
          width={350}
          height={200}
          alt="OTMS Logo"
          className={`animate logo custom-logo-${aspectRatio}`}
        />
        <h1>Player Information</h1>

        <div className="player-info">
          <div className="display">
            <div className="info-col animate-down">
              <p>
                <strong>Name:</strong> Chip Stackwell
              </p>
              <p>
                <strong>Status:</strong> Active
              </p>
              <p>
                <strong>Level:</strong> Gold
              </p>
              <br />
              <p>
                <strong>Points Balance:</strong> $500.13
              </p>
              <p>
                <strong>Comp Balance:</strong> $312.74
              </p>
            </div>
            <Image
              src={playerImgSrc}
              width={200}
              height={200}
              alt="Player Logo"
              className={`animate-down player-logo custom-player-logo-${aspectRatio} ${scaleClass}`}
            />
          </div>
        </div>

        <div className="buttons-container">
          <button className="btn" onClick={handleOkay}>
            Okay
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
