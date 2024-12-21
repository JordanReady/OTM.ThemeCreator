"use client";
import OSBDisplay1 from "@/app/orderStatusBoard/dialogs/OSBDisplay1";
import OSBDisconnected from "@/app/orderStatusBoard/dialogs/OSBDisconnected";
import OSBDisplay2 from "@/app/orderStatusBoard/dialogs/OSBDisplay2";
import { useEffect } from "react";

type Props = {
  activeDialog: string | null;
  aspectRatioClass: string;
  uploadedImage: string;
  setActiveDialog: (activeDialog: string) => void;
  pos: number;
};

export default function DialogDisplay({
  activeDialog,
  aspectRatioClass,
  pos,
  uploadedImage,
  setActiveDialog,
}: Props) {
  useEffect(() => {
    console.log("activeDialog:", activeDialog);
  }, [activeDialog]);

  useEffect(() => {
    setActiveDialog("OSBDisplay1");
  }, []);

  const orders = [
    // Preparing Orders (StatusId=1)
    { CheckNumber: 121, StatusId: 1, CheckTextId: "Fred Johnson" },
    { CheckNumber: 122, StatusId: 1, CheckTextId: "Alice Smith" },
    { CheckNumber: 124, StatusId: 1, CheckTextId: "Mary Adams" },

    // Ready Orders (StatusId=2)
    { CheckNumber: 201, StatusId: 2, CheckTextId: "Steven Wilson" },
    { CheckNumber: 202, StatusId: 2, CheckTextId: "Margaret Taylor" },
  ];
  return (
    <>
      {activeDialog === "OSBDisplay1" && (
        <OSBDisplay1
          imgSrc={uploadedImage}
          aspectRatio={aspectRatioClass}
          pos={pos}
          orders={orders}
          prepIconSrc="/PrepLogo.png"
          readyIconSrc="/OrderReady.png"
        />
      )}
      {activeDialog === "OSBDisplay2" && (
        <OSBDisplay2
          imgSrc={uploadedImage}
          aspectRatio={aspectRatioClass}
          pos={pos}
          orders={orders}
          prepIconSrc="/PrepLogo.png"
          readyIconSrc="/OrderReady.png"
        />
      )}
      {activeDialog === "OSBDisconnected" && (
        <OSBDisconnected
          imgSrc="/ServerDisconnected.png"
          aspectRatio={aspectRatioClass}
          pos={pos}
        />
      )}
    </>
  );
}
