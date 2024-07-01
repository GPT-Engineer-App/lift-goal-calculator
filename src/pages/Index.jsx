import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [goalWeight, setGoalWeight] = useState("");
  const [plates, setPlates] = useState([]);

  const plateWeights = [45, 35, 25, 10, 5, 2.5];

  const calculatePlates = (weight) => {
    let remainingWeight = weight - 45; // Subtract the bar weight
    const plateCount = [];

    if (remainingWeight < 0) {
      return [];
    }

    for (let i = 0; i < plateWeights.length; i++) {
      const plateWeight = plateWeights[i];
      const count = Math.floor(remainingWeight / (plateWeight * 2));
      if (count > 0) {
        plateCount.push({ weight: plateWeight, count: count * 2 }); // Ensure count is always in multiples of 2
        remainingWeight -= count * plateWeight * 2;
      }
    }

    return plateCount;
  };

  const handleCalculate = () => {
    const weight = parseFloat(goalWeight);
    if (!isNaN(weight) && weight > 45) {
      setPlates(calculatePlates(weight));
    } else {
      setPlates([]);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Weightlifting Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              type="number"
              placeholder="Enter goal weight (lbs)"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              className="text-center"
            />
            <Button onClick={handleCalculate}>Calculate</Button>
            <div>
              {plates.length > 0 ? (
                <div>
                  <h2 className="text-xl text-center mb-4">Add the following plates:</h2>
                  <ul className="space-y-2">
                    {plates.map((plate, index) => (
                      <li key={index} className="text-center">
                        {plate.count} x {plate.weight} lbs
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center">Enter a valid weight above 45 lbs.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;