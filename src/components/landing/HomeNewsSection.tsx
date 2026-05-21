import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Scale } from "lucide-react";
import { newsApi, NewsArticle } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const fallbackArticles: Pick<
  NewsArticle,
  "id" | "title" | "slug" | "excerpt" | "category" | "publishedAt" | "imageUrl"
>[] = [
  {
    id: "fallback-1",
    title: "JATA launches statewide digital farmer registration",
    slug: "farmer-registration-launch",
    excerpt:
      "Farmers across all 27 LGAs can now obtain a unique digital JATA ID for subsidy and extension services.",
    category: "Programme Update",
    publishedAt: new Date().toISOString(),
    imageUrl: "/gov-jigawa-2.jpg",
  },
  {
    id: "fallback-2",
    title: "Innovation hubs expansion under 2026 transformation roadmap",
    slug: "innovation-hubs-2026",
    excerpt:
      "Five innovation hubs are being tracked for budget, infrastructure, and operational readiness.",
    category: "Infrastructure",
    publishedAt: new Date().toISOString(),
    imageUrl: "/images/hausa_woman_2.png",
  },
];

function ArticleCard({
  article,
}: {
  article: Pick<
    NewsArticle,
    "title" | "slug" | "excerpt" | "category" | "publishedAt" | "imageUrl"
  >;
}) {
  const dateLabel = article.publishedAt
    ? format(new Date(article.publishedAt), "d MMM yyyy")
    : "Recent";

  return (
    <Link
      to={`/news`}
      className="landing-card group flex flex-col sm:flex-row overflow-hidden border border-border bg-card hover:border-primary/30 transition-colors"
    >
      <div className="sm:w-40 h-36 sm:h-auto shrink-0 bg-muted overflow-hidden">
        <img
          src={article.imageUrl || "/placeholder.svg"}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col justify-center min-w-0">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {article.category}
        </span>
        <h3 className="font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {article.excerpt}
        </p>
        <p className="text-xs text-muted-foreground mt-3">{dateLabel}</p>
      </div>
    </Link>
  );
}

export function HomeNewsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-news"],
    queryFn: async () => {
      try {
        const articles = await newsApi.getAll();
        const published = articles
          .filter((a) => a.isPublished)
          .sort(
            (a, b) =>
              new Date(b.publishedAt || b.createdAt).getTime() -
              new Date(a.publishedAt || a.createdAt).getTime()
          )
          .slice(0, 2);
        return published.length > 0 ? published : fallbackArticles;
      } catch {
        return fallbackArticles;
      }
    },
    retry: false,
    staleTime: 60_000,
  });

  const articles =
    data && data.length > 0 ? data : fallbackArticles;

  return (
    <section className="py-16 lg:py-20 bg-secondary/40 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Updates
            </span>
            <h2 className="font-civic text-2xl sm:text-3xl font-bold text-foreground mt-2">
              News & transparency
            </h2>
          </div>
          <Link to="/news">
            <Button variant="outline" size="sm" className="gap-2 rounded-sm shrink-0">
              All updates
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-32 w-full rounded-sm" />
                <Skeleton className="h-32 w-full rounded-sm" />
              </>
            ) : (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>

          <div className="landing-card p-6 border border-border bg-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-civic text-lg font-bold text-foreground">
                Budget & facility transparency
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Track hub construction, ranch rehabilitation, and programme budgets
                across Jigawa State.
              </p>
            </div>
            <Link to="/transparency" className="mt-6">
              <Button variant="governmentPrimary" className="w-full gap-2 rounded-sm">
                <Newspaper className="w-4 h-4" />
                View transparency portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
