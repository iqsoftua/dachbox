import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import RentalForm from "@/components/RentalForm";
import { ArrowDown, Shield, Truck, Clock, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

import heroBanner from "@/assets/hero-banner.jpg";

const features = [
  {
    icon: Shield,
    title: "Sicherheit",
    description: "Nur TÜV-zertifizierte Ausrüstung.",
  },
  {
    icon: Truck,
    title: "Montage",
    description: "Kostenloser Aufbau und Abbau der Dachbox.",
  },
  {
    icon: Clock,
    title: "Flexible Mietdauer",
    description: "Ab 1 Tag bis mehrere Wochen",
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, isLoading, error } = useProducts();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={heroBanner}
            alt="Dachbox auf Auto in den Bergen"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
          <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
            <div className="max-w-2xl">
              <h1 className="animate-fade-in font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                Premium Dachboxen
                <br />
                zur Miete
              </h1>
              <p className="mt-6 animate-fade-in text-lg text-primary-foreground/80 [animation-delay:200ms] md:text-xl">
                Mehr Platz für Ihr Abenteuer. Hochwertige Thule Dachboxen –
                einfach mieten, sicher transportieren.
              </p>
              <a
                href="#products"
                className="mt-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 text-sm font-medium text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/20 [animation-delay:400ms]"
              >
                Dachboxen ansehen
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-border bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 text-center md:text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Unsere Dachboxen
              </h2>
              <p className="mt-4 text-muted-foreground">
                Wählen Sie die passende Größe für Ihre Reise. Alle Boxen sind
                top gepflegt und sofort einsatzbereit.
              </p>
            </div>

            {isLoading ? (
              <div className="mt-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="mt-12 text-center text-muted-foreground">
                {error}
              </div>
            ) : (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard
                      product={product}
                      onSelect={handleProductSelect}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
              Bereit für Ihr nächstes Abenteuer?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Kontaktieren Sie uns für Fragen oder wählen Sie direkt eine
              Dachbox aus.
            </p>
            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-3 font-medium text-primary transition-colors hover:bg-primary-foreground/90"
            >
              Jetzt mieten
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Rental Form Overlay */}
      {selectedProduct && (
        <RentalForm product={selectedProduct} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default Index;
