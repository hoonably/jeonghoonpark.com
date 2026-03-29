"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

type BlogPost = {
  slug: string;
  title: string;
  date: Date;
  dateStr: string;
  category: string;
  tags: string[];
  excerpt: string;
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Study: { bg: "rgba(37,99,235,0.12)", text: "#2563eb" },
  Algorithm: { bg: "rgba(124,58,237,0.12)", text: "#7c3aed" },
  Talk: { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
  Review: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  Project: { bg: "rgba(239,68,68,0.12)", text: "#ef4444" },
  Tip: { bg: "rgba(236,72,153,0.12)", text: "#db2777" },
  "Paper Review": { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
};

function getCategoryStyle(category: string) {
  return CATEGORY_COLORS[category] ?? { bg: "rgba(100,116,139,0.12)", text: "#64748b" };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
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
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  // showHeader는 activeCategory === "All"일 때 true입니다. 
  // 즉, 특정 카테고리를 눌렀을 때는 페이지네이션 없이 전체를 보여줍니다.
  const isPaginated = showHeader;
  const paginated = isPaginated
    ? posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
    : posts;
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

      <ul className="blog-post-list">
        {paginated.map((post) => (
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

      {isPaginated && totalPages > 1 && (
        <div className="blog-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`blog-page-btn${page === i ? " active" : ""}`}
              onClick={() => setPage(i)}
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

export default function BlogClientPage({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  const grouped = useMemo(() => {
    if (activeCategory !== "All") {
      return { [activeCategory]: posts.filter((p) => p.category === activeCategory) };
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
