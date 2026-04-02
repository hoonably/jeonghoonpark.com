import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getMarkdownAction, getBlogPostsAction } from "@/app/actions";
import { formatYmdForDisplay, getYmdInSeoul } from "@/app/lib/date";
import CodeBlock from "./CodeBlock";
import "@/app/globals.css";
import "../notion.css";
import "../navigation.css";
import "katex/dist/katex.min.css";
import Giscus from "./Giscus";
import Footer from "@/components/layout/Footer";

// Generate static routes at build time
export async function generateStaticParams() {
  const posts = await getBlogPostsAction();
  return posts.map((post: any) => ({
    post: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ post: string }> }) {
  const resolvedParams = await params;
  const postData = await getMarkdownAction("blog", resolvedParams.post);
  if (!postData) {
    return { title: "Post Not Found | Jeonghoon Park" };
  }
  return {
    title: `${postData.data.title || 'Untitled'} | Jeonghoon Park`,
    description: postData.data.excerpt || "Blog post",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ post: string }> }) {
  const resolvedParams = await params;
  const postData = await getMarkdownAction("blog", resolvedParams.post);
  
  if (!postData) {
    notFound();
  }

  const { title, date, category, tags } = postData.data;
  
  // Clean date parsing if needed
  let dateStr = "";
  if (date) {
    const ymd = getYmdInSeoul(date);
    dateStr = ymd ? formatYmdForDisplay(ymd, "long") : String(date);
  }

  const tagList = Array.isArray(tags) ? tags : (tags ? [tags] : []);

  return (
    <main className="blog-page">
      <div className="blog-hero">
        <h1 className="blog-hero-title">{title || "Untitled"}</h1>
        
        {/* Post Metadata Row */}
        <div className="blog-post-row" style={{ borderBottom: "none", padding: "0", marginTop: "1rem" }}>
          <div className="blog-post-row-left">
            {tagList.length > 0 && (
              <div className="blog-post-tags-row">
                {tagList.map((tag: string) => (
                  <span key={tag} className="blog-post-tag">{tag}</span>
                ))}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              {category && (
                 <span className="blog-post-tag" style={{ background: "transparent", fontWeight: 700 }}>
                   {category}
                 </span>
              )}
            </div>
          </div>
          <time className="blog-post-date">{dateStr}</time>
        </div>
      </div>

      <article className="blog-content notion-content">
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw]}
          components={{
            code: CodeBlock,
            img: ({ node, ...props }: any) => {
              const style = { ...props.style };
              // Strip !important from style values as React doesn't support them in style objects
              Object.keys(style).forEach(key => {
                if (typeof style[key] === 'string' && style[key].includes('!important')) {
                  style[key] = style[key].replace(/\s*!important/g, '');
                }
              });

              const isBadge = props.src?.includes("shields.io") || props.src?.includes("img.shields.io");
              const mergedStyle = { 
                height: 'auto', 
                maxWidth: '100%',
                ...style 
              };
              
              const baseClasses = isBadge ? "" : "framed-image";
              const mergedClassName = [baseClasses, props.className].filter(Boolean).join(" ");
              
              return (
                <Image
                  src={props.src}
                  alt={props.alt || "Blog Image"}
                  width={1000}
                  height={600}
                  className={mergedClassName}
                  style={mergedStyle}
                  unoptimized={true}
                />
              );
            },
            a: ({ node, ...props }: any) => {
              const href = props.href || "";
              const isExternal = href.startsWith("http") && !href.includes("jeonghoonpark.com");
              if (isExternal) {
                return <a {...props} target="_blank" rel="noopener noreferrer" />;
              }
              return <a {...props} />;
            },
            iframe: ({ node, ...props }: any) => {
              const normalizedProps = { ...props };
              
              const isFull = 
                normalizedProps.allowfullscreen === "true" || 
                normalizedProps.allowFullScreen === "true" ||
                normalizedProps.allowfullscreen === "" ||
                normalizedProps.allowFullScreen === "" ||
                !!normalizedProps.allowFullScreen;

              delete normalizedProps.allowfullscreen;
              delete normalizedProps.allowFullScreen;
              delete normalizedProps.webkitallowfullscreen;
              delete normalizedProps.mozallowfullscreen;

              if (isFull) {
                normalizedProps.allowFullScreen = true;
              }
              if (normalizedProps.frameborder) {
                normalizedProps.frameBorder = normalizedProps.frameborder;
                delete normalizedProps.frameborder;
              }
              return <iframe {...normalizedProps} />;
            }
          }}
        >
          {postData.content}
        </ReactMarkdown>

        <PostNavigation currentSlug={resolvedParams.post} category={category} />

        <Giscus />
        <Footer />
      </article>
    </main>
  );
}

async function PostNavigation({ currentSlug, category }: { currentSlug: string; category: string }) {
  const allPosts = await getBlogPostsAction();
  
  // Filter by category
  const categoryPosts = allPosts.filter(p => p.category === category);
  
  // Find current index
  const currentIndex = categoryPosts.findIndex(p => p.slug === currentSlug);
  
  // In our list (sorted by date DESC), index 0 is NEWEST.
  // So "Newer Post" is index - 1, "Older Post" is index + 1.
  const nextPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null; // Newer
  const prevPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null; // Older

  if (!nextPost && !prevPost) return null;

  return (
    <>
      <div className="post-navigation">
        <div className="post-nav-side">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="post-nav-item post-nav-prev">
              <div className="nav-direction">← Older Post</div>
              <div className="nav-title">{prevPost.title}</div>
              <div className="nav-date">{prevPost.dateStr}</div>
            </Link>
          ) : (
            <div className="nav-placeholder"></div>
          )}
        </div>
        
        <div className="post-nav-side">
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="post-nav-item post-nav-next">
              <div className="nav-direction">Newer Post →</div>
              <div className="nav-title">{nextPost.title}</div>
              <div className="nav-date">{nextPost.dateStr}</div>
            </Link>
          ) : (
            <div className="nav-placeholder"></div>
          )}
        </div>
      </div>

      <div className="post-nav-back">
        <Link href="/blog" className="post-nav-item back-btn">
          <div className="nav-title">Back to Blog List</div>
        </Link>
      </div>
    </>
  );
}
