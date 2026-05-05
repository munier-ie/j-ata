import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import jigawaLogo from "@/assets/jigawa-logo.png";

const quickLinks = [
  { name: "Farmer Registration", href: "/farmer-registration" },
  { name: "Veterinary Services", href: "/veterinary" },
  { name: "Revenue Portal", href: "/revenue" },
  { name: "About Ministry", href: "/about" },
];

const services = [
  { name: "Animal Health Records", href: "/veterinary" },
  { name: "Market Entry Permits", href: "/revenue" },
  { name: "Livestock Movement", href: "/revenue" },
  { name: "Disease Reporting", href: "/veterinary" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={jigawaLogo} 
                alt="Jigawa State Government Logo" 
                className="w-14 h-14 object-contain bg-background rounded-full p-1"
              />
              <div>
                <p className="font-display font-semibold text-background text-lg leading-tight">
                  Jigawa Livestock
                </p>
                <p className="text-xs text-background/60">
                  Digital Platform
                </p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              The official digital platform of the Ministry of Livestock, Jigawa State. 
              Modernizing livestock administration for a sustainable future.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Ministry of Livestock, State Secretariat, Dutse, Jigawa State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+2348000000000" className="text-background/70 hover:text-primary text-sm transition-colors">
                  +234 800 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@jigawalivestock.gov.ng" className="text-background/70 hover:text-primary text-sm transition-colors">
                  info@jigawalivestock.gov.ng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Ministry of Livestock, Jigawa State Government. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="text-background/50 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-background/50 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
