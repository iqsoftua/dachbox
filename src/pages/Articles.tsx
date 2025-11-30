import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Tipps zur sicheren Beladung Ihrer Dachbox",
    excerpt:
      "Erfahren Sie, wie Sie Ihre Dachbox optimal beladen und sicher für die Fahrt vorbereiten. Von der Gewichtsverteilung bis zur Sicherung.",
    date: "15. November 2024",
    readTime: "5 Min. Lesezeit",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Die richtige Dachbox für Ihren Urlaub",
    excerpt:
      "Welche Dachbox passt zu Ihren Bedürfnissen? Wir helfen Ihnen bei der Auswahl zwischen verschiedenen Größen und Modellen.",
    date: "10. November 2024",
    readTime: "4 Min. Lesezeit",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Winterurlaub mit der Familie – Packtipps",
    excerpt:
      "Der Winterurlaub steht vor der Tür? Mit diesen Packtipps passt alles in die Dachbox und Sie sind bestens vorbereitet.",
    date: "5. November 2024",
    readTime: "6 Min. Lesezeit",
    image:
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=600&h=400&fit=crop",
  },
];

const Articles = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Artikel & Ratgeber
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Nützliche Tipps und Informationen rund um Dachboxen, Reisen und
              den perfekten Transport.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="group animate-slide-up overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold leading-tight">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      to="#"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent"
                    >
                      Weiterlesen
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
