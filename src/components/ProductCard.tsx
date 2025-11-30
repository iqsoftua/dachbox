import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  volume: string;
  dimensions: string;
  maxLoad: string;
  pricePerDay: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold">{product.name}</h3>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Volumen</span>
            <span className="font-medium">{product.volume}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Maße</span>
            <span className="font-medium">{product.dimensions}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Max. Zuladung</span>
            <span className="font-medium">{product.maxLoad}</span>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold">{product.pricePerDay}€</span>
            <span className="text-sm text-muted-foreground"> / Tag</span>
          </div>
          <Button
            onClick={() => onSelect(product)}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Jetzt mieten
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
