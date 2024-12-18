"use client";
import React from "react";
import "./interfaceCard.scss";
import Link from "next/link";

interface InterfaceCardProps {
  title: string;
  imageSrc?: string;
  description: string;
  link?: string;
}

export default function InterfaceCard({
  title,
  imageSrc,
  description,
  link,
}: InterfaceCardProps) {
  return (
    <Link href={`${link}`} className="interface-card animate">
      <h2 className="interface-title ">{title}</h2>
      <img
        src={imageSrc}
        alt={`${title} interface`}
        className="interface-image"
      />

      <p className="interface-description">{description}</p>
    </Link>
  );
}
