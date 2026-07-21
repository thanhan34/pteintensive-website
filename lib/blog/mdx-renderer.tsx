import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import { MDXComponents } from './mdx-components';

interface MDXRendererProps {
  content: string;
}

export async function MDXRenderer({ content }: MDXRendererProps) {
  const compiled = await compile(content, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [rehypePrismPlus, { ignoreMissing: true }],
    ],
  });

  const { default: MDXContent } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <MDXContent components={MDXComponents} />;
}
