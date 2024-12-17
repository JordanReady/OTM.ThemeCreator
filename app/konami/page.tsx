"use client";
import "./konami.scss";
import { useState, useEffect } from "react";

import LookupDialog from "./dialogs/LookupDialog";
import LookupInputDialog from "./dialogs/LookupInputDialog";
import LookupResultDialog from "./dialogs/LookupResultDialog";
import ErrorDialog from "./dialogs/ErrorDialog";
import PinInputDialog from "./dialogs/PinInputDialog";
import TimeoutDialog from "./dialogs/TimeoutDialog";
import SettingsDisplay from "@/components/SettingsDisplay";
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
  const [pos, setPos] = useState(0);

  const handleSliderChange = (event: { target: { value: any } }) => {
    setPos(Number(event.target.value)); // Update position as a number
  };

  useEffect(() => {
    console.log("pos:", pos);
  }, [pos]);

  const [aspectRatioClass, setAspectRatioClass] =
    useState("custom-logo-banner");

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

  const [importTheme, setImportTheme] = useState(false);
  const [importedTheme, setImportedTheme] = useState("");

  const handleThemeSubmit = (event: string) => {
    // List of variable names to extract
    const variableExtractors = [
      {
        key: "backgroundColor",
        setter: setBaseBackgroundColor,
        setter2: setBackgroundColor,
      },
      {
        key: "accentColor",
        setter: setBaseAccentColor,
        setter2: setAccentColor,
      },
      { key: "textColor", setter: setBaseTextColor, setter2: setTextColor },
      {
        key: "buttonBackground",
        setter: setBaseButtonBackground,
        setter2: setButtonBackground,
      },
      {
        key: "buttonHoverBackground",
        setter: setBaseButtonHoverBackground,
        setter2: setButtonHoverBackground,
      },
      {
        key: "buttonActiveBackground",
        setter: setBaseButtonActiveBackground,
        setter2: setButtonActiveBackground,
      },
      {
        key: "buttonBorderColor",
        setter: setBaseButtonBorderColor,
        setter2: setButtonBorderColor,
      },
      {
        key: "buttonTextColor",
        setter: setBaseButtonTextColor,
        setter2: setButtonTextColor,
      },
      {
        key: "shadowColor",
        setter: setBaseShadowColor,
        setter2: setShadowColor,
      },
    ];

    variableExtractors.forEach(({ key, setter, setter2 }) => {
      const regex = new RegExp(`"${key}":\\s*"(.*?)"`, "i"); // Regex to extract value
      const match = event.match(regex);
      if (match && match[1]) {
        setter(match[1]); // Update the base color
        setter2(match[1]); // Update the active color
        console.log(`Updated ${key} to`, match[1]); // Log for debugging
      }
    });

    setImportedTheme(event); // Store the full imported theme as a string
    setImportTheme(false); // Close the input
  };

  const exportTheme = () => {
    const customTheme = {
      backgroundColor: backgroundColor,
      accentColor: accentColor,
      textColor: textColor,
      buttonBackground: buttonBackground,
      buttonHoverBackground: buttonHoverBackground,
      buttonActiveBackground: buttonActiveBackground,
      buttonBorderColor: buttonBorderColor,
      buttonTextColor: buttonTextColor,
      shadowColor: shadowColor,
    };

    // Wrap it with CustomTheme and pretty-print it
    const formattedTheme = JSON.stringify(
      { CustomTheme: customTheme },
      null,
      2
    );

    // Remove leading and trailing curly braces from the entire JSON string
    const trimmedTheme = formattedTheme.slice(1, -1).trim(); // Remove first and last characters (braces)

    // Add the trailing comma to the end
    const finalTheme = `${trimmedTheme},`; // Add a comma at the end

    console.log("Exported Theme:", finalTheme);
    navigator.clipboard
      .writeText(finalTheme) // Copy to clipboard
      .then(() => console.log("Theme copied to clipboard!"))
      .catch((err) => console.error("Failed to copy theme to clipboard", err));
  };

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
        <SettingsDisplay
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          importTheme={importTheme}
          setImportTheme={setImportTheme}
          exportTheme={exportTheme}
          cycleSpeed={cycleSpeed}
          setCycleSpeed={setCycleSpeed}
          scale={scale}
          setScale={setScale}
          pos={pos}
          handleSliderChange={handleSliderChange}
          setUploadedImage={setUploadedImage}
          setAspectRatio={setAspectRatio}
          importedTheme={importedTheme}
          handleThemeSubmit={handleThemeSubmit}
        />

        {activeDialog === "LookupDialog" && (
          <LookupDialog
            aspectRatio={aspectRatioClass}
            imgSrc={uploadedImage}
            animate="true"
            pos={pos}
          />
        )}
        {activeDialog === "LookupInputDialog" && (
          <LookupInputDialog animate="true" pos={pos} />
        )}
        {activeDialog === "LookupResultDialog" && (
          <LookupResultDialog animate="true" pos={pos} />
        )}
        {activeDialog === "ErrorDialog" && (
          <ErrorDialog animate="true" pos={pos} />
        )}
        {activeDialog === "PinInputDialog" && (
          <PinInputDialog animate="true" pos={pos} />
        )}
        {activeDialog === "TimeoutDialog" && (
          <TimeoutDialog animate="true" pos={pos} />
        )}
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
            allowGradient={true}
            label="Background Color"
            variableName="background-color"
            baseColor={baseBackgroundColor}
            colorValue={backgroundColor}
            onColorChange={(val) => setBackgroundColor(val)}
            onBaseColorChange={(val) => setBaseBackgroundColor(val)}
          />

          {/* Accent Color */}
          <VariableBox
            allowGradient={false}
            label="Accent Color"
            variableName="accent-color"
            baseColor={baseAccentColor}
            colorValue={accentColor}
            onColorChange={(val) => setAccentColor(val)}
            onBaseColorChange={(val) => setBaseAccentColor(val)}
          />

          {/* Text Color */}
          <VariableBox
            allowGradient={false}
            label="Text Color"
            variableName="text-color"
            baseColor={baseTextColor}
            colorValue={textColor}
            onColorChange={(val) => setTextColor(val)}
            onBaseColorChange={(val) => setBaseTextColor(val)}
          />

          {/* Button Background */}
          <VariableBox
            allowGradient={true}
            label="Button Background"
            variableName="button-background"
            baseColor={baseButtonBackground}
            colorValue={buttonBackground}
            onColorChange={(val) => setButtonBackground(val)}
            onBaseColorChange={(val) => setBaseButtonBackground(val)}
          />

          {/* Button Hover Background */}
          <VariableBox
            allowGradient={true}
            label="Button Hover Background"
            variableName="button-hover-background"
            baseColor={baseButtonHoverBackground}
            colorValue={buttonHoverBackground}
            onColorChange={(val) => setButtonHoverBackground(val)}
            onBaseColorChange={(val) => setBaseButtonHoverBackground(val)}
          />

          {/* Button Active Background */}
          <VariableBox
            allowGradient={true}
            label="Button Active Background"
            variableName="button-active-background"
            baseColor={baseButtonActiveBackground}
            colorValue={buttonActiveBackground}
            onColorChange={(val) => setButtonActiveBackground(val)}
            onBaseColorChange={(val) => setBaseButtonActiveBackground(val)}
          />

          {/* Button Border Color */}
          <VariableBox
            allowGradient={false}
            label="Button Border Color"
            variableName="button-border-color"
            baseColor={baseButtonBorderColor}
            colorValue={buttonBorderColor}
            onColorChange={(val) => setButtonBorderColor(val)}
            onBaseColorChange={(val) => setBaseButtonBorderColor(val)}
          />

          {/* Button Text Color */}
          <VariableBox
            allowGradient={false}
            label="Button Text Color"
            variableName="button-text-color"
            baseColor={baseButtonTextColor}
            colorValue={buttonTextColor}
            onColorChange={(val) => setButtonTextColor(val)}
            onBaseColorChange={(val) => setBaseButtonTextColor(val)}
          />

          {/* Shadow Color */}
          <VariableBox
            allowGradient={false}
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
