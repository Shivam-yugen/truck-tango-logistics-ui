
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CityInput {
  demand: number;
  deadline: number;
}

const LogisticsForm = () => {
  const { toast } = useToast();
  const [numCities, setNumCities] = useState<number>(0);
  const [truckCapacity, setTruckCapacity] = useState<number>(0);
  const [cities, setCities] = useState<CityInput[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleNumCitiesChange = (value: number) => {
    const newValue = Math.max(0, value);
    setNumCities(newValue);
    setCities(Array(newValue).fill({ demand: 0, deadline: 0 }));
    setShowResult(false);
  };

  const updateCity = (index: number, field: keyof CityInput, value: number) => {
    const newCities = [...cities];
    newCities[index] = { ...newCities[index], [field]: value };
    setCities(newCities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (numCities <= 0 || truckCapacity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for cities and truck capacity",
        variant: "destructive",
      });
      return;
    }

    const isValid = cities.every(city => city.demand > 0 && city.deadline > 0);
    if (!isValid) {
      toast({
        title: "Invalid Input",
        description: "All demands and deadlines must be positive numbers",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, we'll just set a mock result
    const mockResult = Math.ceil(cities.reduce((sum, city) => sum + city.demand, 0) / truckCapacity);
    setResult(mockResult);
    setShowResult(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Cities (N)</label>
          <Input
            type="number"
            min="1"
            value={numCities || ""}
            onChange={(e) => handleNumCitiesChange(parseInt(e.target.value) || 0)}
            className="transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Truck Capacity (W)</label>
          <Input
            type="number"
            min="1"
            value={truckCapacity || ""}
            onChange={(e) => setTruckCapacity(parseInt(e.target.value) || 0)}
            className="transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
          />
        </div>
      </div>

      {numCities > 0 && (
        <div className="space-y-4 animate-fade-in">
          {Array.from({ length: numCities }).map((_, index) => (
            <Card key={index} className="p-4 transform transition-all duration-300 hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City {index + 1} Demand</label>
                  <Input
                    type="number"
                    min="1"
                    value={cities[index]?.demand || ""}
                    onChange={(e) => updateCity(index, "demand", parseInt(e.target.value) || 0)}
                    className="transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City {index + 1} Deadline</label>
                  <Input
                    type="number"
                    min="1"
                    value={cities[index]?.deadline || ""}
                    onChange={(e) => updateCity(index, "deadline", parseInt(e.target.value) || 0)}
                    className="transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Button
        type="submit"
        className="w-full transition-all duration-300 hover:scale-[1.02]"
        disabled={numCities === 0 || truckCapacity === 0}
      >
        Calculate Minimum Trucks
      </Button>

      {showResult && (
        <div className="animate-fade-in text-center p-4">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-2xl text-purple-600">{result === -1 ? "Impossible" : `${result} trucks needed`}</p>
        </div>
      )}
    </form>
  );
};

export default LogisticsForm;
