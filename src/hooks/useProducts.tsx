import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";

// Import local images as fallback
import thuleMotionXTL from "@/assets/thule-motion-xt-l.jpg";
import thuleMotionXTXL from "@/assets/thule-motion-xt-xl.jpg";
import thuleMotionXTXXL from "@/assets/thule-motion-xt-xxl.jpg";

const imageMap: Record<string, string> = {
  "thule-motion-xt-l": thuleMotionXTL,
  "thule-motion-xt-xl": thuleMotionXTXL,
  "thule-motion-xt-xxl": thuleMotionXTXXL,
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
          image: imageMap[p.slug] || p.image_url || thuleMotionXTL,
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
