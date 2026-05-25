import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import DiagnosisResult, { DiagnosisData } from "@/components/DiagnosisResult";
import { Loader2 } from "lucide-react";

const Diagnose = () => {
  const [appState, setAppState] = useState<"idle" | "analyzing" | "result">("idle");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null);

  const handleUpload = (file: File) => {
    // Show the analyzing state
    setAppState("analyzing");
    
    // Create an object URL for the uploaded file so we can display it
    const url = URL.createObjectURL(file);
    setUploadedImageUrl(url);

    // Call backend API
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "English");

    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/diagnose`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to diagnose crop");
        }
        return response.json();
      })
      .then((data) => {
        setDiagnosisData(data.diagnosis);
        setAppState("result");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while diagnosing the crop. Make sure the backend is running.");
        setAppState("idle");
      });
  };

  const handleReset = () => {
    setAppState("idle");
    setUploadedImageUrl(null);
    setDiagnosisData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Diagnose Your <span className="text-primary">Crop</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get instant, AI-powered disease detection. Simply upload a clear picture of the affected leaves or stems, and we'll tell you what's wrong and how to fix it.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center min-h-[400px]">
            {appState === "idle" && (
              <div className="w-full animate-in fade-in duration-500">
                <ImageUpload onUpload={handleUpload} />
              </div>
            )}

            {appState === "analyzing" && (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <div className="relative bg-background rounded-full p-6 shadow-xl border border-primary/20">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mt-8 text-foreground">
                  Analyzing Image...
                </h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Our AI is scanning your crop for signs of disease, pests, and nutrient deficiencies.
                </p>
              </div>
            )}

            {appState === "result" && diagnosisData && uploadedImageUrl && (
              <DiagnosisResult 
                data={diagnosisData} 
                imageUrl={uploadedImageUrl} 
                onReset={handleReset} 
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Diagnose;
