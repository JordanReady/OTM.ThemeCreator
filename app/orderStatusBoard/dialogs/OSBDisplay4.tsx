import React, { useEffect, useState, useRef } from "react";
import "./OsbDisplay4.scss";

// Simple interface for an order
interface OrderType {
  number: number;
  name: string;
}

// A small pool of random names we’ll pick from
const NAMES = [
  "Mike R.",
  "Ana T.",
  "Lily H.",
  "John D.",
  "Sarah K.",
  "Bob C.",
  "Jane L.",
  "Tim P.",
];

const OSBDisplay4 = () => {
  // ----------------------------
  //  State: Orders
  // ----------------------------
  // Start with a few sample orders
  const [gettingReady, setGettingReady] = useState<OrderType[]>([
    { number: 211, name: "Mike R." },
    { number: 212, name: "Ana T." },
    { number: 213, name: "Lily H." },
  ]);
  const [ordersReady, setOrdersReady] = useState<OrderType[]>([
    { number: 206, name: "John D." },
    { number: 207, name: "Sarah K." },
    { number: 208, name: "Bob C." },
    { number: 209, name: "Jane L." },
    { number: 210, name: "Tim P." },
  ]);

  // We'll keep a counter for new order numbers
  const [nextOrderNumber, setNextOrderNumber] = useState(300);

  // Intervals for simulating new orders, moving, removing
  const addOrderIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const moveOrderIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const removeOrderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ----------------------------
  //  Images to Cycle (Top / Bottom)
  // ----------------------------
  const cycleImagesTop = [
    "/SpecialBurger.png",
    "/SpecialSub.png",
    "/SpecialChicken.png",
  ];
  const cycleImagesBottom = [
    "/SpecialSmoothies.png",
    "/SpecialShakes.png",
    "/SpecialSweets.png",
  ];

  // ----------------------------
  //  State for Top Slider
  // ----------------------------
  const [topCurrentIndex, setTopCurrentIndex] = useState(0);
  const [topNextIndex, setTopNextIndex] = useState<number | null>(null);
  const [topTransitioning, setTopTransitioning] = useState(false);

  // ----------------------------
  //  State for Bottom Slider
  // ----------------------------
  const [bottomCurrentIndex, setBottomCurrentIndex] = useState(0);
  const [bottomNextIndex, setBottomNextIndex] = useState<number | null>(null);
  const [bottomTransitioning, setBottomTransitioning] = useState(false);

  // Refs to track intervals/timeouts for image sliders
  const topIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const bottomIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const topInitialTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ----------------------------
  //  Simulate new orders coming in
  // ----------------------------
  useEffect(() => {
    // Every 10s, add a new order to "Getting Ready"
    addOrderIntervalRef.current = setInterval(() => {
      addNewOrder();
    }, 10000);

    return () => {
      if (addOrderIntervalRef.current)
        clearInterval(addOrderIntervalRef.current);
    };
  }, []);

  // Add a new order to "Getting Ready"
  const addNewOrder = () => {
    const randomNameIndex = Math.floor(Math.random() * NAMES.length);
    const newOrder: OrderType = {
      number: nextOrderNumber,
      name: NAMES[randomNameIndex],
    };

    setNextOrderNumber((prev) => prev + 1); // increment for the next new order
    setGettingReady((prev) => [...prev, newOrder]);
    console.log("Added new order:", newOrder);
  };

  // ----------------------------
  //  Simulate moving an order from "Getting Ready" to "Ready for Pickup"
  // ----------------------------
  useEffect(() => {
    // Every 7s, move an order if we have any in "Getting Ready"
    moveOrderIntervalRef.current = setInterval(() => {
      moveOrderToReady();
    }, 7000);

    return () => {
      if (moveOrderIntervalRef.current)
        clearInterval(moveOrderIntervalRef.current);
    };
  }, []);

  const moveOrderToReady = () => {
    // if there's at least one order in "gettingReady"
    if (gettingReady.length > 0) {
      // remove the first order from "gettingReady"
      const [firstOrder, ...rest] = gettingReady;
      setGettingReady(rest);

      // add it to "ordersReady"
      setOrdersReady((prev) => [...prev, firstOrder]);
      console.log("Moved order to ready:", firstOrder.number);
    }
  };

  // ----------------------------
  //  Simulate removing an order (picked up by a customer)
  // ----------------------------
  useEffect(() => {
    // Every 9s, remove an order if we have any in "ordersReady"
    removeOrderIntervalRef.current = setInterval(() => {
      removeOrderFromReady();
    }, 9000);

    return () => {
      if (removeOrderIntervalRef.current)
        clearInterval(removeOrderIntervalRef.current);
    };
  }, []);

  const removeOrderFromReady = () => {
    if (ordersReady.length > 0) {
      // remove the first order from "ordersReady"
      const [firstOrder, ...rest] = ordersReady;
      setOrdersReady(rest);
      console.log("Removed order from ready:", firstOrder.number);
    }
  };

  // ----------------------------
  //  Top Images: 3s offset for first change, then every 6s
  // ----------------------------
  useEffect(() => {
    // Start the first cycle at 3 seconds
    topInitialTimeoutRef.current = setTimeout(() => {
      handleNextImageTop();
      // Then, continue cycling every 6 seconds
      topIntervalRef.current = setInterval(() => {
        handleNextImageTop();
      }, 6000);
    }, 3000);

    // Cleanup
    return () => {
      if (topInitialTimeoutRef.current)
        clearTimeout(topInitialTimeoutRef.current);
      if (topIntervalRef.current) clearInterval(topIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [cycleImagesTop.length]);

  // ----------------------------
  //  Bottom Images: every 6s
  // ----------------------------
  useEffect(() => {
    bottomIntervalRef.current = setInterval(() => {
      handleNextImageBottom();
    }, 6000);

    // Cleanup
    return () => {
      if (bottomIntervalRef.current) clearInterval(bottomIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [cycleImagesBottom.length]);

  // ----------------------------
  //  Handlers: Next Image (Top / Bottom)
  // ----------------------------
  const handleNextImageTop = () => {
    if (topTransitioning) return;
    const newIndex = (topCurrentIndex + 1) % cycleImagesTop.length;
    setTopNextIndex(newIndex);
    setTopTransitioning(true);
  };

  const handleNextImageBottom = () => {
    if (bottomTransitioning) return;
    const newIndex = (bottomCurrentIndex + 1) % cycleImagesBottom.length;
    setBottomNextIndex(newIndex);
    setBottomTransitioning(true);
  };

  // ----------------------------
  //  Animation End Callbacks
  // ----------------------------
  const onTopAnimationEnd = (e: React.AnimationEvent<HTMLImageElement>) => {
    if (e.currentTarget.classList.contains("slide-out-left")) {
      if (topNextIndex !== null) {
        setTopCurrentIndex(topNextIndex);
        setTopNextIndex(null);
      }
      setTopTransitioning(false);
    }
  };

  const onBottomAnimationEnd = (e: React.AnimationEvent<HTMLImageElement>) => {
    if (e.currentTarget.classList.contains("slide-out-left")) {
      if (bottomNextIndex !== null) {
        setBottomCurrentIndex(bottomNextIndex);
        setBottomNextIndex(null);
      }
      setBottomTransitioning(false);
    }
  };

  // ----------------------------
  //  Which images to show?
  // ----------------------------
  const topCurrentImage = cycleImagesTop[topCurrentIndex];
  const topNextImage =
    topNextIndex !== null ? cycleImagesTop[topNextIndex] : null;

  const bottomCurrentImage = cycleImagesBottom[bottomCurrentIndex];
  const bottomNextImage =
    bottomNextIndex !== null ? cycleImagesBottom[bottomNextIndex] : null;

  return (
    <div className="osb-container">
      {/* Left Section: Orders */}
      <div className="osb-left-section">
        {/* Getting Ready */}
        <div className="osb-getting-ready">
          {/* <img
            className="osb-getting-ready-sign"
            src="/SignGettingReady.png"
            alt=""
          /> */}
          <h2>Getting Orders Ready</h2>
          <div className="osb-getting-ready-list">
            {gettingReady.map((order) => (
              <div key={order.number} className="osb-order-item bounce-in-top">
                <div className="osb-order-number">{order.number}</div>
                <div className="osb-order-name">{order.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Ready */}
        <div className="osb-orders-ready">
          {/* <img
            className="osb-ready-pickup-sign"
            src="/SignOrdersReadyPickup.png"
            alt=""
          /> */}
          <h2>Orders Ready for Pickup</h2>
          <div className="osb-orders-ready-list">
            {ordersReady.map((order) => (
              <div key={order.number} className="osb-order-item bounce-in-top">
                <div className="osb-order-number">{order.number}</div>
                <div className="osb-order-name">{order.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Logo + 2 Cycling Image Sections */}
      <div className="osb-right-section">
        {/* Top: Logo */}
        <div className="osb-logo-section">
          <img src="/OTMSFoodShackLogo.png" alt="Logo" className="osb-logo" />
        </div>

        {/* Middle: Cycling Images (Top) */}
        <div className="osb-cycle-section">
          {/* Current Image */}
          <img
            src={topCurrentImage}
            alt="Menu Cycle Top"
            className={
              topTransitioning
                ? "osb-cycle-image slide-out-left"
                : "osb-cycle-image slide-in-stable"
            }
            onAnimationEnd={onTopAnimationEnd}
          />

          {/* Next Image (only shown if in transition) */}
          {topNextImage && (
            <img
              src={topNextImage}
              alt="Next Top"
              className="osb-cycle-image slide-in-right"
            />
          )}
        </div>

        {/* Bottom: Cycling Images */}
        <div className="osb-cycle-section">
          {/* Current Image */}
          <img
            src={bottomCurrentImage}
            alt="Menu Cycle Bottom"
            className={
              bottomTransitioning
                ? "osb-cycle-image slide-out-left"
                : "osb-cycle-image slide-in-stable"
            }
            onAnimationEnd={onBottomAnimationEnd}
          />

          {/* Next Image (only shown if in transition) */}
          {bottomNextImage && (
            <img
              src={bottomNextImage}
              alt="Next Bottom"
              className="osb-cycle-image slide-in-right"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OSBDisplay4;
