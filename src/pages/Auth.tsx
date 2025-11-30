import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Fehler beim Anmelden",
            description: error.message === "Invalid login credentials" 
              ? "Ungültige Anmeldedaten" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Willkommen zurück!",
            description: "Sie wurden erfolgreich angemeldet.",
          });
          navigate("/admin");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Fehler",
              description: "Diese E-Mail ist bereits registriert.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Fehler bei der Registrierung",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Konto erstellt!",
            description: "Sie können sich jetzt anmelden.",
          });
          setIsLogin(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-background p-8 shadow-lg">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold">
            {isLogin ? "Anmelden" : "Registrieren"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isLogin
              ? "Melden Sie sich an, um auf die Admin-Verwaltung zuzugreifen"
              : "Erstellen Sie ein neues Konto"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.de"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bitte warten...
              </>
            ) : isLogin ? (
              "Anmelden"
            ) : (
              "Registrieren"
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isLogin
              ? "Noch kein Konto? Registrieren"
              : "Bereits registriert? Anmelden"}
          </button>
        </div>

        <div className="pt-4 border-t border-border">
          <a
            href="/"
            className="block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
