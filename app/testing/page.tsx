import React from "react";
import PlayerInformation from "@/app/aristocrat/dialogs/PlayerInformationDialog";

export default function TestingPage() {
  return (
    <div className="testing animate">
      <h2>Testing</h2>
      <PlayerInformation
        playerImgScale="1.5"
        pos={1}
        animate="true"
        imgSrc="/OTMSLogo.png"
        playerImgSrc="/Chippy.png"
        aspectRatio="Banner"
      />
    </div>
  );
}
