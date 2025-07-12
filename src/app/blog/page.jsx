

import { getAllPosts } from "@/lib/post";
import BlogList from "@/components/BlogList/BlogList";

export default async function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
