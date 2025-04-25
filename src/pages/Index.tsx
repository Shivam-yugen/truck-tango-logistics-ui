
import { Card } from "@/components/ui/card";
import LogisticsForm from "@/components/LogisticsForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-900">Lockdown Logistics</h1>
          <div className="flex flex-col items-center">
            <div className="w-full h-64 relative scenic-road rounded-lg overflow-hidden">
              <div className="mountains absolute inset-0"></div>
              <div className="trees absolute inset-0"></div>
              <div className="road absolute bottom-0 w-full h-24">
                <div className="guard-rail"></div>
                <img 
                  src="/lovable-uploads/ab61a702-915f-45cb-85a0-97cca203dab4.png" 
                  alt="Truck on scenic road" 
                  className="w-32 absolute bottom-4 animate-truck"
                />
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimize your logistics operations by calculating the minimum number of trucks needed to serve multiple cities with specific demands and deadlines.
          </p>
        </div>

        <Card className="p-6">
          <LogisticsForm />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Input/Output</h2>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sample Input:</h3>
              <p>N (cities) = 3</p>
              <p>W (truck capacity) = 10</p>
              <p>City 1: Demand = 5, Deadline = 3</p>
              <p>City 2: Demand = 4, Deadline = 2</p>
              <p>City 3: Demand = 8, Deadline = 4</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sample Output:</h3>
              <p>Minimum trucks needed: 2</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
