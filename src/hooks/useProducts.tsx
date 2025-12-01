import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";

// Import local images
import thuleMotionM from "@/assets/thule-motion-m.png";
import thuleMotionL from "@/assets/thule-motion-l.png";
import thuleMotionXXL from "@/assets/thule-motion-xxl.png";

const imageMap: Record<string, string> = {
  "thule-motion-m": thuleMotionM,
  "thule-motion-l": thuleMotionL,
  "thule-motion-xxl": thuleMotionXXL,
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("price_per_day");

      if (error) {
        console.error("Error fetching products:", error);
        setError("Produkte konnten nicht geladen werden.");
        return;
      }

      if (data) {
        const mappedProducts: Product[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          volume: p.volume,
          dimensions: p.dimensions,
          maxLoad: p.max_load,
          pricePerDay: Number(p.price_per_day),
          image: imageMap[p.slug] || p.image_url || thuleMotionM,
        }));
        setProducts(mappedProducts);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Ein Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, error, refetch: fetchProducts };
};
