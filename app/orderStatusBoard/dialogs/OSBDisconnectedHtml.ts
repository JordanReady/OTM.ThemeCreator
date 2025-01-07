export function getOSBDisconnectedHtml(
  imgSrc: string,
  aspectRatio: string, // e.g., 'square', 'wide', 'portrait', 'classic', 'banner'
  backgroundColor: string,
  boxBackgroundColor: string,
  accentColor: string,
  buttonBackground: string,
  buttonHoverBackground: string,
  buttonActiveBackground: string,
  borderColor: string,
  buttonTextColor: string,
  shadowColor: string,
  textColor: string,
  retryUrl: string = "OTMThemeOSB.html", // Default retry URL
  scale: string = "1" // Optional scaling
): string {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Server Disconnected</title>
      
          <style>
            :root {
              --accent-color: ${accentColor};
              --background-color: ${backgroundColor};
              --box-background-color: ${boxBackgroundColor};
              --button-active-background: ${buttonActiveBackground};
              --button-background: ${buttonBackground};
              --border-color: ${borderColor};
              --button-hover-background: ${buttonHoverBackground};
              --button-text-color: ${buttonTextColor};
              --shadow-color: ${shadowColor};
              --text-color: ${textColor};
              --scale: ${scale};
            }
      
            html,
            body {
              margin: 0;
              padding: 0;
              height: 100%;
              font-family: Arial, sans-serif;
              background: var(--background-color);
              color: var(--text-color);
            }
      
            .custom-dialog-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: var(--background-color);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              z-index: 1000;
              height: 100%;
              overflow: hidden;
            }
      
            .custom-dialog {
              background: var(--box-background-color);
              border-radius: 12px;
              padding: 40px;
              width: 600px;
              max-width: 80%;
              box-shadow: 0 4px 6px var(--shadow-color);
              color: var(--text-color);
              text-align: center;
              font-size: 26px;
              border: 1px solid var(--border-color);
              transform: scale(var(--scale));
              transition: transform 0.3s ease-in-out;
            }
      
            h1 {
              font-size: 48px;
              margin-bottom: 20px;
              color: var(--text-color);
                  text-shadow: var(--accent-color) 1px 1px 1px;
            }
      
            p {
              font-size: 24px;
              margin-bottom: 30px;
            }
      
            .retry-button {
              padding: 15px 30px;
              font-size: 26px;
              font-weight: bold;
              color: var(--button-text-color);
              background: var(--button-background);
              border: 2px solid var(--border-color);
              border-radius: 8px;
              cursor: pointer;
              transition: background 0.3s ease, transform 0.3s ease;
              box-shadow: var(--shadow-color) 0 4px 8px;
            }
      
            .retry-button:hover {
              background: var(--button-hover-background);
              transform: translateY(-4px);
            }
      
            .retry-button:active {
              background: var(--button-active-background);
              transform: translateY(2px);
            }
      
            .disconnected-logo {
              width: ${getLogoWidth(aspectRatio)}px;
              height: ${getLogoHeight(aspectRatio)}px;
              margin-bottom: 20px;
            }
      
            /* Additional CSS Classes from Provided Styles */
            .osb-logo {
              width: 400px;
              height: 100px;
              margin: auto;
            }
            
            .background {
              position: absolute;
              background-color: var(--background-color);
              width: 100%;
              height: 100%;
            }
            
            /* ... Include other CSS classes as needed ... */
            
            /* Aspect Ratio Classes */
            .server-disconnected-square {
              width: 400px;
              height: 400px;
              margin: auto;
            }
            
            .server-disconnected-wide {
              width: 320px;
              height: 180px;
              margin: auto;
            }
            
            .server-disconnected-portrait {
              width: 180px;
              height: 320px;
              margin: auto;
            }
            
            .server-disconnected-classic {
              width: 240px;
              height: 180px;
              margin: auto;
            }
            
            .server-disconnected-banner {
              width: 600px;
              height: 200px;
              margin: auto;
            }
      
            /* Add any additional styles from your provided CSS here */
          </style>
        </head>
        <body>
          <div class="custom-dialog-backdrop">
            <div class="custom-dialog">
              <h1>Disconnected</h1>
              <img
                class="disconnected-logo server-disconnected-${aspectRatio}"
                src="./images/ServerDisconnected.png"
                alt="Disconnected Logo"
              />
              <p>The server is currently unavailable. Please try again later.</p>
              <button class="retry-button" onclick="retryConnection()">
                Retry Connection
              </button>
            </div>
          </div>
      
          <script>
            function retryConnection() {
              window.location.href = "${retryUrl}";
            }
          </script>
        </body>
      </html>
    `;
}

/**
 * Helper function to determine logo width based on aspect ratio.
 * You can customize these values as needed.
 */
function getLogoWidth(aspectRatio: string): number {
  switch (aspectRatio.toLowerCase()) {
    case "square":
      return 500;
    case "wide":
      return 500;
    case "portrait":
      return 500;
    case "classic":
      return 500;
    case "banner":
      return 500;
    default:
      return 500;
  }
}

/**
 * Helper function to determine logo height based on aspect ratio.
 * You can customize these values as needed.
 */
function getLogoHeight(aspectRatio: string): number {
  switch (aspectRatio.toLowerCase()) {
    case "square":
      return 500;
    case "wide":
      return 500;
    case "portrait":
      return 500;
    case "classic":
      return 500;
    case "banner":
      return 500;
    default:
      return 500;
  }
}
