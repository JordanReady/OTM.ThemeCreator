import "../app/konami/konami.scss";

type Props = {
  showTutorial: boolean;
  tutorialStep: number;
  setTutorialStep: (step: number) => void;
  setShowTutorial: (showTutorial: boolean) => void;
  setActiveDialog: (dialogName: string) => void;
  setCycle: (cycle: boolean) => void;
  tutorialInterface: string;
  setShowSettings: (showSettings: boolean) => void;
};

const stepDescriptions: Record<number, string> = {
  1: "Dialog Display Buttons - Use these buttons to select a specific dialog box, cycle through available dialogs, or return to the home screen to choose a different interface.",
  2: "Variable Cards - Adjust the color of customizable styles in real time. Click the color strip to open the color picker or use the eyedropper tool to select a color from a logo. Copy a color value and paste it with the copy paste buttons. For gradients, sliders are available to change the gradient, indicated by a red border around the color picker. Copy color values or export the full theme with one click.",
  3: "Settings - Customize dialog cycle speed, interface scale, and position. Upload a logo with a specific aspect ratio, and import/export themes. Import themes by automatically applying a customTheme object or the full KonamiSettings record from EMC that has been copied to your clipboard. Exporting automatically copies the current theme to your clipboard in the format below. You can try it out by copying the theme below and clicking on the import button.",
};

export default function TutorialDisplay({
  showTutorial,
  tutorialStep,
  setTutorialStep,
  setShowTutorial,
  setActiveDialog,
  setCycle,
  tutorialInterface,
  setShowSettings,
}: Props) {
  if (!showTutorial) {
    return null; // Don't render anything if tutorial is not shown
  }

  const handleNext = () => {
    if (tutorialStep === 2) {
      setShowSettings(true);
    }
    if (tutorialStep === 3) {
      setTutorialStep(0); // Reset to step 1
      setShowTutorial(false);
      return;
    }
    const nextStep = tutorialStep + 1;
    setTutorialStep(nextStep);
    setCycle(false);
    if (tutorialInterface === "Konami") {
      setActiveDialog("LookupDialog");
    }
    if (tutorialInterface === "OrderStatusBoard") {
      setActiveDialog("OSBDisplay1");
    }
  };

  const handleExit = () => {
    setTutorialStep(0); // Reset to step 1
    setShowTutorial(false);
  };

  const stepDescription =
    stepDescriptions[tutorialStep] || "Invalid Step. Please try again.";

  // Dynamic class name based on step
  const containerClass = `tutorial-container animate step-${tutorialStep}`;

  return (
    <div className={containerClass}>
      <p className="tutorial-description">{stepDescription}</p>
      {tutorialStep === 3 && tutorialInterface === "OrderStatusBoard" && (
        <>
          <p className="tutorial-description">
            This interface alows you to view and convert into raw html after you
            have customized it.
          </p>
        </>
      )}
      {tutorialStep === 3 && (
        <>
          <br />
          <p className="tutorial-description">
            {" "}
            {`  "CustomTheme": {
            "backgroundColor": "#0000ff",
            "accentColor": "#008000",
            "textColor": "#ffff00",
            "buttonBackground": "#ffa500",
            "buttonHoverBackground": "linear-gradient(145deg, #FF1744, #FF5252)",
            "buttonActiveBackground": "#e83e8c",
            "borderColor": "#800080",
            "buttonTextColor": "#ff0000",
            "shadowColor": "#808080" 
          }, `}
          </p>
        </>
      )}
      <br />
      <div className="tutorial-buttons">
        <button className="dialog-switch-button" onClick={handleNext}>
          Next
        </button>
        <button className="exit-button" onClick={handleExit}>
          Exit Tutorial
        </button>
      </div>
    </div>
  );
}
