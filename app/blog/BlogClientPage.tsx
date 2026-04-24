"use client";

import { useState, useMemo, useEffect, Suspense, useRef } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { formatYmdForDisplay } from "@/app/lib/date";

type BlogPost = {
  slug: string;
  title: string;
  date: Date;
  dateStr: string;
  category: string;
  tags: string[];
  excerpt: string;
};

import { getCategoryStyle } from "@/app/lib/blog";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return formatYmdForDisplay(dateStr, "short");
}

const PAGE_SIZE = 5;

function CategorySection({
  category,
  posts,
  showHeader,
}: {
  category: string;
  posts: BlogPost[];
  showHeader: boolean;
}) {
  const [page, setPage] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const isPaginated = showHeader;

  // Split posts into pages if paginated
  const pages = useMemo(() => {
    if (!isPaginated) return [posts];
    const chunks = [];
    for (let i = 0; i < posts.length; i += PAGE_SIZE) {
      chunks.push(posts.slice(i, i + PAGE_SIZE));
    }
    return chunks;
  }, [posts, isPaginated]);

  // Sync page state with scroll position
  const handleScroll = () => {
    if (!scrollRef.current || !isPaginated) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const newPage = Math.round(scrollLeft / clientWidth);
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  // Scroll to page when button is clicked
  const goToPage = (idx: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: idx * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
    setPage(idx);
  };

  const style = getCategoryStyle(category);

  return (
    <div className="blog-category-section">
      {showHeader && (
        <div className="blog-category-header">
          <span
            className="blog-category-badge"
            style={{ background: style.bg, color: style.text }}
          >
            {category}
          </span>
          <span className="blog-category-count">{posts.length} posts</span>
        </div>
      )}

      <div 
        className={isPaginated ? "blog-scroll-container" : ""} 
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {pages.map((pagePosts, idx) => (
          <div key={idx} className={isPaginated ? "blog-page-slide" : ""}>
            <ul className="blog-post-list">
              {pagePosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="blog-post-row">
                    <div className="blog-post-row-left">
                      {post.tags.filter(Boolean).length > 0 && (
                        <div className="blog-post-tags-row">
                          {post.tags.filter(Boolean).map((tag) => (
                            <span key={tag} className="blog-post-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="blog-post-title-wrapper">
                        <span className="blog-post-title">{post.title}</span>
                      </div>
                    </div>
                    <time className="blog-post-date">{formatDate(post.dateStr)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isPaginated && totalPages > 1 && (
        <div className="blog-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`blog-page-btn${page === i ? " active" : ""}`}
              onClick={() => goToPage(i)}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogContent({ posts }: { posts: BlogPost[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Sync activeCategory with query param
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  const grouped = useMemo(() => {
    if (activeCategory !== "All") {
      const filtered = posts.filter((p) => p.category === activeCategory);
      return filtered.length > 0 ? { [activeCategory]: filtered } : {};
    }
    const map: Record<string, BlogPost[]> = {};
    for (const post of posts) {
      if (!map[post.category]) map[post.category] = [];
      map[post.category].push(post);
    }
    return map;
  }, [posts, activeCategory]);

  return (
    <main className="blog-page">
      <div className="blog-hero">
        <h1 className="blog-hero-title">Blog</h1>
        <p className="blog-hero-desc">
          Reflections on computer science, AI, and the occasional off-topic ramble.
        </p>

        <div className="blog-filter-pills">
          {categories.map((cat) => {
            const style = getCategoryStyle(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                className={`blog-pill${isActive ? " active" : ""}`}
                style={isActive ? { background: style.bg, color: style.text, borderColor: style.text + "55" } : {}}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="blog-content">
        {Object.entries(grouped).map(([category, catPosts]) => (
          <CategorySection
            key={category}
            category={category}
            posts={catPosts}
            showHeader={activeCategory === "All"}
          />
        ))}

        {posts.filter((p) => activeCategory === "All" || p.category === activeCategory).length === 0 && (
          <p className="blog-empty">No posts in this category yet.</p>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default function BlogClientPage({ posts }: { posts: BlogPost[] }) {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogContent posts={posts} />
    </Suspense>
  );
}
