"use client";
import { useEffect } from "react";
import React from "react";
import Image from "next/image";
import InterfaceCard from "../components/InterfaceCard";
import "./homepage.scss";

export default function HomePage() {
  const KonamiImg = "./KonamiThumbnail.png";
  const interfaces = [
    {
      title: "Konami Kiosk",
      imageSrc: KonamiImg,
      link: "/konami",
      description:
        "The Konami interface allows users to look up player information and process payments using Konami player accounts.",
    },
    {
      title: "Order Status Board",
      imageSrc: "/OSBThumbnail1.png",
      link: "/orderStatusBoard",
      description:
        "The Order Status Board displays when orders are being prepared and ready to be picked up.",
    },
    {
      title: "Aristocrat Kiosk",
      imageSrc: "/AristocratThumbnail.png",
      link: "/aristocrat",
      description:
        "The Aristocrat interface allows users to look up player information and process payments using Aristocrat player accounts.",
    },
    {
      title: "Stay Kiosk",

      imageSrc: "/StayUnderDevelopmentImg.png",
      link: "/stay",
      description:
        "The Stay interface enables searching for player information by card, phone, or other identifiers.",
    },
  ];

  useEffect(() => {
    const root = document.documentElement;

    const colorVariables = {
      "--accent-color": "grey",
      "--background-color": "white",
      "--button-active-background": "#e83e8c",
      "--button-background": "#ffa500",
      "--border-color": "#800080",
      "--button-hover-background": "linear-gradient(145deg, #FF1744, #FF5252)",
      "--button-text-color": "#ff0000",
      "--shadow-color": "#808080",
      "--text-color": "grey",
      "--scale": 0.7,
    };

    const allColorsAreSet = Object.values(colorVariables).every(
      (color) => color !== "default"
    );
  }, []);

  return (
    <div className="homepage">
      <div className="theme-creator-container welcome-container">
        <Image
          src={"/OTMSLogo.png"}
          width={350}
          height={200}
          alt={`OTMS Logo`}
          className="logo animate"
        />
        <h1 className="page-title animate">Welcome to OTMS Theme Creator</h1>
        <p className="page-subtitle animate">
          Select an Interface to begin customizing your theme!
        </p>
      </div>
      <div className="spacer"></div>
      <div className="interface-card-container">
        {interfaces.map((interfaceData, index) => (
          <InterfaceCard
            key={index}
            title={interfaceData.title}
            link={interfaceData.link}
            imageSrc={interfaceData.imageSrc}
            description={interfaceData.description}
          />
        ))}
      </div>
    </div>
  );
}
