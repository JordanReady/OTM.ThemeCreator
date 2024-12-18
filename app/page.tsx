"use client";
import React from "react";
import Image from "next/image";
import InterfaceCard from "../components/InterfaceCard";
import "../components/interfaceCard.scss";
import "../app/konami/konami.scss";

export default function HomePage() {
  const KonamiImg = "./KonamiThumbnail.png";
  const interfaces = [
    {
      title: "Konami",
      imageSrc: KonamiImg,
      description:
        "The Konami interface allows users to look up player information and process payments using Konami player accounts.",
    },
    {
      title: "Stay",
      imageSrc: "/StayUnderDevelopmentImg.png",
      description:
        "The Stay interface enables searching for player information by card, phone, or other identifiers.",
    },
  ];

  return (
    <div className="homepage">
      <Image
        src={"/OTMSLogo.png"}
        width={350}
        height={200}
        alt={`OTMS Logo`}
        className="logo animate"
      />
      <div className="theme-creator-container">
        <h1 className="page-title animate">Welcome to OTMS Theme Creator</h1>
        <p className="page-subtitle animate">
          Select an Interface to begin customizing the theme!
        </p>
        <div className="interface-card-container">
          {interfaces.map((interfaceData, index) => (
            <InterfaceCard
              key={index}
              title={interfaceData.title}
              imageSrc={interfaceData.imageSrc}
              description={interfaceData.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
