import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-secondary" />
            <span className="font-semibold">Project Kisan</span>
          </div>
          <p className="text-sm text-primary-foreground/60">
            Built with ❤️ for Indian Farmers &bull; Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
