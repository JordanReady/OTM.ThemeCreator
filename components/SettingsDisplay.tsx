import { useEffect } from "react";
import "../app/konami/konami.scss";

type Props = {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
  importTheme: boolean;
  setImportTheme: (importTheme: boolean) => void;
  exportTheme: () => void;
  cycleSpeed: number;
  setCycleSpeed: (cycleSpeed: number) => void;
  scale: number;
  setScale: (scale: number) => void;
  pos: number;
  handleSliderChange: (event: { target: { value: any } }) => void;
  setUploadedImage: (uploadedImage: string) => void;
  setAspectRatio: (aspectRatio: string) => void;
  importedTheme: string;
  handleThemeSubmit: (event: string) => void;
  handleTutorial: () => void;
  showTutorial: boolean;
  tutorialStep: number;
  setCycle: (cycle: boolean) => void;
};

export default function SettingsDisplay({
  showSettings,
  setShowSettings,
  importTheme,
  setImportTheme,
  exportTheme,
  cycleSpeed,
  setCycleSpeed,
  scale,
  setScale,
  pos,
  handleSliderChange,
  setUploadedImage,
  setAspectRatio,
  importedTheme,
  handleThemeSubmit,
  handleTutorial,
  showTutorial,
  tutorialStep,
  setCycle,
}: Props) {
  useEffect(() => {
    setCycle(true);
  }, [cycleSpeed]);
  return (
    <div
      className={` ${
        showTutorial && (tutorialStep === 1 || tutorialStep === 2) ? "blur" : ""
      }`}
    >
      {showSettings && (
        <>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="settings-button gradient-button animate"
          >
            Hide Settings
          </button>
        </>
      )}
      {!showSettings && (
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="settings-button gradient-button animate"
        >
          Open Settings
        </button>
      )}

      <div
        className={`settings-container ${
          showSettings ? "animate-down" : "animate-up"
        }`}
      >
        <div className="import-export-container">
          <button
            onClick={() => handleTutorial()}
            className="import-export-button gradient-button tutorial-button shake-lr animate"
          >
            Interactive Tutorial
          </button>
          <button
            onClick={() => setImportTheme(!importTheme)}
            className="import-export-button gradient-button animate"
          >
            Import Custom Theme
          </button>
          <button
            onClick={() => exportTheme()}
            className="import-export-button gradient-button animate"
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
          <label htmlFor="cycle-speed">Y Level | ({pos.toFixed(2)})</label>
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
                reader.onload = () => setUploadedImage(reader.result as string);
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
        {importTheme && (
          <div className="setting-option">
            <label htmlFor="import-theme">Paste Custom Theme JSON below </label>
            <br />
            <textarea
              id="import-theme"
              className="import-theme-textarea"
              value={importedTheme}
              onChange={(e) => handleThemeSubmit(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
