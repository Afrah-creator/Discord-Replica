import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/logo.png";
import ctaBg from "@/assets/cta-banner-bg.jpg";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Nitro", href: "#nitro" },
    { label: "Discover", href: "#discover" },
    { label: "Safety", href: "#safety" },
    { label: "Features", href: "#features" },
    { label: "Activities", href: "/app" },
  ],
  Company: [
    { label: "About", href: "#stats" },
    { label: "Jobs", href: "#stats" },
    { label: "Brand", href: "/" },
    { label: "Newsroom", href: "/" },
  ],
  Resources: [
    { label: "Support", href: "#safety" },
    { label: "Safety Center", href: "#safety" },
    { label: "Blog", href: "/" },
    { label: "Feedback", href: "/" },
    { label: "Creators", href: "/" },
  ],
  Policies: [
    { label: "Terms", href: "/" },
    { label: "Privacy", href: "/" },
    { label: "Cookie Settings", href: "/" },
    { label: "Guidelines", href: "#safety" },
    { label: "Licenses", href: "/" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: "𝕏", href: "#" },
  { name: "Instagram", icon: "📸", href: "#" },
  { name: "YouTube", icon: "▶", href: "#" },
  { name: "TikTok", icon: "♪", href: "#" },
  { name: "GitHub", icon: "⌨", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Banner with cosmic bg */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={600} />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join millions of users on N8. Your place to talk, hang out, and have fun. It's free — always.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/auth"
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              Create a Server
            </Link>
            <Link
              to="/app"
              className="flex items-center gap-2 px-8 py-3 rounded-full gradient-blurple text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Open N8
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-darker-navy pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-14">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="N8 logo" className="w-12 h-12" width={48} height={48} loading="lazy" />
                <span className="font-extrabold text-2xl text-foreground tracking-tight">N8</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                Imagine a place where you can belong to a school club, a gaming group, or a worldwide art community. N8 makes it easy to talk every day and hang out more often.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-secondary text-muted-foreground text-xs">
                🌐 English, USA
              </div>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-blurple font-bold text-xs uppercase tracking-wider mb-4">{heading}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border" />

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.href} title={s.name} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors text-sm">
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">© 2026 N8. All rights reserved. Not affiliated with Discord Inc.</p>
            <div className="flex items-center gap-3">
              <Link to="/auth" className="px-5 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">Sign Up</Link>
              <Link to="/app" className="px-5 py-2 rounded-full gradient-blurple text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Open N8</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
