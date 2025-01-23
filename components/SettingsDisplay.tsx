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
  aspectRatio: string;
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
  importTheme: boolean; // If you want to track whether a theme has been imported
  setImportTheme: (importTheme: boolean) => void;
  importedTheme: string;
  disconnectedImgAspectRatio?: string;
  setDisconnectedImgAspectRatio: (disconnectedImgAspectRatio: string) => void;
  disconnectedImg: string;
  setDisconnectedImg: (disconnectedImg: string) => void;
  componentHtml?: string;
  imageRight?: string;
  imageLeft?: string;
  imageCenter?: string;
  setImageRight: (imageRight: string) => void;
  setImageLeft: (imageLeft: string) => void;
  setImageCenter: (imageCenter: string) => void;
  threeImageAspectRatio?: string;
  setThreeImageAspectRatio: (threeImageAspectRatio: string) => void;
  activeDialog: string | null;
};

type ButtonType =
  | "openSettings"
  | "hideSettings"
  | "interactiveTutorial"
  | "importCustomTheme"
  | "exportCustomTheme"
  | "toggleShowHtml"
  | "exportHtml";

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
  aspectRatio,
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
  importTheme,
  setImportTheme,
  importedTheme,
  disconnectedImgAspectRatio,
  setDisconnectedImgAspectRatio,
  disconnectedImg,
  setDisconnectedImg,
  componentHtml,
  imageRight,
  imageLeft,
  imageCenter,
  setImageRight,
  setImageLeft,
  setImageCenter,
  threeImageAspectRatio,
  setThreeImageAspectRatio,
  activeDialog,
}: Props) {
  useEffect(() => {
    // Keep cycling when cycleSpeed changes (assuming you want continuous refresh)
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
          if (!navigator.clipboard) {
            alert("Clipboard API not supported in this browser.");
            return;
          }

          const clipboardText = await navigator.clipboard.readText();

          if (!clipboardText) {
            alert("Clipboard is empty. Please copy a valid theme string.");
            return;
          }

          handleThemeSubmit(clipboardText);
          // If you want to track that an import has happened:
          setImportTheme(true);
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
      case "exportHtml":
        if (componentHtml) {
          navigator.clipboard.writeText(componentHtml);
          alert("HTML copied to clipboard!");
        }
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

      {/* 
        Example: if you wanted to toggle 'Interactive Tutorial'
        you’d do something like:

        {tutorialIsActive ? (
          <button onClick={() => ...}>Stop Interactive Tutorial</button>
        ) : (
          <button onClick={() => ...}>Start Interactive Tutorial</button>
        )} 
        (But right now it’s just a one-time click to start.)
      */}

      {/**
       * Now each "Settings Interface" is conditionally shown only if
       * showSettings is true AND we’re in that interface mode
       */}
      {settingInterface === "Konami" && showSettings && (
        <div className={`settings-container animate-down`}>
          {/* Import-Export Button Group */}
          <div className="import-export-container">
            <button
              onClick={() => handleClick("interactiveTutorial")}
              className="import-export-button gradient-button tutorial-button shake-lr animate"
              aria-label="Start Interactive Tutorial"
            >
              Start Interactive Tutorial
            </button>

            {/**
             * If you want to reflect the "imported" state in the label, do:
             */}
            <button
              onClick={() => handleClick("importCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Import Custom Theme from Clipboard"
            >
              {/* {importTheme ? "Theme Imported!" : "Import Custom Theme"} */}
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
              value={aspectRatio}
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
          className={`settings-container osb-settings-container animate-down`}
        >
          {/* UNIVERSAL SETTINGS - displayed for all dialogs */}

          <div className="import-export-container">
            <button
              onClick={() => handleClick("interactiveTutorial")}
              className="import-export-button gradient-button tutorial-button shake-lr animate"
              aria-label="Start Interactive Tutorial"
            >
              Start Interactive Tutorial
            </button>

            <button
              onClick={() => handleClick("importCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Import Custom Theme from Clipboard"
            >
              {importTheme ? "Theme Imported!" : "Import Custom Theme"}
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

            <button
              onClick={() => handleClick("exportHtml")}
              className="import-export-button gradient-button animate"
              aria-label="Export Custom Theme"
            >
              Export HTML File
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

          {/* CONDITIONAL SETTINGS */}

          {/* OSBDisplay1 or OSBDisplay2: Show logo & aspect ratio */}
          {(activeDialog === "OSBDisplay1" ||
            activeDialog === "OSBDisplay2") && (
            <>
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

              <div className="setting-option">
                <label htmlFor="aspect-ratio">Aspect Ratio: </label>
                <select
                  id="aspect-ratio"
                  className="aspect-ratio-dropdown"
                  value={aspectRatio}
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
            </>
          )}

          {/* OSBDisconnected: Show disconnected image & aspect ratio */}
          {activeDialog === "OSBDisconnected" && (
            <>
              <div className="setting-option">
                <p>Disconnected Image: </p>
                <label
                  htmlFor="disconnected-img"
                  className="custom-upload-label"
                >
                  Upload Image
                </label>
                <input
                  id="disconnected-img"
                  className="img-option"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setDisconnectedImg(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className="setting-option">
                <label htmlFor="disconnected-aspect-ratio">
                  Disconnected Aspect Ratio:
                </label>
                <select
                  id="disconnected-aspect-ratio"
                  className="aspect-ratio-dropdown"
                  value={disconnectedImgAspectRatio}
                  onChange={(e) => {
                    setDisconnectedImgAspectRatio(e.target.value);
                  }}
                >
                  <option value="wide">Wide</option>
                  <option value="portrait">Portrait</option>
                  <option value="classic">Classic</option>
                  <option value="banner">Banner</option>
                  <option value="square">Square</option>
                </select>
              </div>
            </>
          )}

          {/* OSBDisplay3: Show left/center/right images & aspect ratio */}
          {activeDialog === "OSBDisplay3" && (
            <>
              <div className="setting-option">
                <p>Left Image: </p>
                <label htmlFor="left-img" className="custom-upload-label">
                  Upload Image
                </label>
                <input
                  id="left-img"
                  className="img-option"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setImageLeft(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className="setting-option">
                <p>Center Image: </p>
                <label htmlFor="center-img" className="custom-upload-label">
                  Upload Image
                </label>
                <input
                  id="center-img"
                  className="img-option"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setImageCenter(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className="setting-option">
                <p>Right Image: </p>
                <label htmlFor="right-img" className="custom-upload-label">
                  Upload Image
                </label>
                <input
                  id="right-img"
                  className="img-option"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setImageRight(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className="setting-option">
                <label htmlFor="three-image-aspect-ratio">
                  Three Images Aspect Ratio:
                </label>
                <select
                  id="three-image-aspect-ratio"
                  className="aspect-ratio-dropdown"
                  value={threeImageAspectRatio}
                  onChange={(e) => {
                    setThreeImageAspectRatio(e.target.value);
                  }}
                >
                  <option value="wide">Wide</option>
                  <option value="portrait">Portrait</option>
                  <option value="classic">Classic</option>
                  <option value="banner">Banner</option>
                  <option value="square">Square</option>
                </select>
              </div>
            </>
          )}
        </div>
      )}

      {settingInterface === "Aristocrat" && showSettings && (
        <div className={`settings-container animate-down`}>
          {/* Import-Export Button Group */}
          <div className="import-export-container">
            <button
              onClick={() => handleClick("interactiveTutorial")}
              className="import-export-button gradient-button tutorial-button shake-lr animate"
              aria-label="Start Interactive Tutorial"
            >
              Start Interactive Tutorial
            </button>
            <button
              onClick={() => handleClick("importCustomTheme")}
              className="import-export-button gradient-button animate"
              aria-label="Import Custom Theme from Clipboard"
            >
              {importTheme ? "Theme Imported!" : "Import Custom Theme"}
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
              value={aspectRatio}
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
