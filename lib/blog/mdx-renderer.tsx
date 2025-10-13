import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { CustomMDXComponents } from '../mdx/components';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

interface MDXRendererProps {
  content: string;
}

export async function MDXRenderer({ content }: MDXRendererProps) {
  try {
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

    return <MDXContent components={CustomMDXComponents} />;
  } catch (error) {
    console.error('MDX rendering error:', error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error rendering MDX content</p>
      </div>
    );
  }
}
