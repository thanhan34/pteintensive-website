import React from 'react';
import Link from 'next/link';

// Enhanced Table Component
export const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-8 rounded-xl shadow-lg">
    <table className="min-w-full divide-y divide-gray-200" {...props}>
      {children}
    </table>
  </div>
);

export const THead = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33]" {...props}>
    {children}
  </thead>
);

export const TBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="bg-white divide-y divide-gray-200" {...props}>
    {children}
  </tbody>
);

export const TH = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
    {...props}
  >
    {children}
  </th>
);

export const TD = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-6 py-4 text-sm text-gray-700 leading-relaxed" {...props}>
    {children}
  </td>
);

// Enhanced Heading Components with icons
export const H1 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 
    className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-gray-900 flex items-center gap-3 group"
    {...props}
  >
    <span className="w-2 h-12 bg-gradient-to-b from-[#fc5d01] to-[#fd7f33] rounded-full group-hover:scale-110 transition-transform"></span>
    <span className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] bg-clip-text text-transparent">
      {children}
    </span>
  </h1>
);

export const H2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 
    className="text-3xl md:text-4xl font-bold mt-10 mb-5 text-gray-900 flex items-center gap-3 pb-3 border-b-2 border-[#fedac2] group"
    {...props}
  >
    <span className="text-[#fc5d01] group-hover:scale-110 transition-transform">📌</span>
    {children}
  </h2>
);

export const H3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 
    className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-900 flex items-center gap-2"
    {...props}
  >
    <span className="w-1.5 h-8 bg-gradient-to-b from-[#fc5d01] to-[#ffac7b] rounded-full"></span>
    {children}
  </h3>
);

export const H4 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 
    className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800"
    {...props}
  >
    {children}
  </h4>
);

// Enhanced Paragraph
export const P = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="mb-6 text-gray-700 leading-relaxed text-base md:text-lg" {...props}>
    {children}
  </p>
);

// Enhanced Lists
export const UL = ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="my-6 space-y-3" {...props}>
    {children}
  </ul>
);

export const OL = ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="my-6 space-y-3 counter-reset" {...props}>
    {children}
  </ol>
);

export const LI = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => {
  const parent = props.className?.includes('task-list-item') ? 'task' : 'default';
  
  if (parent === 'task') {
    return <li className="flex items-start gap-2 ml-0" {...props}>{children}</li>;
  }
  
  return (
    <li className="flex items-start gap-3 ml-2 text-gray-700 leading-relaxed" {...props}>
      <span className="text-[#fc5d01] font-bold mt-1 flex-shrink-0">•</span>
      <span className="flex-1">{children}</span>
    </li>
  );
};

// Enhanced Blockquote
export const Blockquote = ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
  <blockquote 
    className="relative border-l-4 border-[#fc5d01] bg-gradient-to-r from-[#fedac2]/20 to-[#fdbc94]/10 pl-6 pr-6 py-5 my-8 rounded-r-xl shadow-md italic"
    {...props}
  >
    <div className="absolute -left-3 top-4 w-6 h-6 bg-[#fc5d01] rounded-full flex items-center justify-center text-white text-sm">
      💡
    </div>
    <div className="text-gray-700 leading-relaxed">
      {children}
    </div>
  </blockquote>
);

// Enhanced Link
export const A = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternal = href?.startsWith('/') || href?.startsWith('#');
  
  if (isInternal) {
    return (
      <Link
        href={href || '#'}
        className="text-[#fc5d01] font-medium hover:text-[#fd7f33] underline decoration-2 underline-offset-2 hover:decoration-[#ffac7b] transition-all duration-200"
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#fc5d01] font-medium hover:text-[#fd7f33] underline decoration-2 underline-offset-2 hover:decoration-[#ffac7b] transition-all duration-200 inline-flex items-center gap-1"
      {...props}
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

// Enhanced Code
export const Code = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const isInline = !props.className?.includes('language-');
  
  if (isInline) {
    return (
      <code 
        className="bg-gradient-to-r from-[#fedac2]/50 to-[#fdbc94]/30 text-[#fc5d01] px-2 py-1 rounded-md text-sm font-mono font-semibold border border-[#fdbc94]/30"
        {...props}
      >
        {children}
      </code>
    );
  }
  
  return <code {...props}>{children}</code>;
};

// Enhanced Pre (Code Block)
export const Pre = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
  <div className="relative my-8 rounded-xl overflow-hidden shadow-xl">
    <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 flex items-center px-4 gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <pre 
      className="bg-gray-900 text-gray-100 p-6 pt-14 overflow-x-auto text-sm md:text-base font-mono leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  </div>
);

// Enhanced Strong
export const Strong = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <strong className="font-bold text-gray-900" {...props}>
    {children}
  </strong>
);

// Enhanced Em
export const Em = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <em className="italic text-gray-700" {...props}>
    {children}
  </em>
);

// Horizontal Rule
export const HR = (props: React.HTMLAttributes<HTMLHRElement>) => (
  <hr className="my-12 border-0 h-1 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent rounded-full" {...props} />
);

// Enhanced Image
export const Img = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt || ''}
      className="w-full h-auto"
      loading="lazy"
      {...props}
    />
    {alt && (
      <div className="bg-gradient-to-r from-[#fedac2] to-[#fdbc94] px-4 py-2 text-sm text-gray-700 italic text-center">
        {alt}
      </div>
    )}
  </div>
);

// Info Box Component
export const InfoBox = ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' | 'tip' }) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'ℹ️',
      iconBg: 'bg-blue-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠️',
      iconBg: 'bg-yellow-500',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✅',
      iconBg: 'bg-green-500',
    },
    tip: {
      bg: 'bg-gradient-to-r from-[#fedac2]/30 to-[#fdbc94]/20',
      border: 'border-[#fc5d01]',
      icon: '💡',
      iconBg: 'bg-[#fc5d01]',
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border-l-4 ${style.border} rounded-r-xl p-6 my-8 shadow-md`}>
      <div className="flex items-start gap-4">
        <div className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0`}>
          {style.icon}
        </div>
        <div className="flex-1 text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// Export all components
export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  a: A,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  strong: Strong,
  em: Em,
  hr: HR,
  img: Img,
  table: Table,
  thead: THead,
  tbody: TBody,
  th: TH,
  td: TD,
  InfoBox,
};
