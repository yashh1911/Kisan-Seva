import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, TrendingUp, TrendingDown, Minus, Loader2, IndianRupee, Activity, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string; 
}

interface MarketAnalysis {
  priceRange: string;
  bestMarket: string;
  trend: "up" | "down" | "stable";
  recommendation: string;
}

interface MarketData {
  success: boolean;
  message?: string;
  crop?: string;
  records?: MarketRecord[];
  total?: number;
}

const Market = () => {
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop.trim()) return;

    setIsLoading(true);
    setError(null);
    setMarketData(null);
    setAnalysis(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/market`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: crop.trim(),
          state: state.trim() || null,
          language: "English",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch market data");
      }

      const data = await response.json();
      
      if (data.raw_data && data.raw_data.success) {
        setMarketData(data.raw_data);
        setAnalysis(data.analysis);
      } else {
        setError(data.raw_data?.message || "No data found for this crop.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend?.toLowerCase()) {
      case "up":
        return <TrendingUp className="h-6 w-6 text-green-500" />;
      case "down":
        return <TrendingDown className="h-6 w-6 text-red-500" />;
      default:
        return <Minus className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Live <span className="text-primary">Market Prices</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search for any crop to see live prices from local mandis and get AI-powered selling advice.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-2xl shadow-sm border border-border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Crop Name (e.g., Wheat, Tomato)"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  required
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="State (Optional)"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-xl px-8" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
              </Button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Fetching live prices from Government APIs and analyzing trends...</p>
            </div>
          )}

          {/* Results Area */}
          {!isLoading && marketData?.records && analysis && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* AI Analysis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <IndianRupee className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-muted-foreground">Price Range</h3>
                  </div>
                  <p className="text-lg font-bold text-foreground">{analysis.priceRange}</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-muted-foreground">Best Market</h3>
                  </div>
                  <p className="text-lg font-bold text-foreground">{analysis.bestMarket}</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-muted-foreground">Market Trend</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(analysis.trend)}
                    <p className="text-lg font-bold text-foreground capitalize">{analysis.trend}</p>
                  </div>
                </div>

                <div className="bg-primary border border-primary-foreground/10 rounded-2xl p-6 shadow-sm text-primary-foreground">
                  <h3 className="font-semibold text-primary-foreground/80 mb-2">AI Recommendation</h3>
                  <p className="text-lg font-bold leading-tight">{analysis.recommendation}</p>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-muted/20">
                  <h2 className="text-xl font-bold text-foreground">Recent Market Records</h2>
                  <p className="text-muted-foreground text-sm mt-1">Showing the latest prices across different mandis.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="p-4 font-semibold text-sm text-muted-foreground">Date</th>
                        <th className="p-4 font-semibold text-sm text-muted-foreground">State / District</th>
                        <th className="p-4 font-semibold text-sm text-muted-foreground">Market</th>
                        <th className="p-4 font-semibold text-sm text-muted-foreground">Variety</th>
                        <th className="p-4 font-semibold text-sm text-muted-foreground">Min Price</th>
                        <th className="p-4 font-semibold text-sm text-muted-foreground">Max Price</th>
                        <th className="p-4 font-semibold text-sm text-primary">Modal Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.records.map((record, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                          <td className="p-4 text-sm whitespace-nowrap">{record.arrival_date}</td>
                          <td className="p-4 text-sm">
                            <span className="font-medium text-foreground">{record.state}</span>
                            <br />
                            <span className="text-muted-foreground text-xs">{record.district}</span>
                          </td>
                          <td className="p-4 text-sm font-medium">{record.market}</td>
                          <td className="p-4 text-sm text-muted-foreground">{record.variety}</td>
                          <td className="p-4 text-sm">₹{record.min_price}</td>
                          <td className="p-4 text-sm">₹{record.max_price}</td>
                          <td className="p-4 text-sm font-bold text-primary">₹{record.modal_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Market;
