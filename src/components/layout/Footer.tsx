import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import jigawaLogo from "@/assets/jigawa-logo.png";

const quickLinks = [
  { name: "Farmers Database", href: "/farmer-registration" },
  { name: "Extension Platform", href: "#" },
  { name: "About J-ATA", href: "/management" },
  { name: "Updates", href: "/news" },
];

const services = [
  { name: "Smart Voucher System", href: "#" },
  { name: "Farmer Assistant", href: "#" },
  { name: "Climate Smart Agriculture", href: "#" },
  { name: "Digital Rural Finance", href: "#" },
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
                  J-ATA
                </p>
                <p className="text-xs text-background/60">
                  Transformation Agency
                </p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              The official digital platform of the Jigawa Agricultural Transformation Agency (J-ATA). 
              Modernizing agricultural administration for a sustainable future.
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
            <h4 className="font-display font-semibold text-lg mb-6">Programmes</h4>
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
                  5340, Kiyawa Road, Dutse, Jigawa State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+2347700000000" className="text-background/70 hover:text-primary text-sm transition-colors">
                  +234 770 000 0000
                </a>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:support@jata.ng" className="text-background/70 hover:text-primary text-sm transition-colors">
                    support@jata.ng
                  </a>
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <a href="mailto:dg.jata@jigawastate.gov.ng" className="text-background/70 hover:text-primary text-sm transition-colors">
                    dg.jata@jigawastate.gov.ng
                  </a>
                </div>
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
              © {new Date().getFullYear()} Jigawa Agricultural Transformation Agency (J-ATA). All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-background/50 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-background/50 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
