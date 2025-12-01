import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight">
                IQTechBox
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium Dachboxen zur Miete. Einfach, flexibel und zuverlässig für
              Ihre nächste Reise.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Startseite
              </Link>
              <Link
                to="/artikel"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Artikel
              </Link>
              <Link
                to="/ueber-uns"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Über uns
              </Link>
              <Link
                to="/kontakt"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Kontakt
              </Link>
              <Link
                to="/datenschutz"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Datenschutz
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Kontakt</h3>
            <p className="text-sm font-medium text-foreground">
              IQTechBox – Denys Makarenko
            </p>
            <div className="mt-2 flex flex-col gap-3">
              <a
                href="mailto:nktkiev@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                nktkiev@gmail.com
              </a>
              <a
                href="tel:+491718177236"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                +49 171 8177236
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Demmeringstraße 74, 04177 Leipzig
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IQTechBox. Alle Rechte
            vorbehalten.
          </p>
          <Link
            to="/datenschutz"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Datenschutzerklärung
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
