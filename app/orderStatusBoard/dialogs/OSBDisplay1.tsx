import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./OSBDisplay1.scss";

type Order = {
  CheckNumber: number;
  StatusId: number; // 1 for prepping, 2 for ready
  CheckTextId: string;
};

type Props = {
  pos?: number;
  animate?: boolean;
  imgSrc: string;
  aspectRatio: string;
  orders?: Order[];
  prepIconSrc?: string;
  readyIconSrc?: string;
};

export default function OSBDisplay1({
  pos = 0,
  animate = false,
  imgSrc,
  aspectRatio,
  orders,
  prepIconSrc = "./images/PrepLogo.png",
  readyIconSrc = "./images/OrderReady.png",
}: Props) {
  // Names for randomly assigned CheckTextId
  const prepNames = ["Marge Simpson", "Lois Griffin", "Rick Sanchez"];
  const readyNames = ["Homer Simpson", "Peter Griffin", "Morty Smith"];

  // Initial orders: 2 prepping, 1 ready
  const initialOrders: Order[] =
    orders && orders.length > 0
      ? orders
      : [
          { CheckNumber: 121, StatusId: 1, CheckTextId: "Fred Johnson" },
          { CheckNumber: 122, StatusId: 1, CheckTextId: "Alice Smith" },
          { CheckNumber: 124, StatusId: 2, CheckTextId: "Mary Adams" },
        ];

  const [displayOrders, setDisplayOrders] = useState<Order[]>(initialOrders);
  const [currentCheckNumber, setCurrentCheckNumber] = useState<number>(300); // Starting point for new orders

  // Possible actions
  const actions = [
    "addPrep",
    "addReady",
    "removeReady",
    "removePrepAddReady",
    "removeReadyAddPrep",
  ] as const;
  type Action = (typeof actions)[number];

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayOrders((prevOrders) => {
        let newOrders = [...prevOrders];
        let newCheckNumber = currentCheckNumber;

        const preppingOrders = newOrders.filter((o) => o.StatusId === 1);
        const readyOrders = newOrders.filter((o) => o.StatusId === 2);

        const randomAction: Action =
          actions[Math.floor(Math.random() * actions.length)];

        switch (randomAction) {
          case "addPrep": {
            newCheckNumber++;
            const newPreppingOrder: Order = {
              CheckNumber: newCheckNumber,
              StatusId: 1,
              CheckTextId:
                prepNames[Math.floor(Math.random() * prepNames.length)],
            };
            newOrders.push(newPreppingOrder);
            break;
          }
          case "addReady": {
            newCheckNumber++;
            const newReadyOrder: Order = {
              CheckNumber: newCheckNumber,
              StatusId: 2,
              CheckTextId:
                readyNames[Math.floor(Math.random() * readyNames.length)],
            };
            newOrders.push(newReadyOrder);
            break;
          }
          case "removeReady": {
            // Remove the oldest ready order if there's more than 1
            const updatedReady = newOrders.filter((o) => o.StatusId === 2);
            if (updatedReady.length > 1) {
              const oldestReady = updatedReady[0];
              newOrders = newOrders.filter((o) => o !== oldestReady);
            }
            break;
          }
          case "removePrepAddReady": {
            // Remove the oldest prepping order if >1, then add a ready order
            const updatedPrepping = newOrders.filter((o) => o.StatusId === 1);
            if (updatedPrepping.length > 1) {
              const oldestPrepping = updatedPrepping[0];
              newOrders = newOrders.filter((o) => o !== oldestPrepping);

              newCheckNumber++;
              const newReadyOrder: Order = {
                CheckNumber: newCheckNumber,
                StatusId: 2,
                CheckTextId:
                  readyNames[Math.floor(Math.random() * readyNames.length)],
              };
              newOrders.push(newReadyOrder);
            }
            break;
          }
          case "removeReadyAddPrep": {
            // Remove the oldest ready order if >1, then add a prepping order
            const updatedReady = newOrders.filter((o) => o.StatusId === 2);
            if (updatedReady.length > 1) {
              const oldestReady = updatedReady[0];
              newOrders = newOrders.filter((o) => o !== oldestReady);

              newCheckNumber++;
              const newPreppingOrder: Order = {
                CheckNumber: newCheckNumber,
                StatusId: 1,
                CheckTextId:
                  prepNames[Math.floor(Math.random() * prepNames.length)],
              };
              newOrders.push(newPreppingOrder);
            }
            break;
          }
        }

        // Ensure max of 6 prepping orders
        const finalPrepping = newOrders.filter((o) => o.StatusId === 1);
        if (finalPrepping.length > 6) {
          // Remove oldest until we have 6
          while (newOrders.filter((o) => o.StatusId === 1).length > 6) {
            const oldest = newOrders.filter((o) => o.StatusId === 1)[0];
            newOrders = newOrders.filter((o) => o !== oldest);
          }
        }

        // Ensure max of 6 ready orders
        const finalReady = newOrders.filter((o) => o.StatusId === 2);
        if (finalReady.length > 6) {
          // Remove oldest until we have 6
          while (newOrders.filter((o) => o.StatusId === 2).length > 6) {
            const oldest = newOrders.filter((o) => o.StatusId === 2)[0];
            newOrders = newOrders.filter((o) => o !== oldest);
          }
        }

        // Ensure at least one order in each category
        const finalPreppingCheck = newOrders.filter((o) => o.StatusId === 1);
        const finalReadyCheck = newOrders.filter((o) => o.StatusId === 2);

        if (finalPreppingCheck.length === 0) {
          newCheckNumber++;
          newOrders.push({
            CheckNumber: newCheckNumber,
            StatusId: 1,
            CheckTextId: `Prepping Order #${newCheckNumber}`,
          });
        }

        if (finalReadyCheck.length === 0) {
          newCheckNumber++;
          newOrders.push({
            CheckNumber: newCheckNumber,
            StatusId: 2,
            CheckTextId: `Ready Order #${newCheckNumber}`,
          });
        }

        setCurrentCheckNumber(newCheckNumber);
        return newOrders;
      });
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, [currentCheckNumber]);

  const preppingOrders = displayOrders.filter((o) => o.StatusId === 1);
  const readyOrders = displayOrders.filter((o) => o.StatusId === 2);

  const renderOrderItem = (order: Order) => {
    const divCheckNumberCustomClass = `checkNumber checkNumberStatusId${order.StatusId}`;
    const logoSrc = order.StatusId === 1 ? prepIconSrc : readyIconSrc;

    return (
      <div className="orderItem animate" key={order.CheckNumber}>
        <div className={divCheckNumberCustomClass}>
          <div className="checkNumberText name">
            {order.CheckTextId} <br />
            <span className="checknumber-row">
              <div className="checkNumberText">Order #{order.CheckNumber}</div>
              <img
                className="order-logo"
                id="order-logo"
                src={logoSrc}
                alt="Logo"
              />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`custom-dialog-backdrop margin-${pos}`}>
      <div className={`osb-dialog  ${animate ? "animate" : ""}`}>
        <Image
          className={`osb-logo osb-logo-${aspectRatio}`}
          src={imgSrc}
          alt="Logo"
          width={600}
          height={175}
        />
        <div className="header">
          <h2>Prepping Orders</h2>
          <h2>Orders Ready</h2>
        </div>
        <div className="content">
          <div className="orderlist">
            <div id="listView1">{preppingOrders.map(renderOrderItem)}</div>
            <div id="listView2">{readyOrders.map(renderOrderItem)}</div>
          </div>
          <div className="vertical-line"></div>
        </div>
      </div>
    </div>
  );
}
