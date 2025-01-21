// OSBDialogDisplay.tsx

"use client";

import React, { useEffect, useState } from "react";
import OSBDisplay1 from "@/app/orderStatusBoard/dialogs/OSBDisplay1";
import OSBDisconnected from "@/app/orderStatusBoard/dialogs/OSBDisconnected";
import OSBDisplay2 from "@/app/orderStatusBoard/dialogs/OSBDisplay2";
import OSBDisplay3 from "@/app/orderStatusBoard/dialogs/OSBDisplay3";
import { getOSBDisconnectedHtml } from "./OSBDisconnectedHtml";
import { getOSBDisplay1Html } from "./OSBDisplay1Html";
import { getOSBDisplay2Html } from "./OSBDisplay2Html";
import { getOSBDisplay3Html } from "./OSBDisplay3Html";

type Order = {
  CheckNumber: number;
  StatusId: number; // 1 for prepping, 2 for ready
  CheckTextId: string;
};

type Props = {
  activeDialog: string | null;
  aspectRatioClass: string;
  uploadedImage: string;
  setActiveDialog: (activeDialog: string) => void;
  pos: number;
  componentHtml: string;
  setComponentHtml: (componentHtml: string) => void;
  backgroundColor: string;
  boxBackgroundColor: string;
  accentColor: string;
  textColor: string;
  buttonBackground: string;
  buttonHoverBackground: string;
  buttonActiveBackground: string;
  borderColor: string;
  buttonTextColor: string;
  shadowColor: string;
  showHtml: boolean;
  disconnectedImgAspectRatio: string;
  disconnectedImg: string;
  imageRight: string;
  imageLeft: string;
  imageCenter: string;
  threeImageAspectRatio: string;
};

export default function DialogDisplay({
  activeDialog,
  aspectRatioClass,
  pos,
  uploadedImage,
  setActiveDialog,
  componentHtml,
  setComponentHtml,
  backgroundColor,
  boxBackgroundColor,
  accentColor,
  textColor,
  buttonBackground,
  buttonHoverBackground,
  buttonActiveBackground,
  borderColor,
  buttonTextColor,
  shadowColor,
  showHtml,
  disconnectedImgAspectRatio,
  disconnectedImg,
  imageRight,
  imageLeft,
  imageCenter,
  threeImageAspectRatio,
}: Props) {
  const [orders, setOrders] = useState<Order[]>([
    // Preparing Orders (StatusId=1)
    { CheckNumber: 121, StatusId: 1, CheckTextId: "Fred Johnson" },
    { CheckNumber: 122, StatusId: 1, CheckTextId: "Alice Smith" },
    { CheckNumber: 124, StatusId: 1, CheckTextId: "Mary Adams" },

    // Ready Orders (StatusId=2)
    { CheckNumber: 201, StatusId: 2, CheckTextId: "Steven Wilson" },
    { CheckNumber: 202, StatusId: 2, CheckTextId: "Margaret Taylor" },
  ]);

  // Set default active dialog on mount
  useEffect(() => {
    if (!activeDialog) {
      setActiveDialog("OSBDisplay1");
    }
  }, [activeDialog, setActiveDialog]);

  // Helper function to generate HTML based on activeDialog
  const generateComponentHtml = () => {
    switch (activeDialog) {
      case "OSBDisplay1":
        return getOSBDisplay1Html(
          uploadedImage, // imgSrc
          aspectRatioClass, // aspectRatio: 'square', 'wide', 'portrait', 'classic', 'banner'
          backgroundColor, // backgroundColor
          boxBackgroundColor, // boxBackgroundColor
          accentColor, // accentColor
          buttonBackground, // buttonBackground
          buttonHoverBackground, // buttonHoverBackground
          buttonActiveBackground, // buttonActiveBackground
          borderColor, // borderColor
          buttonTextColor, // buttonTextColor
          shadowColor, // shadowColor
          textColor, // textColor
          "OTMThemeOSB.html", // retryUrl (if applicable)
          "1" // scale (optional)
          // Add any other required parameters specific to OSBDisplay1Html
        );
      case "OSBDisplay2":
        // Ensure getOSBDisplay2Html is implemented similarly to getOSBDisplay1Html
        // return getOSBDisplay2Html(...);
        // Placeholder for OSBDisplay2 HTML generation
        return getOSBDisplay2Html(
          uploadedImage, // imgSrc
          aspectRatioClass, // aspectRatio: 'square', 'wide', 'portrait', 'classic', 'banner'
          backgroundColor, // backgroundColor
          boxBackgroundColor, // boxBackgroundColor
          accentColor, // accentColor
          buttonBackground, // buttonBackground
          buttonHoverBackground, // buttonHoverBackground
          buttonActiveBackground, // buttonActiveBackground
          borderColor, // borderColor
          buttonTextColor, // buttonTextColor
          shadowColor, // shadowColor
          textColor, // textColor
          "OTMThemeOSB.html", // retryUrl (if applicable)
          "1" // scale (optional)
          // Add any other required parameters specific to OSBDisplay1Html
        );
      case "OSBDisplay3":
        // Ensure getOSBDisplay2Html is implemented similarly to getOSBDisplay1Html
        // return getOSBDisplay2Html(...);
        // Placeholder for OSBDisplay2 HTML generation
        return getOSBDisplay3Html(
          uploadedImage, // imgSrc
          aspectRatioClass, // aspectRatio: 'square', 'wide', 'portrait', 'classic', 'banner'
          backgroundColor, // backgroundColor
          boxBackgroundColor, // boxBackgroundColor
          accentColor, // accentColor
          buttonBackground, // buttonBackground
          buttonHoverBackground, // buttonHoverBackground
          buttonActiveBackground, // buttonActiveBackground
          borderColor, // borderColor
          buttonTextColor, // buttonTextColor
          shadowColor, // shadowColor
          textColor, // textColor
          "OTMThemeOSB.html", // retryUrl (if applicable)
          "1" // scale (optional)
          // Add any other required parameters specific to OSBDisplay1Html
        );
      case "OSBDisconnected":
        return getOSBDisconnectedHtml(
          "/images/ServerDisconnected.png", // imgSrc
          disconnectedImgAspectRatio, // aspectRatio: 'square', 'wide', 'portrait', 'classic', 'banner'
          backgroundColor, // backgroundColor
          boxBackgroundColor, // boxBackgroundColor
          accentColor, // accentColor
          buttonBackground, // buttonBackground
          buttonHoverBackground, // buttonHoverBackground
          buttonActiveBackground, // buttonActiveBackground
          borderColor, // borderColor
          buttonTextColor, // buttonTextColor
          shadowColor, // shadowColor
          textColor, // textColor
          "OTMThemeOSB.html", // retryUrl (optional)
          "1" // scale (optional)
        );
      default:
        return "<!-- Unknown dialog type -->";
    }
  };

  // Update componentHtml whenever relevant props or activeDialog change
  useEffect(() => {
    if (activeDialog) {
      const htmlString = generateComponentHtml();
      setComponentHtml(htmlString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeDialog,
    aspectRatioClass,
    uploadedImage,
    backgroundColor,
    accentColor,
    textColor,
    buttonBackground,
    buttonHoverBackground,
    buttonActiveBackground,
    borderColor,
    buttonTextColor,
    shadowColor,
    // Add other dependencies if necessary
  ]);

  return (
    <>
      {activeDialog === "OSBDisplay1" && (
        <>
          {showHtml ? (
            <div className="html-container custom-dialog-backdrop">
              <span>
                <h2>Display 1</h2>
                <button
                  className="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(componentHtml);
                  }}
                >
                  Copy
                </button>
                <pre>{componentHtml}</pre>
                {/* If you want to render the HTML, you can use dangerouslySetInnerHTML */}
                {/* <div dangerouslySetInnerHTML={{ __html: componentHtml }} /> */}
              </span>
            </div>
          ) : (
            <OSBDisplay1
              imgSrc={uploadedImage}
              aspectRatio={aspectRatioClass}
              pos={pos}
              orders={orders}
              prepIconSrc="/PrepLogo.png"
              readyIconSrc="/OrderReady.png"
            />
          )}
        </>
      )}
      {activeDialog === "OSBDisplay2" && (
        <>
          {showHtml ? (
            <div className="html-container custom-dialog-backdrop">
              <span>
                <h2>Display 2</h2>
                <button
                  className="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(componentHtml);
                  }}
                >
                  Copy
                </button>
                <pre>{componentHtml}</pre>
                {/* Render OSBDisplay2 HTML if getOSBDisplay2Html is implemented */}
                {/* <div dangerouslySetInnerHTML={{ __html: componentHtml }} /> */}
              </span>
            </div>
          ) : (
            <OSBDisplay2
              imgSrc={uploadedImage}
              aspectRatio={aspectRatioClass}
              pos={pos}
              orders={orders}
              prepIconSrc="/PrepLogo.png"
              readyIconSrc="/OrderReady.png"
            />
          )}
        </>
      )}
      {activeDialog === "OSBDisplay3" && (
        <>
          {showHtml ? (
            <div className="html-container custom-dialog-backdrop">
              <span>
                <h2>Display 3</h2>
                <button
                  className="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(componentHtml);
                  }}
                >
                  Copy
                </button>
                <pre>{componentHtml}</pre>
                {/* Render OSBDisplay3 HTML if getOSBDisplay3Html is implemented */}
                {/* <div dangerouslySetInnerHTML={{ __html: componentHtml }} /> */}
              </span>
            </div>
          ) : (
            <OSBDisplay3
              imgSrc={uploadedImage}
              aspectRatio={aspectRatioClass}
              pos={pos}
              prepIconSrc="/PrepLogo.png"
              readyIconSrc="/OrderReady.png"
              threeImageAspectRatio={threeImageAspectRatio}
              groupLogos={{
                Grill: imageLeft,
                Bakery: imageCenter,
                Drinks: imageRight,
              }}
            />
          )}
        </>
      )}
      {activeDialog === "OSBDisconnected" && (
        <>
          {showHtml ? (
            <div className="html-container custom-dialog-backdrop">
              <span>
                <h2>Server Disconnected</h2>
                <button
                  className="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(componentHtml);
                  }}
                >
                  Copy
                </button>
                <pre>{componentHtml}</pre>
                {/* <div dangerouslySetInnerHTML={{ __html: componentHtml }} /> */}
              </span>
            </div>
          ) : (
            <OSBDisconnected
              imgSrc={disconnectedImg}
              aspectRatio={disconnectedImgAspectRatio}
              pos={pos}
            />
          )}
        </>
      )}
    </>
  );
}
