"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
  { 
    label: 'Hệ Thống Tính Điểm',
    href: '/knowledge/scoring-system'
  },
  {
    label: 'Speaking Guide',
    items: [
      { label: 'Read Aloud', href: '/knowledge/speaking/read-aloud' },
      { label: 'Repeat Sentence', href: '/knowledge/speaking/repeat-sentence' },
      { label: 'Describe Image', href: '/knowledge/speaking/describe-image' },
      { label: 'Retell Lecture', href: '/knowledge/speaking/retell-lecture' },
      { label: 'Answer Short Question', href: '/knowledge/speaking/answer-short-question' }
    ]
  },
  {
    label: 'Writing Guide',
    items: [
      { label: 'Summarize Written Text', href: '/knowledge/writing/summarize-text' },
      { label: 'Write Essay', href: '/knowledge/writing/essay' }
    ]
  },
  {
    label: 'Reading Guide',
    items: [
      { label: 'Reading & Writing: Fill in the Blanks', href: '/knowledge/reading/rwfib' },
      { label: 'Multiple Choice (Multiple)', href: '/knowledge/reading/mcma' }, 
      { label: 'Re-order Paragraphs', href: '/knowledge/reading/rop' },      
      { label: 'Reading: Fill in the Blanks', href: '/knowledge/reading/rfib' },
      { label: 'Multiple Choice (Single)', href: '/knowledge/reading/mcsa' },
    ]
  },
  {
    label: 'Listening Guide',
    items: [
      { label: 'Summarize Spoken Text', href: '/knowledge/listening/summarize-spoken' },
      { label: 'Multiple Choice (Multiple)', href: '/knowledge/listening/mcma' },      
      { label: 'Fill in the Blanks', href: '/knowledge/listening/fill-blanks' },
      { label: 'Highlight Correct Summary', href: '/knowledge/listening/highlight-summary' },
      { label: 'Multiple Choice (Single)', href: '/knowledge/listening/mcsa' },  
      { label: 'Select Missing Word', href: '/knowledge/listening/select-missing' },
      { label: 'Highlight Incorrect Words', href: '/knowledge/listening/highlight-incorrect' },
      { label: 'Write From Dictation', href: '/knowledge/listening/write-dictation' }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Auto-open section containing active page
  useEffect(() => {
    const activeSection = menuItems.find(item => 
      item.items?.some(subItem => subItem.href === pathname)
    );
    if (activeSection) {
      setOpenSection(activeSection.label);
    }
  }, [pathname]);

  const toggleSection = (label: string) => {
    setOpenSection(current => current === label ? null : label);
  };

  const isActiveSection = (section: typeof menuItems[0]) => {
    if (section.href) return pathname === section.href;
    return section.items?.some(item => pathname === item.href);
  };

  return (
    <div className="w-64 bg-white">
      <nav>
        {menuItems.map((section, idx) => (
          <div key={idx}>
            {section.href ? (
              <Link
                href={section.href}
                className={`block px-6 py-3 text-sm font-medium transition-colors ${
                  pathname === section.href
                    ? 'bg-orange-50 text-[#FF4D00]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {section.label}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => toggleSection(section.label)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
                    isActiveSection(section)
                      ? 'bg-orange-50 text-[#FF4D00]'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{section.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openSection === section.label ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSection === section.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gray-50">
                    {section.items?.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className={`block pl-10 pr-6 py-2.5 text-sm transition-colors ${
                          pathname === item.href
                            ? 'bg-orange-50 text-[#FF4D00] font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
