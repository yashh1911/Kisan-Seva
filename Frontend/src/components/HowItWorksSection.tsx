const steps = [
  {
    step: "01",
    title: "Take a Photo",
    description: "Snap a picture of your affected crop using your phone.",
  },
  {
    step: "02",
    title: "Upload & Analyze",
    description: "Upload the image and our AI will diagnose the problem instantly.",
  },
  {
    step: "03",
    title: "Get Treatment",
    description: "Receive practical, affordable treatment advice in your language.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Three simple steps to healthier crops
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                {s.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
