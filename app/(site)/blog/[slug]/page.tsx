import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { blogPosts, categoryColors, formatDate } from "@/lib/blog-data";
import { getPostBySlug } from "@/sanity/lib/queries";
import { FadeIn } from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug.current === slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post: typeof blogPosts[0] | null = null;

  // Try Sanity first
  try {
    const sanityPost = await getPostBySlug(slug);
    if (sanityPost) post = sanityPost as unknown as typeof blogPosts[0];
  } catch {
    // fallback
  }

  // Fallback statique
  if (!post) {
    const found = blogPosts.find((p) => p.slug.current === slug);
    if (!found) notFound();
    post = found;
  }

  const related = blogPosts
    .filter((p) => p._id !== post!._id && p.category === post!.category)
    .slice(0, 2);

  const gradient = categoryColors[post.category] ?? "from-brand-500 to-accent-500";

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </FadeIn>

          {/* Hero image */}
          <FadeIn delay={0.05}>
            <div className="aspect-[16/7] rounded-2xl overflow-hidden relative mb-10">
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", gradient)} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[200px] font-display font-bold text-white/5 select-none leading-none">
                  {post.title.charAt(0)}
                </span>
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="tag">{post.category}</span>
              </div>
            </div>
          </FadeIn>

          {/* Meta */}
          <FadeIn delay={0.1} className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                {post.author.name.charAt(0)}
              </div>
              <span>{post.author.name}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} min de lecture
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.12}>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-8">
              {post.title}
            </h1>
          </FadeIn>

          {/* Excerpt / Intro */}
          <FadeIn delay={0.15}>
            <p className="text-xl text-slate-300 leading-relaxed border-l-2 border-brand-500 pl-6 mb-10">
              {post.excerpt}
            </p>
          </FadeIn>

          {/* Body placeholder — remplacé par Portable Text quand Sanity est configuré */}
          <FadeIn delay={0.2}>
            <div className="prose prose-invert prose-lg max-w-none space-y-6 text-slate-400 leading-relaxed">
              <p>
                Cet article est en cours de rédaction et sera disponible prochainement.
                Connectez votre CMS Sanity pour publier du contenu riche directement
                depuis le back-office.
              </p>
              <p>
                En attendant, vous pouvez{" "}
                <Link href="/contact" className="text-brand-400 hover:text-brand-300 underline underline-offset-4">
                  nous contacter
                </Link>{" "}
                ou consulter nos autres articles disponibles.
              </p>
            </div>
          </FadeIn>

          {/* Tags */}
          <FadeIn delay={0.25} className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {[post.category, "Zephyr", "Digital"].map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.3} className="mt-12">
            <div className="glass rounded-2xl p-8 text-center space-y-4 border-brand-500/20">
              <h3 className="text-xl font-bold text-white">
                Vous avez un projet digital ?
              </h3>
              <p className="text-slate-400 text-sm">
                Discutons de votre vision. Notre équipe répond sous 48h.
              </p>
              <Link href="/devis" className="btn-primary inline-flex">
                Démarrer mon projet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          {/* Related */}
          {related.length > 0 && (
            <FadeIn delay={0.35} className="mt-16">
              <h3 className="text-lg font-semibold text-white mb-6">
                Articles similaires
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link key={rel._id} href={`/blog/${rel.slug.current}`} className="group">
                    <div className="card space-y-2 hover:border-brand-500/30 transition-all">
                      <span className="tag text-xs">{rel.category}</span>
                      <h4 className="font-semibold text-white text-sm leading-snug group-hover:gradient-text transition-all">
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {rel.readingTime} min
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}

        </div>
      </div>
    </div>
  );
}
