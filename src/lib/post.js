import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/");

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
      slug: filename.replace(".md", ""),
    };
  });

  // Opcional: ordena por fecha (más nuevo primero)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
