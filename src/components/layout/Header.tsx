import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import jigawaLogo from "@/assets/jigawa-logo.png";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Innovation Hubs", href: "/innovation-hubs" },
  { name: "Farm Estates", href: "/farm-estates" },
  { name: "About Us", href: "/about" },
  { name: "Updates", href: "/news" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Get auth state

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={jigawaLogo}
              alt="Jigawa State Government Logo"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-foreground text-lg leading-tight">
                JATA
              </p>
              <p className="text-xs text-muted-foreground">Transformation Agency</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="governmentPrimary" size="sm" className="gap-2">
                  Portals
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Select Portal</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/farmer-registration")}
                  className="cursor-pointer"
                >
                  Farmer Portal
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/startup")}
                  className="cursor-pointer"
                >
                  Startup Portal
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/ppp/apply")}
                  className="cursor-pointer"
                >
                  PPP Application
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
                <Button
                  variant="governmentPrimary"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/farmer-registration");
                    setMobileMenuOpen(false);
                  }}
                >
                  Farmer Portal
                </Button>
                <Button
                  variant="governmentPrimary"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/startup");
                    setMobileMenuOpen(false);
                  }}
                >
                  Startup Portal
                </Button>
                <Button
                  variant="governmentPrimary"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/investor/dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  Investor Dashboard
                </Button>
                <Button
                  variant="governmentPrimary"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/mentor");
                    setMobileMenuOpen(false);
                  }}
                >
                  Mentor Portal
                </Button>
                <Button
                  variant="governmentPrimary"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/ppp/apply");
                    setMobileMenuOpen(false);
                  }}
                >
                  PPP Application
                </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
