// utils/getOSBDisplay1Html.ts

export function getOSBDisplay2Html(
  imgSrc: string, // Path to the main logo image
  aspectRatio: string, // e.g., 'square', 'wide', 'portrait', 'classic', 'banner'
  backgroundColor: string,
  accentColor: string,
  buttonBackground: string,
  buttonHoverBackground: string,
  buttonActiveBackground: string,
  buttonBorderColor: string,
  buttonTextColor: string,
  shadowColor: string,
  textColor: string,
  prepIconSrc: string = "./images/PrepLogo.png",
  readyIconSrc: string = "./images/OrderReady.png",
  scale: string = "1" // Optional scaling
): string {
  return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Current Orders</title>
        
            <!-- Kendo and jQuery -->
            <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
            <link
              href="http://cdn.kendostatic.com/2015.1.429/styles/kendo.common.min.css"
              rel="stylesheet"
            />
            <link
              href="http://cdn.kendostatic.com/2015.1.429/styles/kendo.rtl.min.css"
              rel="stylesheet"
            />
            <link
              href="http://cdn.kendostatic.com/2015.1.429/styles/kendo.default.min.css"
              rel="stylesheet"
            />
            <link
              href="http://cdn.kendostatic.com/2015.1.429/styles/kendo.dataviz.min.css"
              rel="stylesheet"
            />
            <link
              href="http://cdn.kendostatic.com/2015.1.429/styles/kendo.dataviz.default.min.css"
              rel="stylesheet"
            />
            <script src="http://cdn.kendostatic.com/2015.1.429/js/kendo.all.min.js"></script>
        
            <!-- Fonts if needed -->
            <style>
              @font-face {
                font-family: "Montserrat";
                src: url("./fonts/Montserrat-Medium.ttf");
              }
              @font-face {
                font-family: "PassionOne";
                src: url("./fonts/PassionOne-Regular.ttf");
              }
        
              :root {
                --accent-color: ${accentColor};
                --background-color: ${backgroundColor};
                --button-active-background: ${buttonActiveBackground};
                --button-background: ${buttonBackground};
                --button-border-color: ${buttonBorderColor};
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
                transform: scale(var(--scale));
                transform-origin: top left;
              }
        
              .osb-logo {
                width: 600px;
                height: 175px;
                margin: auto;
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
                height: 100%; /* Fill entire viewport */
                overflow: hidden; /* No scrolling if you don't want it */
              }
        
              .custom-dialog {
                background-color: var(--background-color);
                color: var(--text-color);
                text-align: left;
                font-size: 26px;
                transform: scale(var(--scale));
                position: relative;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                box-shadow: 0 4px 6px var(--shadow-color);
              }
        
              .custom-dialog-header {
                text-align: center;
                font-size: 48px;
                color: var(--text-color);
                margin-top: 0;
                font-weight: 700;
                text-transform: uppercase;
                text-shadow: -1px -1px 0 var(--accent-color),
                  1px -1px 0 var(--accent-color), -1px 1px 0 var(--accent-color),
                  1px 1px 0 var(--accent-color);
              }
        
              .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                margin-bottom: 1rem;
                position: relative;
              }
        
              .header h2 {
                font-size: 3rem;
                text-shadow: -1px -1px 0 var(--accent-color),
                  1px -1px 0 var(--accent-color), -1px 1px 0 var(--accent-color),
                  1px 1px 0 var(--accent-color);
                color: var(--text-color);
                margin: 0rem;
              }
        
              .content {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;
                position: relative;
                height: 100%;
              }
        
              .orderlist {
                display: flex;
                width: 100%;
                height: 100%;
                flex: 1;
                overflow: auto; /* Scroll if too many orders */
              }
        
              #listView1,
              #listView2 {
                width: 50%;
                padding: 1rem;
                border-top: 1px solid var(--accent-color);
                background: var(--background-color);
              }
        
              /* .vertical-line {
                position: absolute;
                width: 2px;
                background-color: var(--accent-color);
                top: 0;
                bottom: 0;
                left: 50%;
                opacity: 0;
              } */
        
              .k-listview {
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start; /* Start items at the top */
                height: 100%;
              }
        
              .orderItem {
                background: var(--background-color);
                border: 1px solid var(--button-border-color);
                border-radius: 8px;
                margin: 1rem;
                padding: 0.25rem 0.5rem;
                box-shadow: var(--shadow-color) 0 4px 8px;
                position: relative;
                flex: 0 0 calc(50% - 2rem); /* Two items per row */
                box-sizing: border-box;
              }
        
              .checkNumber {
                font-family: "Montserrat";
                font-size: 1.2rem;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.5rem;
              }
        
              .checkNumberText {
                overflow: inherit;
                text-overflow: inherit;
                width: 100%;
                color: var(--text-color);
                font-size: 26px;
              }
        
              .checkText {
                font-size: 1rem;
                color: #555;
              }
        
              .animate {
                animation: fadeInScale 0.5s ease-in-out forwards;
              }
        
              @keyframes fadeInScale {
                0% {
                  opacity: 0;
                  transform: scale(0.9);
                }
        
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }
        
              #pager1,
              #pager2 {
                display: none;
              }
        
              .prep-logo {
                width: 450px;
                height: 250px;
              }
        
              @keyframes alarm-move {
                0% {
                  transform: translateY(0);
                }
                5% {
                  transform: translateY(-20px);
                }
                10%,
                15% {
                  transform: translateX(-10px) rotate(-10deg);
                }
                12.5%,
                17.5% {
                  transform: translateX(10px) rotate(10deg);
                }
                20% {
                  transform: translateY(-20px);
                }
                25% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(0);
                }
              }
        
              @keyframes shake-lr {
                0%,
                100% {
                  -webkit-transform: rotate(0deg);
                  transform: rotate(0deg);
                  -webkit-transform-origin: 50% 50%;
                  transform-origin: 50% 50%;
                }
                10% {
                  -webkit-transform: rotate(8deg);
                  transform: rotate(8deg);
                }
                20%,
                40%,
                60% {
                  -webkit-transform: rotate(-10deg);
                  transform: rotate(-10deg);
                }
                30%,
                50%,
                70% {
                  -webkit-transform: rotate(10deg);
                  transform: rotate(10deg);
                }
                80% {
                  -webkit-transform: rotate(-8deg);
                  transform: rotate(-8deg);
                }
                90% {
                  -webkit-transform: rotate(8deg);
                  transform: rotate(8deg);
                }
              }
        
              .order-logo {
                width: 50px;
                position: fixed;
                top: -20px;
                right: -25px;
                animation: shake-lr 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) 1s both;
                z-index: 999;
              }
        
              .checknumber-row {
                display: flex;
                align-items: center;
              }
        
              .name {
                font-size: 28px;
              }
            </style>
          </head>
          <body>
            <div class="custom-dialog-backdrop">
              <div class="custom-dialog">
                <img
                  class="osb-logo ${getOsbLogoClass(aspectRatio)}"
                  id="graphic-top-left"
                  src="./images${imgSrc}"
                  alt="Logo"
                />
                <!-- <h2 class="custom-dialog-header">Current Orders</h2> -->
        
                <div class="header">
                  <h2>Prepping Orders <span> </span></h2>
        
                  <!-- <img
                    class="prep-logo"
                    id="graphic-top-left"
                    src="./images/OrderPrep.png"
                    alt="Logo"
                  /> -->
                  <h2>Orders Ready</h2>
                  <!-- <img
                    class="prep-logo"
                    id="graphic-top-left"
                    src="./images/OrderReady.png"
                    alt="Logo"
                  /> -->
                </div>
                <div class="content">
                  <div class="orderlist">
                    <div id="listView1"></div>
                    <div id="listView2"></div>
                  </div>
                  <div class="vertical-line"></div>
                </div>
              </div>
            </div>
        
            <!-- Kendo Template -->
            <script type="text/x-kendo-template" id="template">
              # var divCheckNumberCustomClass = 'checkNumber checkNumberStatusId' + StatusId; #
              # var logoSrc = (StatusId === 1) ? './images/PrepLogo.png' : './images/ReadyLogo.png'; #
        
              # if (CheckTextId === '') { #
                <div class="orderItem animate">
                  <div class="#= divCheckNumberCustomClass #">
                    <div class="checkNumberText">Order #:CheckNumber#</div>
                    <img class="order-logo" id="order-logo" src="#= logoSrc #" alt="Logo" />
                  </div>
                </div>
              # } else { #
                <div class="orderItem animate">
                  <div class="#= divCheckNumberCustomClass #">
                    <div class="checkNumberText name">
                      #:CheckTextId# <br>
                      <span class="checknumber-row">
                        <div class="checkNumberText">Order #:CheckNumber#</div>
                        <img class="order-logo" id="order-logo" src="#= logoSrc #" alt="Logo" />
                      </span>
                    </div>
                  </div>
                </div>
              # } #
            </script>
        
      <script>
        $(document).ready(function () {
          $("#listView1").on("dblclick", ".col", doubleClick1);
          $("#listView2").on("dblclick", ".orderItem", doubleClick2);
  
          function doubleClick1() {
            var uid = $(this).data("uid");
            var listView = $("#listView1").data("kendoListView");
            var item = listView.dataSource.getByUid(uid);
            selected = item.CheckGuid;
          }
  
          function doubleClick2() {
            var uid = $(this).data("uid");
            var listView = $("#listView2").data("kendoListView");
            var item = listView.dataSource.getByUid(uid);
            selected = item.CheckGuid;
            if (
              window.callback &&
              typeof window.callback.showMessage === "function"
            ) {
              callback.showMessage(selected);
            }
          }
        });
  
        // More dummy orders for demonstration:
        // StatusId = 1 (Preparing), StatusId = 2 (Now Ready)
        var orders = [
          // Preparing Orders (StatusId=1)
          { CheckNumber: 121, StatusId: 1, CheckTextId: "Fred Johnson" },
          { CheckNumber: 122, StatusId: 1, CheckTextId: "Alice Smith" },
          { CheckNumber: 124, StatusId: 1, CheckTextId: "Mary Adams" },
          { CheckNumber: 125, StatusId: 1, CheckTextId: "John Brown" },
          { CheckNumber: 126, StatusId: 1, CheckTextId: "Carol White" },
  
          // Now Ready Orders (StatusId=2)
          { CheckNumber: 201, StatusId: 2, CheckTextId: "Steven Wilson" },
          { CheckNumber: 202, StatusId: 2, CheckTextId: "Margaret Taylor" },
          { CheckNumber: 203, StatusId: 2, CheckTextId: "Andrew Davis" },
          { CheckNumber: 204, StatusId: 2, CheckTextId: "Julie Clark" },
          { CheckNumber: 205, StatusId: 2, CheckTextId: "Patrick Harris" },
          { CheckNumber: 206, StatusId: 2, CheckTextId: "Kimberly Scott" },
        ];
  
        function bind() {
          var dataSource1 = new kendo.data.DataSource({
            data: orders,
            pageSize: 50,
            filter: { field: "StatusId", operator: "eq", value: 1 },
          });
          var dataSource2 = new kendo.data.DataSource({
            data: orders,
            pageSize: 18,
            filter: { field: "StatusId", operator: "eq", value: 2 },
          });
  
          $("#listView1").kendoListView({
            dataSource: dataSource1,
            template: kendo.template($("#template").html()),
          });
  
          $("#listView2").kendoListView({
            dataSource: dataSource2,
            template: kendo.template($("#template").html()),
          });
  
          kendo.bind(document.body, { dataSource: dataSource1 });
          kendo.bind(document.body, { dataSource: dataSource2 });
        }
  
        $(function () {
          bind();
        });
      </script>
          </body>
        </html>
      `;
}

/**
 * Helper function to determine the OSB logo class based on aspect ratio.
 */
function getOsbLogoClass(aspectRatio: string): string {
  switch (aspectRatio.toLowerCase()) {
    case "square":
      return "osb-logo-square";
    case "wide":
      return "osb-logo-wide";
    case "portrait":
      return "osb-logo-portrait";
    case "classic":
      return "osb-logo-classic";
    case "banner":
      return "osb-logo-banner";
    default:
      return "osb-logo-square";
  }
}