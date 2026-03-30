// Server-side data fetching utilities (called from Server Components at build time)

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Reads markdown content with YAML frontmatter from the filesystem.
 */
export async function getMarkdownAction(category: string, slug: string) {
  try {
    let filePath = path.join(process.cwd(), "content", category, `${slug}.md`);
    
    // Check if file exists, if not and category is blog, try searching with date prefix
    try {
      await fs.access(filePath);
    } catch (e) {
      if (category === "blog") {
        const blogDir = path.join(process.cwd(), "content", "blog");
        const files = await fs.readdir(blogDir);
        // Find file that ends with -slug.md (e.g., 2024-01-01-gta1.md matching slug gta1)
        const matchedFile = files.find(f => f.endsWith(`-${slug}.md`));
        if (matchedFile) {
          filePath = path.join(blogDir, matchedFile);
        } else {
          throw new Error(`File not found: ${slug}.md in ${category}`);
        }
      } else {
        throw e;
      }
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);
    return { data, content };
  } catch (error) {
    console.error(`Error reading markdown file for ${category}/${slug}:`, error);
    return null;
  }
}

/**
 * Retrieves all projects from app/projects/*.md files.
 */
export async function getProjectsAction() {
  try {
    const projectsDir = path.join(process.cwd(), "content", "projects");
    const files = await fs.readdir(projectsDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const projects = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = path.join(projectsDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug: filename.replace(".md", ""),
          title: data.title || "Untitled",
          description: data.description || "",
          period: data.period || "N/A",
          tech: data.tech || (data.category ? [data.category] : []),
          image: data.img || null,
          content: content || "",
          links: {
            github: data.github || null,
            demo: data.demo || null,
            page: data.page || null,
            pdf: data.pdf || null,
          },
        };
      })
    );

    // Sort by slug descending
    return projects.sort((a, b) => b.slug.localeCompare(a.slug));
  } catch (error) {
    console.error("Error reading projects directory:", error);
    return [];
  }
}

/**
 * Retrieves all teaching items from app/teaching/*.md files.
 */
export async function getTeachingAction() {
  try {
    const teachingDir = path.join(process.cwd(), "content", "teaching");
    const files = await fs.readdir(teachingDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const teachingItems = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = path.join(teachingDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContent);
        // frontmatter.description -> title
        // frontmatter.title -> org
        // frontmatter.period -> period
        // frontmatter.category -> category
        return {
          slug: filename.replace(".md", ""),
          title: data.description || data.category || "Untitled",
          org: data.title || "",
          period: data.period || "N/A",
          category: data.category || "General",
          content: content || "",
        };
      })
    );

    // Sort by slug descending (YY-MM-DD format works for alphabetical sort)
    return teachingItems.sort((a, b) => b.slug.localeCompare(a.slug));
  } catch (error) {
    console.error("Error reading teaching directory:", error);
    return [];
  }
}

/**
 * Retrieves all publications from app/publications/*.md files.
 */
export async function getPublicationsAction() {
  try {
    const pubDir = path.join(process.cwd(), "content", "publications");
    const files = await fs.readdir(pubDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const items = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = path.join(pubDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug: filename.replace(".md", ""),
          title: data.title || "Untitled",
          authors: data.authors || "",
          venue: data.venue || "",
          year: data.year || 0,
          type: data.type || "preprint",
          badge: data.badge || "",
          abstract: data.abstract || "",
          content: content || "",
          links: {
            paper: data.paper || null,
            arxiv: data.arxiv || null,
            code: data.code || null,
            poster: data.poster || null,
            project: data.project || null,
          },
        };
      })
    );

    // Sort by year descending
    return items.sort((a, b) => b.year - a.year);
  } catch (error) {
    console.error("Error reading publications directory:", error);
    return [];
  }
}

/**
 * Retrieves all blog posts from app/blog/*.md files.
 */
export async function getBlogPostsAction() {
  try {
    const blogDir = path.join(process.cwd(), "content", "blog");
    const files = await fs.readdir(blogDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const posts = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = path.join(blogDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContent);

        // Extract a short excerpt from the content body
        const plainText = content
          .replace(/```[\s\S]*?```/g, "") // remove code blocks
          .replace(/\|.*\|/g, "")         // remove tables
          .replace(/#{1,6}\s+/g, "")      // remove headings
          .replace(/[\*_`~>\-]+/g, "")   // remove markdown symbols
          .replace(/\n+/g, " ")
          .trim();
        const excerpt = plainText.slice(0, 120).trim() + (plainText.length > 120 ? "..." : "");

        const fullSlug = filename.replace(".md", "");
        const displaySlug = fullSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");

        return {
          slug: displaySlug,
          title: data.title || "Untitled",
          date: data.date ? new Date(data.date) : new Date(0),
          dateStr: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
          category: data.category || "Uncategorized",
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
          excerpt,
        };
      })
    );

    // Sort by date descending
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}



