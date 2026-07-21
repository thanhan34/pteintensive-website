export function ArticleRenderer({ html }: { html: string }) {
  return <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:mt-10 prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-8 prose-a:text-[#FC5D01] prose-blockquote:border-l-[#FC5D01] prose-img:rounded-2xl" dangerouslySetInnerHTML={{ __html: html }} />;
}
