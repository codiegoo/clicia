// app/blog/categoria/[nombre]/page.jsx
export default function CategoriaPage({ params }) {
  const { nombre } = params;
  const posts = [
    {
      title: "Cómo usar ChatGPT para tu productividad",
      slug: "chatgpt-productividad",
      category: "productividad",
    },
    {
      title: "Las 5 mejores herramientas IA para diseño gráfico",
      slug: "top-herramientas-ia-diseno",
      category: "diseño",
    },
  ];

  const filtered = posts.filter((p) => p.category === nombre);

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">Categoría: {nombre}</h1>
      <div className="space-y-8">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="block border-b pb-4">
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </a>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay publicaciones en esta categoría.</p>
        )}
      </div>
    </main>
  );
}
