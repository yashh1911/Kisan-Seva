import { Camera, MessageCircle, TrendingUp, Globe } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Crop Disease Diagnosis",
    description:
      "Upload a photo of your crop and get instant AI-powered disease detection with treatment recommendations.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    title: "Ask Any Question",
    description:
      "Get expert answers about farming techniques, government schemes, weather tips, and more.",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Live Market Prices",
    description:
      "Check real-time mandi prices for your crops across states and get sell/hold recommendations.",
    color: "bg-sky/20 text-sky",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Use the app in Hindi, English, Marathi, Tamil, and more — responses in your preferred language.",
    color: "bg-accent text-accent-foreground",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything a Farmer Needs
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-lg">
            Simple, powerful tools designed for Indian farmers — powered by AI,
            built with care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${f.color} mb-4`}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
