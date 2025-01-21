import React, { useState, useEffect } from "react";
import "./OSBDisplay5.scss";

interface Plate {
  number: string;
  name: string;
  type: string;
  isNew?: boolean; // used to trigger the slide-in animation
}

const OSBDisplay5: React.FC = () => {
  // 1. Start with some initial orders
  const [plates, setPlates] = useState<Plate[]>([
    { number: "123", name: "Jack Smith", type: "WEB" },
    { number: "124", name: "Jane Doe", type: "STORE" },
    { number: "125", name: "John Doe", type: "WILD CARD" },
    { number: "126", name: "Bob Smith", type: "WEB" },
  ]);

  // 2. Helper function to generate a random new order
  const generateNewPlate = (): Plate => {
    const randomNum = Math.floor(100 + Math.random() * 900).toString(); // random 3-digit number
    const randomName = ["Alice", "Chris", "Diana", "Ethan", "Frank"][
      Math.floor(Math.random() * 5)
    ];
    const randomType = ["WEB", "STORE", "WILD CARD"][
      Math.floor(Math.random() * 3)
    ];
    return {
      number: randomNum,
      name: `${randomName} Johnson`,
      type: randomType,
      isNew: true, // new items get the 'slide-in-fwd-center' animation
    };
  };

  // 3. Interval logic to randomly add or remove an order every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlates((prevPlates) => {
        const newPlates = [...prevPlates];

        // 50% chance to add, 50% chance to remove
        const addOrder = Math.random() < 0.5;

        if (addOrder) {
          // Simulate a new order coming in
          newPlates.push(generateNewPlate());
        } else {
          // Simulate a customer picking up (remove) if we have more than 2 plates
          if (newPlates.length > 2) {
            const removeIndex = Math.floor(Math.random() * newPlates.length);
            newPlates.splice(removeIndex, 1);
          } else {
            // If we only have 2 or fewer, we skip removal and just add
            newPlates.push(generateNewPlate());
          }
        }

        return newPlates;
      });
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // 4. Remove the `isNew` flag once the animation completes
  const handleAnimationEnd = (index: number) => {
    setPlates((prev) => {
      const updated = [...prev];
      if (updated[index] && updated[index].isNew) {
        updated[index].isNew = false;
      }
      return updated;
    });
  };

  return (
    <div className="osb-display-5">
      {/* Top banner/logo section */}
      <div className="banner-header">
        <img className="otms-logo" src="/OTMSLogoCircular.png" alt="" />
        <h1>PICK UP HERE</h1>
      </div>

      {/* Plates row */}
      <div className="plates-wrapper">
        {plates.map((plate, index) => (
          <div
            key={`${plate.number}-${index}`}
            className={`plate-container
              ${plate.type?.toLowerCase().includes("wild") ? "wild-card" : ""}
              ${plate.isNew ? "slide-in-fwd-center" : ""}
            `}
            onAnimationEnd={() => handleAnimationEnd(index)}
          >
            {/* Left side: Number & Name */}
            <div className="plate-left">
              <div className="plate-number">{plate.number}</div>
              <div className="plate-name">{plate.name}</div>
            </div>
            {/* Right side: Plate Type */}
            <div className="plate-right">{plate.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OSBDisplay5;
