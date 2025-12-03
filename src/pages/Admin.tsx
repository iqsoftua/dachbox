import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Package, FileText, Save } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Product {
  id: string;
  slug: string;
  name: string;
  volume: string;
  dimensions: string;
  max_load: string;
  price_per_day: number;
  image_url: string | null;
  is_active: boolean;
}

interface RentalRequest {
  id: string;
  product_name: string;
  start_date: string;
  end_date: string;
  days: number;
  total_price: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"products" | "requests">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch products (admin can see all including inactive)
    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("name");
    
    if (productsData) {
      setProducts(productsData);
    }

    // Fetch rental requests
    const { data: requestsData } = await supabase
      .from("rental_requests")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (requestsData) {
      setRequests(requestsData);
    }

    setIsLoading(false);
  };

  const updateProductPrice = async (productId: string, newPrice: number) => {
    setSavingId(productId);
    
    const { error } = await supabase
      .from("products")
      .update({ price_per_day: newPrice })
      .eq("id", productId);

    if (error) {
      toast({
        title: "Fehler",
        description: "Preis konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Gespeichert",
        description: "Der Preis wurde erfolgreich aktualisiert.",
      });
      setProducts(products.map(p => 
        p.id === productId ? { ...p, price_per_day: newPrice } : p
      ));
    }
    
    setSavingId(null);
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    const { error } = await supabase
      .from("rental_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    if (error) {
      toast({
        title: "Fehler",
        description: "Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Gespeichert",
        description: "Der Status wurde erfolgreich aktualisiert.",
      });
      setRequests(requests.map(r => 
        r.id === requestId ? { ...r, status: newStatus } : r
      ));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <h1 className="font-display text-2xl font-bold">Zugriff verweigert</h1>
        <p className="text-muted-foreground text-center">
          Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
          <br />
          Bitte kontaktieren Sie den Administrator.
        </p>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Zur Startseite
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            Abmelden
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="font-display text-xl font-bold">Admin-Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "products"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="h-4 w-4" />
              Produkte & Preise
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "requests"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              Mietanfragen ({requests.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "products" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold">Produkte & Preise verwalten</h2>
            <div className="grid gap-4">
              {products.map((product) => (
                <ProductPriceCard
                  key={product.id}
                  product={product}
                  onSave={updateProductPrice}
                  isSaving={savingId === product.id}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold">Mietanfragen</h2>
            {requests.length === 0 ? (
              <p className="text-muted-foreground">Noch keine Anfragen vorhanden.</p>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onStatusChange={updateRequestStatus}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductPriceCardProps {
  product: Product;
  onSave: (id: string, price: number) => void;
  isSaving: boolean;
}

const ProductPriceCard = ({ product, onSave, isSaving }: ProductPriceCardProps) => {
  const [price, setPrice] = useState(product.price_per_day.toString());

  const handleSave = () => {
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice) && numPrice > 0) {
      onSave(product.id, numPrice);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.volume}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Label htmlFor={`price-${product.id}`} className="sr-only">
            Preis pro Tag
          </Label>
          <Input
            id={`price-${product.id}`}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-24 text-right"
            min="0"
            step="0.01"
          />
          <span className="text-muted-foreground">€/Tag</span>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isSaving || parseFloat(price) === product.price_per_day}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

interface RequestCardProps {
  request: RentalRequest;
  onStatusChange: (id: string, status: string) => void;
}

const RequestCard = ({ request, onStatusChange }: RequestCardProps) => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Ausstehend",
    confirmed: "Bestätigt",
    cancelled: "Storniert",
    completed: "Abgeschlossen",
  };

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{request.product_name}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[request.status] || statusColors.pending}`}>
              {statusLabels[request.status] || request.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(request.start_date), "dd.MM.yyyy", { locale: de })} - {format(new Date(request.end_date), "dd.MM.yyyy", { locale: de })}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold">{request.total_price}€</p>
          <p className="text-sm text-muted-foreground">{request.days} Tage</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="text-muted-foreground">Erstellt: </span>
          {format(new Date(request.created_at), "dd.MM.yyyy HH:mm", { locale: de })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {["pending", "confirmed", "cancelled", "completed"].map((status) => (
          <Button
            key={status}
            variant={request.status === status ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange(request.id, status)}
            disabled={request.status === status}
          >
            {statusLabels[status]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Admin;
