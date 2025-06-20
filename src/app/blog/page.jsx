// app/blog/page.jsx
export default function BlogPage() {
  const posts = [
    {
      title: "Cómo usar ChatGPT para tu productividad",
      slug: "chatgpt-productividad",
      summary: "Aprende a integrar ChatGPT en tu flujo diario y ahorrar horas cada semana.",
      date: "2025-06-15",
    },
    {
      title: "Las 5 mejores herramientas IA para diseño gráfico",
      slug: "top-herramientas-ia-diseno",
      summary: "Una comparativa visual de herramientas que potencian tu creatividad.",
      date: "2025-06-12",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="block border-b pb-6 group">
            <h2 className="text-2xl font-semibold group-hover:underline">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
            <p className="text-gray-700">{post.summary}</p>
          </a>
        ))}
      </div>
    </main>
  );
}