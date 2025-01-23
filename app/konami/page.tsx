"use client";
import "./konami.scss";
import { useState, useEffect } from "react";
import SettingsDisplay from "@/components/SettingsDisplay";
import ThemePickerDisplay from "@/components/ThemePickerDisplay";
import DialogDisplay from "@/components/KonamiDialogDisplay";
import TutorialDisplay from "@/components/TutorialDisplay";

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
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const handleTutorial = () => {
    setShowSettings(true);
    setShowTutorial(true); // Start the tutorial
    setTutorialStep(1); // Start with step 1
    setPos(-5);
  };

  const handleSliderChange = (event: { target: { value: any } }) => {
    setPos(Number(event.target.value)); // Update position as a number
  };

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
        key: "boxBackgroundColor",
        setter: setBaseBoxBackgroundColor,
        setter2: setBoxBackgroundColor,
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
        key: "borderColor",
        setter: setBaseBorderColor,
        setter2: setBorderColor,
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
      }
    });

    setImportedTheme(event); // Store the full imported theme as a string
    setImportTheme(false); // Close the input
  };

  const exportTheme = () => {
    const customTheme = {
      backgroundColor: backgroundColor,
      boxBackgroundColor: boxBackgroundColor,
      accentColor: accentColor,
      textColor: textColor,
      buttonBackground: buttonBackground,
      buttonHoverBackground: buttonHoverBackground,
      buttonActiveBackground: buttonActiveBackground,
      borderColor: borderColor,
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

  const [baseBoxBackgroundColor, setBaseBoxBackgroundColor] =
    useState("#ffffff");
  const [boxBackgroundColor, setBoxBackgroundColor] =
    useState(baseBackgroundColor);

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

  const [baseBorderColor, setBaseBorderColor] = useState("#ff1744");
  const [borderColor, setBorderColor] = useState(baseBorderColor);

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
      "--box-background-color": isGradientSelected
        ? root.style.getPropertyValue("--box-background-color")
        : boxBackgroundColor,
      "--button-active-background": buttonActiveBackground,
      "--button-background": buttonBackground,
      "--border-color": borderColor,
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
    boxBackgroundColor,
    buttonActiveBackground,
    buttonBackground,
    borderColor,
    buttonHoverBackground,
    shadowColor,
    textColor,
    buttonTextColor,
    isGradientSelected,
    scale,
  ]);

  // Array of dialog names to cycle through
  const dialogNames = [
    "LookupResultDialog",
    "LookupInputDialog",
    "LookupDialog",
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
    <div className="background">
      <div className="konami-container">
        <div className="dialog-display-container">
          <TutorialDisplay
            tutorialInterface={"Konami"}
            tutorialStep={tutorialStep}
            showTutorial={showTutorial}
            setTutorialStep={setTutorialStep}
            setShowTutorial={setShowTutorial}
            setActiveDialog={setActiveDialog}
            setCycle={setCycle}
            setShowSettings={setShowSettings}
          />
          <SettingsDisplay
            settingInterface={"Konami"}
            activeDialog={activeDialog}
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
            handleTutorial={handleTutorial}
            tutorialStep={tutorialStep}
            showTutorial={showTutorial}
            setCycle={setCycle}
            headingSize={0}
            setPlayerImgScale={setScale}
            handleHeadingSize={function (event: {
              target: { value: any };
            }): void {
              throw new Error("Function not implemented.");
            }}
            showHtml={false}
            setShowHtml={function (showHtml: boolean): void {
              throw new Error("Function not implemented.");
            }}
            setDisconnectedImgAspectRatio={function (
              disconnectedImgAspectRatio: string
            ): void {
              throw new Error("Function not implemented.");
            }}
            setDisconnectedImg={function (disconnectedImg: string): void {
              throw new Error("Function not implemented.");
            }}
            disconnectedImg=""
            setImageRight={function (imageRight: string): void {
              throw new Error("Function not implemented.");
            }}
            setImageLeft={function (imageLeft: string): void {
              throw new Error("Function not implemented.");
            }}
            setImageCenter={function (imageCenter: string): void {
              throw new Error("Function not implemented.");
            }}
            setThreeImageAspectRatio={function (
              threeImageAspectRatio: string
            ): void {
              throw new Error("Function not implemented.");
            }}
            aspectRatio={""}
          />
          <div className="display-box" onClick={() => setShowSettings(false)}>
            <DialogDisplay
              activeDialog={activeDialog}
              aspectRatioClass={aspectRatio}
              uploadedImage={uploadedImage}
              pos={pos}
            />
          </div>

          {/* Theme Picker Display*/}
          <ThemePickerDisplay
            interfaceName="Konami"
            openDialog={openDialog}
            setCycle={setCycle}
            baseBackgroundColor={baseBackgroundColor}
            backgroundColor={backgroundColor}
            baseBoxBackgroundColor={baseBoxBackgroundColor}
            boxBackgroundColor={boxBackgroundColor}
            setBoxBackgroundColor={setBoxBackgroundColor}
            baseAccentColor={baseAccentColor}
            setBaseBoxBackgroundColor={setBaseBoxBackgroundColor}
            accentColor={accentColor}
            baseTextColor={baseTextColor}
            textColor={textColor}
            setBaseBackgroundColor={setBaseBackgroundColor}
            setBackgroundColor={setBackgroundColor}
            setBaseAccentColor={setBaseAccentColor}
            setAccentColor={setAccentColor}
            setBaseTextColor={setBaseTextColor}
            setTextColor={setTextColor}
            baseButtonBackground={baseButtonBackground}
            buttonBackground={buttonBackground}
            baseButtonHoverBackground={baseButtonHoverBackground}
            buttonHoverBackground={buttonHoverBackground}
            baseButtonActiveBackground={baseButtonActiveBackground}
            buttonActiveBackground={buttonActiveBackground}
            baseBorderColor={baseBorderColor}
            borderColor={borderColor}
            baseButtonTextColor={baseButtonTextColor}
            buttonTextColor={buttonTextColor}
            setBaseButtonBackground={setBaseButtonBackground}
            setButtonBackground={setButtonBackground}
            setBaseButtonHoverBackground={setBaseButtonHoverBackground}
            setButtonHoverBackground={setButtonHoverBackground}
            setBaseButtonActiveBackground={setBaseButtonActiveBackground}
            setButtonActiveBackground={setButtonActiveBackground}
            setBaseBorderColor={setBaseBorderColor}
            setBorderColor={setBorderColor}
            setBaseButtonTextColor={setBaseButtonTextColor}
            setButtonTextColor={setButtonTextColor}
            baseShadowColor={baseShadowColor}
            shadowColor={shadowColor}
            setBaseShadowColor={setBaseShadowColor}
            setShadowColor={setShadowColor}
            tutorialStep={tutorialStep}
            showTutorial={showTutorial}
          />
        </div>
      </div>
    </div>
  );
}
