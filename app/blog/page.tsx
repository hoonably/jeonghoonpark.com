import type { Metadata } from "next";
import { getBlogPostsAction } from "@/app/actions";
import BlogClientPage from "./BlogClientPage";

export const metadata: Metadata = {
  title: "Blog | Jeonghoon Park",
  description: "Reflections on computer science, AI, and the occasional off-topic ramble.",
};

export default async function BlogPage() {
  const posts = await getBlogPostsAction();
  return <BlogClientPage posts={posts} />;
}
