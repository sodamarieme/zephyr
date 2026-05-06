import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { FadeIn } from "@/components/ui/AnimatedText";
import { blogPosts, categoryColors, formatDate } from "@/lib/blog-data";
import { getPosts } from "@/sanity/lib/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conseils, guides et actualités sur le design, le développement web, le mobile et la stratégie digitale en Afrique de l'Ouest.",
};

const allCategories = ["Tous", "Design", "Développement", "Mobile", "Business Digital", "SEO & Marketing"];

export default async function BlogPage() {
  let posts = blogPosts;
  try {
    const sanityPosts = await getPosts(20);
    if (sanityPosts.length > 0) posts = sanityPosts as unknown as typeof blogPosts;
  } catch {
    // fallback statique
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">

        {/* Header */}
        <FadeIn className="text-center space-y-4 mb-16">
          <span className="tag">Blog</span>
          <h1 className="section-title mt-3">
            Insights & <span className="gradient-text">Expertise</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Design, développement, mobile et stratégie digitale.
            Des contenus pensés pour les décideurs ambitieux.
          </p>
        </FadeIn>

        {/* Featured post */}
        <FadeIn delay={0.1} className="mb-16">
          <Link href={`/blog/${featured.slug.current}`} className="group block">
            <div className="glass rounded-3xl overflow-hidden hover:border-brand-500/30 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-[16/9] lg:aspect-auto lg:min-h-[360px] relative overflow-hidden">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-80 transition-opacity duration-500",
                  categoryColors[featured.category] ?? "from-brand-500 to-accent-500"
                )} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] font-display font-bold text-white/10 select-none">
                    {featured.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="tag">{featured.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-5">
                <div className="flex items-center gap-1 text-xs text-brand-400 font-semibold uppercase tracking-widest">
                  <span>Article à la une</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:gradient-text transition-all duration-300">
                  {featured.title}
                </h2>
                <p className="text-slate-400 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featured.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime} min de lecture
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Lire l&apos;article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>

        {/* Categories filter — static on SSR, hydrateable côté client */}
        <FadeIn delay={0.15} className="flex flex-wrap gap-2 mb-10">
          {allCategories.map((cat) => (
            <span
              key={cat}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                cat === "Tous"
                  ? "bg-brand-600 text-white"
                  : "glass text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {cat}
            </span>
          ))}
        </FadeIn>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <FadeIn key={post._id} delay={i * 0.07}>
              <Link href={`/blog/${post.slug.current}`} className="group block h-full">
                <article className="card h-full flex flex-col space-y-4 hover:border-brand-500/30 transition-all duration-300">
                  {/* Cover */}
                  <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity",
                      categoryColors[post.category] ?? "from-brand-500 to-accent-500"
                    )} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl font-display font-bold text-white/10">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2">
                    <span className="tag text-xs">{post.category}</span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-white leading-snug group-hover:gradient-text transition-all duration-300 flex-1">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {post.author.name.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-500">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-slate-600">{formatDate(post.publishedAt)}</span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Newsletter CTA */}
        <FadeIn delay={0.3} className="mt-20">
          <div className="glass rounded-2xl p-10 text-center space-y-5 border-brand-500/20">
            <h3 className="text-2xl font-bold text-white">
              Ne manquez aucun article
            </h3>
            <p className="text-slate-400 max-w-lg mx-auto">
              Recevez nos meilleurs contenus chaque semaine directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm"
              />
              <button className="btn-primary text-sm py-3 px-6 whitespace-nowrap">
                S&apos;abonner
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
