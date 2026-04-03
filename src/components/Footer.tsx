import { ArrowRight, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logo from "/logo.png";

const footerLinks = {
  Product: ["Download", "Nitro", "Status", "App Directory", "Activities"],
  Company: ["About", "Jobs", "Brand", "Newsroom", "Fall Guys"],
  Resources: ["College", "Support", "Safety", "Blog", "Feedback"],
  Policies: ["Terms", "Privacy", "Cookie Settings", "Guidelines", "Acknowledgements"],
  Developers: ["Developer Portal", "Documentation", "Open Source", "API Reference", "Bot Reviews"],
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA */}
      <section className="gradient-hero py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join millions of users on N8. Your place to talk, hang out, and have fun. It's free — always.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={18} />
              Download for Windows
            </a>
            <a
              href="/app"
              className="flex items-center gap-2 px-8 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Open N8 in your browser
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <div className="bg-darker-navy py-14">
        <div className="container mx-auto px-6">
          {/* Top */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-blurple font-bold text-sm mb-4">{heading}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-foreground transition-colors hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="N8 logo" className="w-10 h-10" width={40} height={40} loading="lazy" />
              <span className="font-extrabold text-xl text-foreground tracking-tight">N8</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">YouTube</a>
              <a href="#" className="hover:text-foreground transition-colors">TikTok</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            </div>

            <a
              href="/app"
              className="px-5 py-2 rounded-full gradient-blurple text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Open N8
            </a>
          </div>

          {/* Bottom */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2026 N8. All rights reserved. Not affiliated with Discord Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
