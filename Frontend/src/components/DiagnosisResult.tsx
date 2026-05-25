import React from "react";
import { AlertCircle, CheckCircle2, ShieldAlert, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface DiagnosisData {
  diseaseName: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  treatments: string[];
  preventions: string[];
}

interface DiagnosisResultProps {
  data: DiagnosisData;
  imageUrl: string;
  onReset: () => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  data,
  imageUrl,
  onReset,
}) => {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          color: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-destructive/20",
          icon: ShieldAlert,
          label: "High Severity",
        };
      case "medium":
        return {
          color: "text-secondary",
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          icon: AlertCircle,
          label: "Medium Severity",
        };
      default:
        return {
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/20",
          icon: CheckCircle2,
          label: "Low Severity",
        };
    }
  };

  const severityConfig = getSeverityConfig(data.severity);
  const SeverityIcon = severityConfig.icon;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col md:flex-row">
        {/* Left column: Image & Top level stats */}
        <div className="md:w-2/5 border-b md:border-b-0 md:border-r border-border bg-muted/20 p-6 flex flex-col">
          <div className="rounded-xl overflow-hidden border border-border shadow-sm mb-6 aspect-square bg-black/5">
            <img
              src={imageUrl}
              alt="Analyzed crop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 mt-auto">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Diagnosis</p>
              <h2 className="text-2xl font-bold text-foreground">
                {data.diseaseName}
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                AI Confidence
              </span>
              <span className="text-sm font-bold text-primary">
                {data.confidence}%
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${data.confidence}%` }}
              />
            </div>

            <div
              className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${severityConfig.bg} ${severityConfig.color} ${severityConfig.border}`}
            >
              <SeverityIcon className="h-4 w-4" />
              {severityConfig.label}
            </div>
          </div>
        </div>

        {/* Right column: Details and Actions */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
          <div className="space-y-6 flex-grow">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                About this issue
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {data.description}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Recommended Treatments
              </h3>
              <ul className="space-y-3">
                {data.treatments.map((treatment, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {treatment}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onReset}
              variant="outline"
              className="flex-1"
            >
              Scan Another Crop
            </Button>
            <Button asChild className="flex-1">
              <Link to="/ask">Ask Expert About This</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
