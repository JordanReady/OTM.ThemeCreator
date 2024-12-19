"use client";
import React from "react";
import Image from "next/image";
import InterfaceCard from "../components/InterfaceCard";
import "./homepage.scss";

import "../app/konami/konami.scss";

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
      imageSrc: "/OSBThumbnail.png",
      link: "/orderStatusBoard",
      description:
        "The Order Status Board displays when orders are being prepared and ready to be picked up.",
    },
    {
      title: "Stay Kiosk",

      imageSrc: "/StayUnderDevelopmentImg.png",
      link: "/stay",
      description:
        "The Stay interface enables searching for player information by card, phone, or other identifiers.",
    },
  ];

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
          Select an Interface to begin customizing the theme!
        </p>
      </div>
      <div className="interface-card-container">
        <div className="spacer"></div>
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
