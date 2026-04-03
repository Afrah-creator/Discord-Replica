import { ArrowRight, Download } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA section */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Join millions of users on N8. It's free and always will be.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
              <Download size={18} />
              Download for Windows
            </a>
            <a href="/app" className="flex items-center gap-2 px-8 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Open N8 in your browser
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <div className="bg-darker-navy py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-blurple font-bold text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Download</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Nitro</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blurple font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Brand</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blurple font-bold text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-blurple font-bold text-sm mb-4">Policies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md gradient-blurple flex items-center justify-center font-bold text-primary-foreground text-xs">N8</div>
              <span className="font-bold text-foreground">N8</span>
            </div>
            <a href="/app" className="px-4 py-2 rounded-full gradient-blurple text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Open N8
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
