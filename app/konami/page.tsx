"use client";
import "./konami.scss";
import { useState, useEffect } from "react";

import LookupDialog from "./dialogs/LookupDialog";
import LookupInputDialog from "./dialogs/LookupInputDialog";
import LookupResultDialog from "./dialogs/LookupResultDialog";
import ErrorDialog from "./dialogs/ErrorDialog";
import PinInputDialog from "./dialogs/PinInputDialog";
import TimeoutDialog from "./dialogs/TimeoutDialog";

import VariableBox from "../../components/VariableBox";
import Link from "next/link";

type Props = {};

export default function Konami({}: Props) {
  // State to track which dialog is active
  const [activeDialog, setActiveDialog] = useState<string | null>(
    "LookupDialog"
  );

  const [cycle, setCycle] = useState(true);
  // Store cycleSpeed in seconds
  const [cycleSpeed, setCycleSpeed] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [baseScale, setBaseScale] = useState(0.7);
  const [scale, setScale] = useState(baseScale);
  const [uploadedImage, setUploadedImage] = useState<string>("/OTMSLogo.png");
  const [aspectRatio, setAspectRatio] = useState("banner");

  // Base and current colors
  const [baseBackgroundColor, setBaseBackgroundColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState(baseBackgroundColor);

  const [baseAccentColor, setBaseAccentColor] = useState("grey");
  const [accentColor, setAccentColor] = useState(baseAccentColor);

  const [baseTextColor, setBaseTextColor] = useState("grey");
  const [textColor, setTextColor] = useState(baseTextColor);

  const [baseButtonBackground, setBaseButtonBackground] = useState(
    "linear-gradient(145deg, #ff6b81, #e63946)"
  );
  const [buttonBackground, setButtonBackground] =
    useState(baseButtonBackground);

  const [baseButtonHoverBackground, setBaseButtonHoverBackground] = useState(
    "linear-gradient(145deg, #ff1744, #ff5252)"
  );
  const [buttonHoverBackground, setButtonHoverBackground] = useState(
    baseButtonHoverBackground
  );

  const [baseButtonActiveBackground, setBaseButtonActiveBackground] = useState(
    "linear-gradient(145deg, #ff6b81, #e63946)"
  );
  const [buttonActiveBackground, setButtonActiveBackground] = useState(
    baseButtonActiveBackground
  );

  const [baseButtonBorderColor, setBaseButtonBorderColor] = useState("#ff1744");
  const [buttonBorderColor, setButtonBorderColor] = useState(
    baseButtonBorderColor
  );

  const [baseButtonTextColor, setBaseButtonTextColor] = useState("#ffffff");
  const [buttonTextColor, setButtonTextColor] = useState(baseButtonTextColor);

  const [baseShadowColor, setBaseShadowColor] = useState(
    "rgba(255, 23, 68, 0.3)"
  );
  const [shadowColor, setShadowColor] = useState(baseShadowColor);

  // New gradient-related states
  const [isGradientSelected, setIsGradientSelected] = useState(false);

  useEffect(() => {
    // wait 3 seconds before showing settings
    setTimeout(() => {
      setShowSettings(true);
    }, 3000);
  }, []);

  // Apply variables to root
  useEffect(() => {
    const root = document.documentElement;

    const colorVariables = {
      "--accent-color": accentColor,
      "--background-color": isGradientSelected
        ? root.style.getPropertyValue("--background-color")
        : backgroundColor,
      "--button-active-background": buttonActiveBackground,
      "--button-background": buttonBackground,
      "--button-border-color": buttonBorderColor,
      "--button-hover-background": buttonHoverBackground,
      "--button-text-color": buttonTextColor,
      "--shadow-color": shadowColor,
      "--text-color": textColor,
      "--scale": scale,
    };

    const allColorsAreSet = Object.values(colorVariables).every(
      (color) => color !== "default"
    );

    if (allColorsAreSet && !isGradientSelected) {
      Object.entries(colorVariables).forEach(([variable, value]) => {
        root.style.setProperty(variable, value.toString());
      });
    }
  }, [
    accentColor,
    backgroundColor,
    buttonActiveBackground,
    buttonBackground,
    buttonBorderColor,
    buttonHoverBackground,
    shadowColor,
    textColor,
    buttonTextColor,
    isGradientSelected,
    scale,
  ]);

  // Array of dialog names to cycle through
  const dialogNames = [
    "LookupDialog",
    "LookupInputDialog",
    "LookupResultDialog",
    "ErrorDialog",
    "PinInputDialog",
    "TimeoutDialog",
  ];

  // Index to track which dialog is currently being displayed
  const [dialogIndex, setDialogIndex] = useState<number>(0);

  // Function to switch the active dialog
  const openDialog = (dialogName: string) => {
    setActiveDialog(dialogName);
    setCycle(false);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  // Rotate dialogs automatically
  useEffect(() => {
    if (!cycle) return; // Exit early if cycle is false

    // Convert cycleSpeed (in seconds) to milliseconds
    const intervalDuration = cycleSpeed * 1000;

    setDialogIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % dialogNames.length;
      setActiveDialog(dialogNames[nextIndex]);
      return nextIndex;
    });

    const intervalId = setInterval(() => {
      setDialogIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % dialogNames.length;
        setActiveDialog(dialogNames[nextIndex]);
        return nextIndex;
      });
    }, intervalDuration); // Use user-defined interval

    return () => clearInterval(intervalId);
  }, [cycle, cycleSpeed]);

  return (
    <div className="konami-container">
      <div className="dialog-display-container">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="settings-button gradient-button animate"
        >
          Settings
        </button>

        <div
          className={`settings-container ${
            showSettings ? "animate-down" : "animate-up"
          }`}
        >
          {/* Cycle Speed Slider */}
          <div className="setting-option">
            <label htmlFor="cycle-speed">
              Cycle Speed ({cycleSpeed} second{cycleSpeed > 1 ? "s" : ""})
            </label>
            <input
              id="cycle-speed"
              type="range"
              min="1"
              max="30"
              value={cycleSpeed}
              onChange={(e) => setCycleSpeed(Number(e.target.value))}
            />
          </div>

          {/* Scale Slider */}
          <div className="setting-option">
            <label htmlFor="scale">Scale ({scale.toFixed(2)})</label>
            <input
              id="scale"
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <br />
          {/* Image Upload */}
          <div className="setting-option ">
            <label htmlFor="image-upload">Logo: </label>
            <input
              id="image-upload"
              className="img-option"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () =>
                    setUploadedImage(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <div className="setting-option">
            <label htmlFor="aspect-ratio">Aspect Ratio: </label>
            <select
              id="aspect-ratio"
              className="aspect-ratio-dropdown"
              onChange={(e) => {
                setAspectRatio(e.target.value);
                console.log("Selected aspect ratio:", e.target.value);
              }}
            >
              <option value="wide">Wide</option>
              <option value="portrait">Portrait</option>
              <option value="classic">Classic</option>
              <option value="banner">Banner</option>
              <option value="square">Square</option>
            </select>
          </div>
        </div>

        {activeDialog === "LookupDialog" && (
          <LookupDialog
            aspectRatio={aspectRatio}
            imgSrc={uploadedImage}
            animate="true"
          />
        )}
        {activeDialog === "LookupInputDialog" && (
          <LookupInputDialog animate="true" />
        )}
        {activeDialog === "LookupResultDialog" && (
          <LookupResultDialog animate="true" />
        )}
        {activeDialog === "ErrorDialog" && <ErrorDialog animate="true" />}
        {activeDialog === "PinInputDialog" && <PinInputDialog animate="true" />}
        {activeDialog === "TimeoutDialog" && <TimeoutDialog animate="true" />}
      </div>
      <div className="theme-picker-container">
        <div className="dialog-picker animate">
          <div className="dialog-switch-buttons">
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("LookupDialog")}
            >
              Lookup Dialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("LookupInputDialog")}
            >
              Lookup Input Dialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("LookupResultDialog")}
            >
              Lookup Result Dialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("ErrorDialog")}
            >
              Error Dialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("PinInputDialog")}
            >
              Pin Input Dialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("TimeoutDialog")}
            >
              Timeout Dialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => setCycle(true)}
            >
              Cycle Dialogs
            </button>
            <Link href="/" className="dialog-switch-button">
              Home
            </Link>
          </div>
        </div>

        <div className="theme-picker">
          {/* Background Color */}
          <VariableBox
            label="Background Color"
            variableName="background-color"
            baseColor={baseBackgroundColor}
            colorValue={backgroundColor}
            onColorChange={(val) => setBackgroundColor(val)}
            onBaseColorChange={(val) => setBaseBackgroundColor(val)}
          />

          {/* Accent Color */}
          <VariableBox
            label="Accent Color"
            variableName="accent-color"
            baseColor={baseAccentColor}
            colorValue={accentColor}
            onColorChange={(val) => setAccentColor(val)}
            onBaseColorChange={(val) => setBaseAccentColor(val)}
          />

          {/* Text Color */}
          <VariableBox
            label="Text Color"
            variableName="text-color"
            baseColor={baseTextColor}
            colorValue={textColor}
            onColorChange={(val) => setTextColor(val)}
            onBaseColorChange={(val) => setBaseTextColor(val)}
          />

          {/* Button Background */}
          <VariableBox
            label="Button Background"
            variableName="button-background"
            baseColor={baseButtonBackground}
            colorValue={buttonBackground}
            onColorChange={(val) => setButtonBackground(val)}
            onBaseColorChange={(val) => setBaseButtonBackground(val)}
          />

          {/* Button Hover Background */}
          <VariableBox
            label="Button Hover Background"
            variableName="button-hover-background"
            baseColor={baseButtonHoverBackground}
            colorValue={buttonHoverBackground}
            onColorChange={(val) => setButtonHoverBackground(val)}
            onBaseColorChange={(val) => setBaseButtonHoverBackground(val)}
          />

          {/* Button Active Background */}
          <VariableBox
            label="Button Active Background"
            variableName="button-active-background"
            baseColor={baseButtonActiveBackground}
            colorValue={buttonActiveBackground}
            onColorChange={(val) => setButtonActiveBackground(val)}
            onBaseColorChange={(val) => setBaseButtonActiveBackground(val)}
          />

          {/* Button Border Color */}
          <VariableBox
            label="Button Border Color"
            variableName="button-border-color"
            baseColor={baseButtonBorderColor}
            colorValue={buttonBorderColor}
            onColorChange={(val) => setButtonBorderColor(val)}
            onBaseColorChange={(val) => setBaseButtonBorderColor(val)}
          />

          {/* Button Text Color */}
          <VariableBox
            label="Button Text Color"
            variableName="button-text-color"
            baseColor={baseButtonTextColor}
            colorValue={buttonTextColor}
            onColorChange={(val) => setButtonTextColor(val)}
            onBaseColorChange={(val) => setBaseButtonTextColor(val)}
          />

          {/* Shadow Color */}
          <VariableBox
            label="Shadow Color"
            variableName="shadow-color"
            baseColor={baseShadowColor}
            colorValue={shadowColor}
            onColorChange={(val) => setShadowColor(val)}
            onBaseColorChange={(val) => setBaseShadowColor(val)}
          />
        </div>
      </div>
    </div>
  );
}
