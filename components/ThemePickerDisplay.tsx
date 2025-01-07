import React from "react";
import VariableBox from "./VariableBox";
import Link from "next/link";
import "../app/konami/konami.scss";

type Props = {
  openDialog: (dialogName: string) => void;
  setCycle: (cycle: boolean) => void;
  baseBackgroundColor: string;
  backgroundColor: string;
  baseBoxBackgroundColor: string;
  boxBackgroundColor: string;
  setBoxBackgroundColor: (color: string) => void;
  setBaseBoxBackgroundColor: (color: string) => void;
  baseAccentColor: string;
  accentColor: string;
  baseTextColor: string;
  textColor: string;
  setBaseBackgroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBaseAccentColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setBaseTextColor: (color: string) => void;
  setTextColor: (color: string) => void;
  baseButtonBackground: string;
  buttonBackground: string;
  setBaseButtonBackground: (color: string) => void;
  setButtonBackground: (color: string) => void;
  baseButtonHoverBackground: string;
  buttonHoverBackground: string;
  setBaseButtonHoverBackground: (color: string) => void;
  setButtonHoverBackground: (color: string) => void;
  baseButtonActiveBackground: string;
  buttonActiveBackground: string;
  setBaseButtonActiveBackground: (color: string) => void;
  setButtonActiveBackground: (color: string) => void;
  baseBorderColor: string;
  borderColor: string;
  setBaseBorderColor: (color: string) => void;
  setBorderColor: (color: string) => void;
  baseButtonTextColor: string;
  buttonTextColor: string;
  setBaseButtonTextColor: (color: string) => void;
  setButtonTextColor: (color: string) => void;
  baseShadowColor: string;
  shadowColor: string;
  setBaseShadowColor: (color: string) => void;
  setShadowColor: (color: string) => void;
  showTutorial: boolean;
  tutorialStep: number;
  interfaceName: string;
};

export default function ThemePickerDisplay({
  openDialog,
  setCycle,
  baseBackgroundColor,
  backgroundColor,
  baseBoxBackgroundColor,
  boxBackgroundColor,
  baseAccentColor,
  accentColor,
  baseTextColor,
  textColor,
  setBaseBackgroundColor,
  setBackgroundColor,
  setBoxBackgroundColor,
  setBaseBoxBackgroundColor,
  setBaseAccentColor,
  setAccentColor,
  setBaseTextColor,
  setTextColor,
  baseButtonBackground,
  buttonBackground,
  setBaseButtonBackground,
  setButtonBackground,
  baseButtonHoverBackground,
  buttonHoverBackground,
  setBaseButtonHoverBackground,
  setButtonHoverBackground,
  baseButtonActiveBackground,
  buttonActiveBackground,
  setBaseButtonActiveBackground,
  setButtonActiveBackground,
  baseBorderColor,
  borderColor,
  setBaseBorderColor,
  setBorderColor,
  baseButtonTextColor,
  buttonTextColor,
  setBaseButtonTextColor,
  setButtonTextColor,
  baseShadowColor,
  shadowColor,
  setBaseShadowColor,
  setShadowColor,
  showTutorial,
  tutorialStep,
  interfaceName,
}: Props) {
  return (
    <>
      <div className={`theme-picker-container `}>
        <div
          className={`dialog-picker animate ${
            showTutorial && (tutorialStep === 2 || tutorialStep === 3)
              ? "blur"
              : ""
          }`}
        >
          <div className="dialog-switch-buttons">
            {interfaceName === "OSB" && (
              <>
                <button
                  className="dialog-switch-button"
                  onClick={() => openDialog("OSBDisplay1")}
                >
                  Order Status Board
                </button>
                <button
                  className="dialog-switch-button"
                  onClick={() => openDialog("OSBDisplay2")}
                >
                  Order Status Board 2
                </button>
                <button
                  className="dialog-switch-button"
                  onClick={() => openDialog("OSBDisconnected")}
                >
                  Server Disconnected
                </button>
              </>
            )}
            {interfaceName === "PlayerInformation" && (
              <>
                <button
                  className="dialog-switch-button"
                  onClick={() => openDialog("PlayerInformation")}
                >
                  Player Information
                </button>
              </>
            )}
            {interfaceName === "Konami" && (
              <>
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
              </>
            )}
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

        <div
          className={`theme-picker ${
            showTutorial && (tutorialStep === 1 || tutorialStep === 3)
              ? "blur"
              : ""
          }`}
        >
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

          {/* Box Background Color */}
          <VariableBox
            allowGradient={true}
            label="Box Background Color"
            variableName="box-background-color"
            baseColor={baseBoxBackgroundColor}
            colorValue={boxBackgroundColor}
            onColorChange={(val) => setBoxBackgroundColor(val)}
            onBaseColorChange={(val) => setBaseBoxBackgroundColor(val)}
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

          {/* Border Color */}
          <VariableBox
            allowGradient={false}
            label="Border Color"
            variableName="border-color"
            baseColor={baseBorderColor}
            colorValue={borderColor}
            onColorChange={(val) => setBorderColor(val)}
            onBaseColorChange={(val) => setBaseBorderColor(val)}
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
    </>
  );
}
