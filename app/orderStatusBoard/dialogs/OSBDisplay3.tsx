import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./OSBDisplay3.scss";

type Order = {
  CheckNumber: number;
  StatusId: number; // 1 for prepping, 2 for ready
  CheckTextId: string;
  Group: string; // e.g., "Grill", "Bakery", "Drinks"
};

type Props = {
  pos?: number;
  animate?: boolean;
  imgSrc: string;
  aspectRatio: string;
  orders?: Order[];
  prepIconSrc?: string;
  readyIconSrc?: string;
  groupLogos: { [key: string]: string };
  threeImageAspectRatio: string;
};

// Removed the hard-coded GROUPS array

export default function OSBDisplay3({
  pos = 0,
  animate = false,
  imgSrc,
  aspectRatio,
  orders = [],
  prepIconSrc = "/PrepLogo.png",
  readyIconSrc = "/OrderReady.png",
  groupLogos,
  threeImageAspectRatio,
}: Props) {
  // Example default names for new orders
  const prepNames = ["Marge Simpson", "Lois Griffin", "Rick Sanchez"];
  const readyNames = ["Homer Simpson", "Peter Griffin", "Morty Smith"];

  // Extract group names from groupLogos
  const groupNames = Object.keys(groupLogos);

  // Helper to initialize the order board with separate orders for each group
  const initializeOrders = (): { [key: string]: Order[] } => {
    if (orders.length > 0) {
      return groupNames.reduce((acc, group) => {
        acc[group] = orders.filter((order) => order.Group === group);
        return acc;
      }, {} as { [key: string]: Order[] });
    }

    // Otherwise, create some starter orders for each group
    return groupNames.reduce((acc, group) => {
      acc[group] = [
        {
          CheckNumber: 121,
          StatusId: 1,
          CheckTextId: "Fred Johnson",
          Group: group,
        },
        {
          CheckNumber: 122,
          StatusId: 1,
          CheckTextId: "Alice Smith",
          Group: group,
        },
        {
          CheckNumber: 124,
          StatusId: 2,
          CheckTextId: "Mary Adams",
          Group: group,
        },
      ];
      return acc;
    }, {} as { [key: string]: Order[] });
  };

  // Keep orders in state, keyed by group
  const [displayOrders, setDisplayOrders] = useState<{
    [key: string]: Order[];
  }>(initializeOrders());

  // Track the current check number so each new order is unique
  const [currentCheckNumber, setCurrentCheckNumber] = useState<number>(300);

  // We’ll store our timeouts here so we can clear them on unmount
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    let isMounted = true; // flag to avoid state updates after unmount

    // Our possible actions
    const actions = ["addPrep", "changeToReady", "removeReady"] as const;
    type Action = (typeof actions)[number];

    /**
     * Pick a random action, but if the group has 8 or more orders,
     * skip "addPrep" and only choose between "changeToReady" or "removeReady".
     */
    const pickAction = (numOrders: number): Action => {
      if (numOrders >= 8) {
        // If column is at capacity, skip adding
        const restrictedActions: Action[] = ["changeToReady", "removeReady"];
        return restrictedActions[
          Math.floor(Math.random() * restrictedActions.length)
        ];
      } else {
        // Otherwise pick from all three
        return actions[Math.floor(Math.random() * actions.length)];
      }
    };

    const performRandomAction = () => {
      setDisplayOrders((prevOrders) => {
        // We'll copy the object so React sees changes
        const newOrders = { ...prevOrders };

        // Randomly pick a group
        const randomGroup =
          groupNames[Math.floor(Math.random() * groupNames.length)];
        const currentGroupOrders = newOrders[randomGroup];

        // Choose an action based on the group’s size
        const randomAction = pickAction(currentGroupOrders.length);

        switch (randomAction) {
          case "addPrep": {
            // Only add if the group has fewer than 8 orders
            if (currentGroupOrders.length < 8) {
              setCurrentCheckNumber((prev) => {
                const nextCheckNumber = prev + 1;
                // Create a new “prepping” order with a random name
                const newOrder: Order = {
                  CheckNumber: nextCheckNumber,
                  StatusId: 1,
                  CheckTextId:
                    prepNames[Math.floor(Math.random() * prepNames.length)],
                  Group: randomGroup,
                };
                newOrders[randomGroup] = [...currentGroupOrders, newOrder];
                return nextCheckNumber;
              });
            }
            return newOrders;
          }

          case "changeToReady": {
            // Change a single “prepping” order to “ready”
            const preppingOrders = currentGroupOrders.filter(
              (o) => o.StatusId === 1
            );
            if (preppingOrders.length > 0) {
              const orderToReady =
                preppingOrders[
                  Math.floor(Math.random() * preppingOrders.length)
                ];
              // Optionally rename the order using `readyNames`
              // orderToReady.CheckTextId = readyNames[Math.floor(Math.random() * readyNames.length)];

              newOrders[randomGroup] = currentGroupOrders.map((o) =>
                o.CheckNumber === orderToReady.CheckNumber
                  ? { ...o, StatusId: 2 }
                  : o
              );
            }
            return newOrders;
          }

          case "removeReady": {
            // Remove a single “ready” order
            const readyOrders = currentGroupOrders.filter(
              (o) => o.StatusId === 2
            );
            if (readyOrders.length > 0) {
              const orderToRemove =
                readyOrders[Math.floor(Math.random() * readyOrders.length)];
              newOrders[randomGroup] = currentGroupOrders.filter(
                (o) => o.CheckNumber !== orderToRemove.CheckNumber
              );
            }
            return newOrders;
          }

          default:
            return newOrders;
        }
      });
    };

    // Randomly schedules the next action 2-4 seconds from now
    const scheduleNextAction = () => {
      const delay = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          performRandomAction();
          scheduleNextAction(); // chain the next action
        }
      }, delay);
      timeoutsRef.current.push(timeoutId);
    };

    // Start the chain of actions
    scheduleNextAction();

    return () => {
      isMounted = false;
      // Clear any pending timeouts
      timeoutsRef.current.forEach((tid) => clearTimeout(tid));
      timeoutsRef.current = [];
    };
  }, [groupNames, prepNames, readyNames, orders]);

  // Helper to render a single order item
  const renderOrderItem = (order: Order) => {
    const statusClass = `checkNumber checkNumberStatusId${order.StatusId}`;
    const statusLogoSrc = order.StatusId === 1 ? prepIconSrc : readyIconSrc;

    return (
      <div className="orderItem animate" key={order.CheckNumber}>
        <div className={statusClass}>
          <div className="checkNumberText name">
            {order.CheckTextId}
            <br />
            <span className="checknumber-row">
              <div className="checkNumberText">Order #{order.CheckNumber}</div>
              <img
                className="order-logo"
                src={statusLogoSrc}
                alt={order.StatusId === 1 ? "Prepping" : "Ready"}
              />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`custom-dialog-backdrop margin-${pos}`}>
      <div className={`osb-dialog ${animate ? "animate" : ""}`}>
        <div className="orderlist">
          {groupNames.map((group) => (
            <div key={group} className="group-orderlist">
              {/* Group logo instead of title text */}
              <div className="group-logo">
                <img
                  src={groupLogos[group]}
                  alt={`${group} logo`}
                  className={`${threeImageAspectRatio}`}
                />
              </div>
              {/* Prepping orders */}
              <div id={`listView-${group}-prepping`}>
                {displayOrders[group]
                  ?.filter((o) => o.StatusId === 1)
                  .map(renderOrderItem)}
              </div>
              {/* Ready orders */}
              <div id={`listView-${group}-ready`}>
                {displayOrders[group]
                  ?.filter((o) => o.StatusId === 2)
                  .map(renderOrderItem)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
