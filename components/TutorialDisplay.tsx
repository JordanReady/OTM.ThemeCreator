import "../app/konami/konami.scss";

type Props = {
  showTutorial: boolean;
  tutorialStep: number;
  setTutorialStep: (step: number) => void;
  setShowTutorial: (showTutorial: boolean) => void;
};

const stepDescriptions: Record<number, string> = {
  1: "Dialog Display Buttons - These buttons allow you to select a certain dialog box, cycle through the dialogs, and return home to select a different interface.",
  2: "Variable Cards - These variable cards allow you to change in real time the color of all the customizable styles. Some styles allow you to select a gradient. Once slected, the variable card will display a red border indicating you can use the sliders to adjust the gradient. You can copy the value of the color by clicking the copy button. Or you can export an entire theme.",
  3: `Settings - Here you can change the cycle speed of the dialog boxes, the scale and position of the interfaces, import a logo with a selected aspect ratio, import and export a theme. Once you click Import theme, you can paste either the customTheme object or the entire KonamiSettings content record from EMC. Once you click Export theme, the theme will be copied to your clipboard in the format as follows: 
`,
};

export default function TutorialDisplay({
  showTutorial,
  tutorialStep,
  setTutorialStep,
  setShowTutorial,
}: Props) {
  if (!showTutorial) {
    return null; // Don't render anything if tutorial is not shown
  }

  const handleNext = () => {
    if (tutorialStep === 3) {
      setTutorialStep(0); // Reset to step 1
      setShowTutorial(false);
      return;
    }
    const nextStep = tutorialStep + 1;
    setTutorialStep(nextStep);
  };

  const stepDescription =
    stepDescriptions[tutorialStep] || "Invalid Step. Please try again.";

  // Dynamic class name based on step
  const containerClass = `tutorial-container animate step-${tutorialStep}`;

  return (
    <div className={containerClass}>
      <p className="tutorial-description">{stepDescription}</p>
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
            "buttonBorderColor": "#800080",
            "buttonTextColor": "#ff0000",
            "shadowColor": "#808080" 
          }, `}
          </p>
        </>
      )}
      <br />
      <button className="dialog-switch-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
