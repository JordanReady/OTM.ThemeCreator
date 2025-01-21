"use client";
import React from "react";
import UserButton from "@/components/UserButton";
import OSBDisplay3 from "../orderStatusBoard/dialogs/OSBDisplay3";
import OSBDisplay4 from "../orderStatusBoard/dialogs/OSBDisplay4";
import OSBDisplay5 from "../orderStatusBoard/dialogs/OSBDisplay5";
import Logo from "/OTMSLogo.png";
import "../orderStatusBoard/dialogs/OSBDisplay4.scss";

export default function TestingPage() {
  return (
    <div className="testing animate">
      {/* <OSBDisplay3
        imgSrc={"uploadedImage"}
        aspectRatio={"aspectRatioClass"}
        pos={0}
        prepIconSrc="/PrepLogo.png"
        readyIconSrc="/OrderReady.png"
        groupLogos={{
          Grill: "/OTMSGrillLogo.png",
          Bakery: "/OTMSBakeryLogo.png",
          Drinks: "/OTMSDrinksLogo.png",
        }}
      /> */}
      {/* <OSBDisplay4 /> */}
      <OSBDisplay5 />
    </div>
  );
}
