import SEO from '@/components/SEO';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Calendar, Clock } from 'lucide-react';
    import ReactMarkdown, { type Components } from 'react-markdown';
    import remarkGfm from 'remark-gfm';
    import Layout from '@/layouts/Layout';
    import OptimizedImage from '@/components/ui/OptimizedImage';
    import { getInsightBySlug, getRelatedInsights } from '@/data/insights';

    const normalizeInsightMarkdown = (content: string) =>
    content
      .replace(/\r\n/g, '\n')
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-white md:text-[2rem]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-white md:text-[2rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-white md:text-[1.5rem]">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-[1rem] leading-8 text-foreground/82 md:text-[1.0625rem] [&:last-child]:mb-0">
        {children}
      </p>
    ),
    ol: ({ children }) => (
      <ol className="my-7 ml-5 list-decimal space-y-3 pl-4 text-[1rem] leading-8 text-foreground/82 marker:font-semibold marker:text-primary md:text-[1.0625rem]">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="my-7 ml-5 list-disc space-y-3 pl-4 text-[1rem] leading-8 text-foreground/82 marker:text-primary md:text-[1.0625rem]">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="pl-1.5 [&>p]:mb-0">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-r-2xl border-l-4 border-primary/45 bg-secondary/35 px-6 py-5 text-[1rem] leading-8 text-foreground/90 md:text-[1.0625rem] [&>p]:mb-0">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),
    };

    export default function InsightDetail() {
    const { slug } = useParams();

    if (!slug) {
      return (
        <Layout>
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-foreground/60">Article not found.</p>
          </div>
        </Layout>
      );
    }

    const insight = getInsightBySlug(slug);

    if (!insight) {
      return (
        <Layout>
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-foreground/60">Article not found.</p>
          </div>
        </Layout>
      );
    }

    const relatedInsights = getRelatedInsights(slug, 3);
    const normalizedContent = normalizeInsightMarkdown(insight.content);

    const articleSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": insight.title,
      "description": insight.excerpt,
      "image": insight.coverImage,
      "datePublished": insight.date,
      "dateModified": insight.date,
      "author": {
        "@type": "Organization",
        "name": "Sustainacert International",
        "url": "https://sustainacertglobal.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sustainacert International",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sustainacertglobal.com/Logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sustainacertglobal.com/insights/${insight.slug}`
      },
      "keywords": insight.tags?.join(", "),
      "articleSection": insight.category
    });

    return (
      <Layout>
        <SEO
          title={insight.title}
          description={insight.excerpt}
          canonical={`/insights/${insight.slug}`}
          ogImage={insight.coverImage}
          ogType="article"
          datePublished={insight.date}
          dateModified={insight.date}
          schemaJson={articleSchema}
        />
        <article className="min-h-screen">
          {/* Hero */}
          <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden md:h-[52vh]">
            <OptimizedImage
              src={insight.coverImage}
              alt={insight.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="mx-auto max-w-3xl">
                <span className="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur-sm">
                  {insight.type}
                </span>
                <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl">
                  {insight.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Meta bar */}
          <div className="border-b border-white/10 bg-background/60 backdrop-blur-sm">
            <div className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4 text-sm text-foreground/60 md:px-12">
              <Link
                to="/news-blogs"
                className="flex items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Insights
              </Link>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(insight.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {insight.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {insight.readTime}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {normalizedContent}
              </ReactMarkdown>
            </motion.div>

            {/* Tags */}
            {insight.tags && insight.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related insights */}
          {relatedInsights.length > 0 && (
            <div className="border-t border-white/10 bg-background/40 px-6 py-12 md:px-12">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-xl font-semibold text-white">Related Insights</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedInsights.map((related) => (
                    <Link
                      key={related.id}
                      to={`/insights/${related.slug}`}
                      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-primary/40 hover:bg-white/10"
                    >
                      {related.coverImage && (
                        <div className="h-40 overflow-hidden">
                          <OptimizedImage
                            src={related.coverImage}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-xs font-medium uppercase tracking-wider text-primary">
                          {related.type}
                        </span>
                        <h3 className="mt-1 text-sm font-medium leading-snug text-white group-hover:text-primary/90">
                          {related.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
      </Layout>
    );
    }
    