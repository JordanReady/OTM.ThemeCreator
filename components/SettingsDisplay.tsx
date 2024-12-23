import { useEffect } from "react";
import "../app/konami/konami.scss";
import "../app/orderStatusBoard/orderStatusBoard.scss";

type Props = {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
  exportTheme: () => void;
  cycleSpeed: number;
  setCycleSpeed: (cycleSpeed: number) => void;
  scale: number;
  setScale: (scale: number) => void;
  pos: number;
  handleSliderChange: (event: { target: { value: any } }) => void;
  setUploadedImage: (uploadedImage: string) => void;
  setAspectRatio: (aspectRatio: string) => void;
  handleThemeSubmit: (theme: string) => void;
  handleTutorial: () => void;
  showTutorial: boolean;
  tutorialStep: number;
  setCycle: (cycle: boolean) => void;
  settingInterface: string;
  headingSize?: number;
  handleHeadingSize: (event: { target: { value: any } }) => void;
  playerImgScale?: number;
  setPlayerImgScale: (playerImgScale: number) => void;
  showHtml: boolean;
  setShowHtml: (showHtml: boolean) => void;
  importTheme: boolean;
  setImportTheme: (importTheme: boolean) => void;
  importedTheme: string;
};

type ButtonType =
  | "openSettings"
  | "hideSettings"
  | "interactiveTutorial"
  | "importCustomTheme"
  | "exportCustomTheme"
  | "toggleShowHtml";

export default function SettingsDisplay({
  showSettings,
  setShowSettings,
  exportTheme,
  cycleSpeed,
  setCycleSpeed,
  scale,
  setScale,
  pos,
  handleSliderChange,
  setUploadedImage,
  setAspectRatio,
  handleThemeSubmit,
  handleTutorial,
  showTutorial,
  tutorialStep,
  setCycle,
  settingInterface,
  headingSize,
  handleHeadingSize,
  playerImgScale,
  setPlayerImgScale,
  showHtml,
  setShowHtml,
}: Props) {
  useEffect(() => {
    setCycle(true);
  }, [cycleSpeed, setCycle]);

  /**
   * Centralized click handler for all buttons.
   * @param buttonType - Identifier for the button clicked.
   */
  const handleClick = async (buttonType: ButtonType) => {
    switch (buttonType) {
      case "openSettings":
        setShowSettings(true);
        break;
      case "hideSettings":
        setShowSettings(false);
        break;
      case "interactiveTutorial":
        handleTutorial();
        setShowSettings(false);
        break;
      case "importCustomTheme":
        try {
          // Check if the Clipboard API is available
          if (!navigator.clipboard) {
            alert("Clipboard API not supported in this browser.");
            return;
          }

          // Read text from the clipboard
          const clipboardText = await navigator.clipboard.readText();

          if (!clipboardText) {
            alert("Clipboard is empty. Please copy a valid theme string.");
            return;
          }

          // Apply the theme using handleThemeSubmit without validating JSON
          handleThemeSubmit(clipboardText);
        } catch (error) {
          console.error("Failed to read clipboard contents: ", error);
          alert("Failed to import theme from clipboard.");
        } finally {
          setShowSettings(false);
        }
        break;
      case "exportCustomTheme":
        exportTheme();
        setShowSettings(false);
        break;
      case "toggleShowHtml":
        setShowHtml(!showHtml);
        setShowSettings(false);
        break;
      default:
        console.warn(`Unhandled button type: ${buttonType}`);
        break;
    }
  };

  return (
    <div
      className={`${
        showTutorial && (tutorialStep === 1 || tutorialStep === 2) ? "blur" : ""
      }`}
    >
      {/* Toggle Settings Button */}
      {showSettings ? (
        <button
          onClick={() => handleClick("hideSettings")}
          className="settings-button gradient-button animate"
          aria-label="Hide Settings"
        >
          Hide Settings
        </button>
      ) : (
        <button
          onClick={() => handleClick("openSettings")}
          className="settings-button gradient-button animate"
          aria-label="Open Settings"
        >
          Open Settings
        </button>
      )}

      {/* Settings Interfaces */}
      {settingInterface === "Konami" && showSettings && (
        <div
          className={`settings-container ${
            showSettings ? "animate-down" : "animate-up"
          }`}
        >
          {/* Import-Export Button Group */}
          <div className="import-export-container">
            <button
              onClick={() => handleClick("interactiveTutorial")}
              className="import-export-button gradient-button tutorial-button shake-lr animate"
              aria-label="Start Interactive Tutorial"
            >
              Interactive Tutorial
            </button>
            <button
              onClick={() => handleClick("importCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Import Custom Theme from Clipboard"
            >
              Import Custom Theme
            </button>
            <button
              onClick={() => handleClick("exportCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Export Custom Theme"
            >
              Export Custom Theme
            </button>
          </div>

          {/* Cycle Speed Slider */}
          <div className="setting-option first">
            <label htmlFor="cycle-speed">
              Cycle Speed | ({cycleSpeed} second{cycleSpeed > 1 ? "s" : ""})
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
            <label htmlFor="scale">Scale | ({scale.toFixed(2)})</label>
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

          {/* Y Level Slider */}
          <div className="setting-option">
            <label htmlFor="pos-slider">Y Level | ({pos.toFixed(2)})</label>
            <input
              id="pos-slider"
              type="range"
              min="-15"
              max="15"
              value={pos}
              onChange={handleSliderChange}
            />
          </div>
          <br />

          {/* Image Upload */}
          <div className="setting-option">
            <p>Logo: </p>
            <label htmlFor="image-upload" className="custom-upload-label">
              Upload Image
            </label>
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

          {/* Aspect Ratio Selector */}
          <div className="setting-option">
            <label htmlFor="aspect-ratio">Aspect Ratio: </label>
            <select
              id="aspect-ratio"
              className="aspect-ratio-dropdown"
              onChange={(e) => {
                setAspectRatio(e.target.value);
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
      )}

      {settingInterface === "OrderStatusBoard" && showSettings && (
        <div
          className={`settings-container osb-settings-container ${
            showSettings ? "animate-down" : "animate-up"
          }`}
        >
          {/* Import-Export Button Group */}
          <div className="import-export-container">
            <button
              onClick={() => handleClick("interactiveTutorial")}
              className="import-export-button gradient-button tutorial-button shake-lr animate"
              aria-label="Start Interactive Tutorial"
            >
              Interactive Tutorial
            </button>
            <button
              onClick={() => handleClick("importCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Import Custom Theme from Clipboard"
            >
              Import Custom Theme
            </button>
            <button
              onClick={() => handleClick("exportCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Export Custom Theme"
            >
              Export Custom Theme
            </button>
            <button
              onClick={() => handleClick("toggleShowHtml")}
              className="import-export-button gradient-button animate"
              aria-label="Toggle HTML Display"
            >
              {showHtml ? "Show Display" : "Show HTML"}
            </button>
          </div>

          {/* Cycle Speed Slider */}
          <div className="setting-option first">
            <label htmlFor="cycle-speed">
              Cycle Speed | ({cycleSpeed} second{cycleSpeed > 1 ? "s" : ""})
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
            <label htmlFor="scale">Scale | ({scale.toFixed(2)})</label>
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

          {/* Y Level Slider */}
          <div className="setting-option">
            <label htmlFor="pos-slider">Y Level | ({pos.toFixed(2)})</label>
            <input
              id="pos-slider"
              type="range"
              min="-15"
              max="15"
              value={pos}
              onChange={handleSliderChange}
            />
          </div>
          <br />

          {/* Image Upload */}
          <div className="setting-option">
            <p>Logo: </p>
            <label htmlFor="image-upload" className="custom-upload-label">
              Upload Image
            </label>
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

          {/* Aspect Ratio Selector */}
          <div className="setting-option">
            <label htmlFor="aspect-ratio">Aspect Ratio: </label>
            <select
              id="aspect-ratio"
              className="aspect-ratio-dropdown"
              onChange={(e) => {
                setAspectRatio(e.target.value);
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
      )}

      {settingInterface === "Aristocrat" && showSettings && (
        <div
          className={`settings-container ${
            showSettings ? "animate-down" : "animate-up"
          }`}
        >
          {/* Import-Export Button Group */}
          <div className="import-export-container">
            <button
              onClick={() => handleClick("interactiveTutorial")}
              className="import-export-button gradient-button tutorial-button shake-lr animate"
              aria-label="Start Interactive Tutorial"
            >
              Interactive Tutorial
            </button>
            <button
              onClick={() => handleClick("importCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Import Custom Theme from Clipboard"
            >
              Import Custom Theme
            </button>
            <button
              onClick={() => handleClick("exportCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Export Custom Theme"
            >
              Export Custom Theme
            </button>
          </div>

          {/* Cycle Speed Slider */}
          <div className="setting-option first">
            <label htmlFor="cycle-speed">
              Cycle Speed | ({cycleSpeed} second{cycleSpeed > 1 ? "s" : ""})
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
            <label htmlFor="scale">Scale | ({scale.toFixed(2)})</label>
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

          {/* Y Level Slider */}
          <div className="setting-option">
            <label htmlFor="pos-slider">Y Level | ({pos.toFixed(2)})</label>
            <input
              id="pos-slider"
              type="range"
              min="-15"
              max="15"
              value={pos}
              onChange={handleSliderChange}
            />
          </div>

          {/* Player Image Scale Slider */}
          {playerImgScale !== undefined && (
            <div className="setting-option">
              <label htmlFor="player-img-scale">
                Player Image Scale | ({playerImgScale.toFixed(2)})
              </label>
              <input
                id="player-img-scale"
                type="range"
                min="-10"
                max="10"
                step="0.01"
                value={playerImgScale}
                onChange={(e) => setPlayerImgScale(Number(e.target.value))}
              />
            </div>
          )}
          <br />

          {/* Image Upload */}
          <div className="setting-option">
            <p>Logo: </p>
            <label htmlFor="image-upload" className="custom-upload-label">
              Upload Image
            </label>
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

          {/* Aspect Ratio Selector */}
          <div className="setting-option">
            <label htmlFor="aspect-ratio">Aspect Ratio: </label>
            <select
              id="aspect-ratio"
              className="aspect-ratio-dropdown"
              onChange={(e) => {
                setAspectRatio(e.target.value);
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
      )}
    </div>
  );
}
