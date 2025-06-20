
export default async function PostPage({ params }) {
  const { slug } = await params;

  const posts = {
    "chatgpt-productividad": {
      title: "Cómo usar ChatGPT para tu productividad",
      date: "2025-06-15",
      content: `
        <p>ChatGPT puede ayudarte a organizar tareas, generar ideas, y automatizar respuestas.</p>
        <p>Una forma efectiva es integrarlo con Notion o Google Calendar.</p>
      `,
    },
    "top-herramientas-ia-diseno": {
      title: "Las 5 mejores herramientas IA para diseño gráfico",
      date: "2025-06-12",
      content: `
        <p>Una comparativa visual de herramientas que potencian tu creatividad.</p>
      `,
    },
  };

  const post = posts[slug];

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto py-16 px-4 prose">
        <h1>Post no encontrado</h1>
        <p>El artículo que buscas no existe.</p>
      </main>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-16 px-4 prose">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Publicado el {post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
