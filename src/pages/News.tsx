import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { newsApi, NewsArticle } from "@/lib/api";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";

const News = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['news-articles'],
    queryFn: () => newsApi.getAll()
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Budget': 'bg-blue-100 text-blue-800',
      'Health': 'bg-green-100 text-green-800',
      'Infrastructure': 'bg-orange-100 text-orange-800',
      'Training': 'bg-purple-100 text-purple-800',
      'Policy': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <HeroCarousel 
          title="News & Updates"
          subtitle="Stay informed about the latest developments, announcements, and achievements in livestock development."
        />

        {/* News Grid */}
        <section className="container mx-auto px-4 py-16">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Unable to load news articles. Please try again later.</p>
            </div>
          ) : articles && articles.length > 0 ? (
            <>
              {/* Featured Article */}
              <Card className="mb-8 overflow-hidden border-border/50 hover:shadow-lg transition-shadow animate-fade-up">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-secondary/50 h-64 md:h-auto flex items-center justify-center">
                    <div className="text-6xl opacity-20">📰</div>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(articles[0].category)}>
                        {articles[0].category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {articles[0].publishedAt && format(new Date(articles[0].publishedAt), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                      {articles[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{articles[0].excerpt}</p>
                    <button className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </CardContent>
                </div>
              </Card>

              {/* Other Articles */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map((article, index) => (
                  <Card 
                    key={article.id} 
                    className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow animate-fade-up group cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-secondary/50 h-40 flex items-center justify-center">
                      <div className="text-4xl opacity-20">📰</div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(article.category)} variant="secondary">
                          {article.category}
                        </Badge>
                      </div>
                      <CardTitle className="font-display text-lg group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.publishedAt && format(new Date(article.publishedAt), 'MMM d, yyyy')}
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news articles available at this time.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
