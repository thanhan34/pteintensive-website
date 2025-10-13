import Image from 'next/image';

// Simple components without complex dependencies
export const MDXComponents = {
  // Headings
  h1: (props: any) => (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight mb-3"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className="scroll-m-20 text-lg font-semibold tracking-tight mb-3"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className="scroll-m-20 text-base font-semibold tracking-tight mb-3"
      {...props}
    />
  ),

  // Paragraphs and text
  p: (props: any) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),

  // Lists
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 ml-6 list-decimal" {...props} />
  ),
  li: (props: any) => (
    <li className="mt-2" {...props} />
  ),

  // Links
  a: (props: any) => (
    <a
      className="font-medium text-[#fc5d01] underline underline-offset-4 hover:opacity-80"
      {...props}
    />
  ),

  // Blockquotes
  blockquote: (props: any) => (
    <blockquote
      className="mt-6 border-l-2 border-[#fc5d01] pl-6 italic text-gray-600"
      {...props}
    />
  ),

  // Code
  code: (props: any) => (
    <code
      className="relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-gray-100 p-4"
      {...props}
    />
  ),

  // Tables
  table: (props: any) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: (props: any) => (
    <tr
      className="m-0 border-t p-0 even:bg-gray-50"
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),

  // Images
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-md" {...props} />
  ),

  // Horizontal rule
  hr: (props: any) => <hr className="my-4 md:my-8" {...props} />,
};

// Export all custom components
export const CustomMDXComponents = {
  ...MDXComponents,
};
