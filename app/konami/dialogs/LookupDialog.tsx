"use client";
import "../konami.scss";
import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  animate: string;
  imgSrc: string;
  aspectRatio: string;
};

export default function LookupDialog({ animate, imgSrc, aspectRatio }: Props) {
  const [aspectRatioClass, setAspectRatioClass] =
    useState("custom-logo-banner");
  //add switch for different aspect ratios

  useEffect(() => {
    switch (aspectRatio) {
      case "wide":
        setAspectRatioClass("custom-logo-wide");
        break;
      case "portrait":
        setAspectRatioClass("custom-logo-portrait");
        break;
      case "classic":
        setAspectRatioClass("custom-logo-classic");
        break;
      case "banner":
        setAspectRatioClass("custom-logo-banner");
        break;
      case "square":
        setAspectRatioClass("custom-logo-square");
        break;
      default:
        setAspectRatioClass("custom-logo-classic"); // Fallback class
        break;
    }
  }, [aspectRatio]);

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <Image
            src={imgSrc}
            width={350}
            height={200}
            alt={`OTMS Logo`}
            className={`logo ${aspectRatioClass}`}
          />
          <h2>Player Account Lookup</h2>
        </div>
        <div className="custom-dialog-content">
          <p>Please select how you want to look up your account:</p>
          <div className="lookup-options">
            <button className="lookup-button">Swipe Card</button>
            <button className="lookup-button">Phone Number</button>
            <button className="lookup-button">Patron ID</button>
          </div>
        </div>
        <div className="custom-dialog-actions">
          <button className="dialog-button cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
