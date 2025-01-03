"use client";
import { useState, useEffect } from "react";

interface VariableBoxProps {
  label: string;
  variableName: string;
  baseColor: string; // The starting hex color (without gradient)
  colorValue: string; // The currently applied color (could be hex or gradient)
  onColorChange: (val: string) => void; // Called when final color (gradient or hex) changes
  onBaseColorChange: (val: string) => void; // Called when the base hex color changes
  allowGradient: boolean;
}

export default function VariableBox({
  label,
  variableName,
  baseColor,
  colorValue,
  onColorChange,
  onBaseColorChange,
  allowGradient,
}: VariableBoxProps) {
  const [percent, setPercent] = useState(0.2);
  const [degree, setDegree] = useState(145);
  const [isGradient, setIsGradient] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);

  // Utility to convert color names to HEX values
  function getHexFromName(colorName: string): string {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.fillStyle = colorName;
      return ctx.fillStyle; // Returns hex value
    }
    return colorName; // Fallback to original if no context
  }

  // Check if colorValue is gradient or named color
  useEffect(() => {
    // Check if the color is a gradient
    if (colorValue.startsWith("linear-gradient")) {
      setIsGradient(true);
    } else {
      setIsGradient(false);

      // If the color value is a named color, convert it to HEX
      const hexColor = getHexFromName(colorValue);
      if (hexColor !== colorValue) {
        onColorChange(hexColor);
      }
    }
  }, [colorValue]);

  useEffect(() => {
    if (isInputOpen) {
      document.getElementById(`${variableName}-input`)?.focus();
    }
  }, [isInputOpen]);

  // Utility function to lighten a hex color by a given percent p (0 to 1)
  function lightenColor(hex: string, p: number) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.floor((num >> 16) + 255 * p));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + 255 * p));
    const b = Math.min(255, Math.floor((num & 0x0000ff) + 255 * p));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  // Generate a gradient based on current percent and degree using the baseColor
  const convertToGradient = (p: number, d: number) => {
    if (!baseColor.startsWith("#")) return; // ensure baseColor is hex
    const lighterColor = lightenColor(baseColor, p);
    const gradient = `linear-gradient(${d}deg, ${lighterColor}, ${baseColor})`;
    onColorChange(gradient);
  };

  // If isGradient is on, update the gradient when percent or degree changes
  useEffect(() => {
    if (isGradient) {
      convertToGradient(percent, degree);
    }
  }, [percent, degree]);

  // Extract the color values from the gradient or hex value for display
  const cleanColorValue = colorValue.startsWith("linear-gradient")
    ? colorValue.replace(/linear-gradient\((.*)\)/, "($1)")
    : colorValue;

  // Utility to extract the last color from a gradient string
  const extractLastColorFromGradient = (gradient: string): string | null => {
    const regex =
      /linear-gradient\([^,]+,\s*(#[0-9A-Fa-f]{3,6})(?:\s*,\s*#[0-9A-Fa-f]{3,6})*\s*\)$/;
    const match = gradient.match(regex);
    if (match) {
      const colors = gradient.match(/#([0-9A-Fa-f]{3,6})/g);
      return colors ? colors[colors.length - 1] : null;
    }
    return null;
  };

  // Helper function to ensure gradient string has 'linear-gradient' prefix
  const ensureLinearGradient = (text: string): string => {
    if (text.startsWith("linear-gradient")) {
      return text;
    }
    // Attempt to add 'linear-gradient' if the format matches
    const gradientPattern =
      /^\(\s*\d+deg\s*,\s*#[0-9A-Fa-f]{3,6}\s*,\s*#[0-9A-Fa-f]{3,6}\s*\)$/;
    if (gradientPattern.test(text)) {
      return `linear-gradient${text}`;
    }
    return text;
  };

  return (
    <span
      className={`css-variable-box animate ${
        isGradient ? "active-border" : ""
      }`}
    >
      <span className="variable-name">{label}</span>
      <div className={`color-preview ${variableName}`}>
        <div
          onClick={() => navigator.clipboard.writeText(colorValue)}
          className="copy"
        >
          Copy
        </div>
        <div
          onClick={async () => {
            try {
              const pastedText = (await navigator.clipboard.readText()).trim();
              const normalizedText = ensureLinearGradient(pastedText);

              if (normalizedText.startsWith("linear-gradient")) {
                if (allowGradient) {
                  onColorChange(normalizedText);
                  setIsGradient(true);
                  const lastColor =
                    extractLastColorFromGradient(normalizedText);
                  if (lastColor) {
                    onBaseColorChange(lastColor);
                  }
                } else {
                  const lastColor =
                    extractLastColorFromGradient(normalizedText);
                  if (lastColor) {
                    onColorChange(lastColor);
                    onBaseColorChange(lastColor);
                    setIsGradient(false);
                  } else {
                    console.warn(
                      "Failed to extract color from pasted gradient."
                    );
                  }
                }
              } else {
                // If not a gradient, treat it as a regular color
                const hexColor = getHexFromName(normalizedText);
                onColorChange(hexColor);
                onBaseColorChange(hexColor);
                setIsGradient(false);
              }
            } catch (err) {
              console.error("Failed to read clipboard contents: ", err);
            }
          }}
          className="paste"
        >
          Paste
        </div>
        <span className="hex-display">{cleanColorValue}</span>
        <input
          type="color"
          placeholder={cleanColorValue}
          className={`input ${variableName}`}
          value={
            colorValue.startsWith("linear-gradient") ? baseColor : colorValue
          }
          onChange={(e) => {
            const newBase = e.target.value;

            // If currently a gradient, we need to temporarily disable it to apply the new base color
            if (isGradient) {
              // Turn off gradient
              setIsGradient(false);
              onBaseColorChange(newBase);
              onColorChange(newBase);

              // Re-enable gradient with the updated base color
              setIsGradient(true);
              convertToGradient(percent, degree);
            } else {
              // Not currently a gradient, just set the base color and the color
              onBaseColorChange(newBase);
              onColorChange(newBase);
            }
          }}
          onClick={() => setIsInputOpen(!isInputOpen)}
        />
      </div>

      <div className="gradient-container">
        {allowGradient && (
          <>
            <button
              className="gradient-button"
              onClick={() => {
                if (!isGradient) {
                  // Turning gradient on
                  setIsGradient(true);
                  convertToGradient(percent, degree);
                } else {
                  // Turning gradient off - revert to baseColor
                  onColorChange(baseColor);
                  setIsGradient(false);
                }
              }}
            >
              {isGradient ? "Disable Gradient" : "Select Gradient"}
            </button>

            {/* Show sliders if gradient is selected, but they only apply if isGradient is true */}
            <div className="slider-container">
              <label
                className="percent-slider"
                htmlFor={`${variableName}-percent-slider`}
              >
                <span className="slider-label">Percent</span>
                <input
                  id={`${variableName}-percent-slider`}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                  disabled={!isGradient}
                />
                <span className="value-display">
                  {(percent * 100).toFixed(0)}%
                </span>
              </label>

              <label
                className="degree-slider"
                htmlFor={`${variableName}-degree-slider`}
              >
                <span className="slider-label">Degree</span>
                <input
                  id={`${variableName}-degree-slider`}
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={degree}
                  onChange={(e) => setDegree(Number(e.target.value))}
                  disabled={!isGradient}
                />
                <span className="value-display">{degree}°</span>
              </label>
            </div>
          </>
        )}
        {!allowGradient && (
          <p>Gradient is unavailable for this style variable.</p>
        )}
      </div>
    </span>
  );
}
