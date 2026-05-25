import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, MessageCircle } from "lucide-react";

const heroImage = "/assets/hero-farmer.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Indian farmer in wheat field at sunset"
          className="w-full h-full object-cover object-[center_25%] md:object-top"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium border border-primary/30">
            🌾 AI-Powered Farming Assistant
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-primary-foreground">
            Empowering{" "}
            <span className="text-secondary">India's Farmers</span>{" "}
            with AI
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
            Upload a photo of your crop to instantly diagnose diseases, get
            treatment advice, and check live market prices — all in your
            language.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button asChild size="lg" className="text-base gap-2">
              <Link to="/diagnose">
                <Camera className="h-5 w-5" />
                Diagnose My Crop
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/ask">
                <MessageCircle className="h-5 w-5" />
                Ask a Question
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
