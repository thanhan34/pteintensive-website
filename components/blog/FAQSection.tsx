export function FAQSection({ faqs }: { faqs: any[] }) {
  if (!faqs?.length) return null;
  return <section className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow"><h2 className="text-2xl font-bold text-gray-900">Câu hỏi thường gặp</h2><div className="mt-6 divide-y divide-gray-100">{faqs.map((faq, index) => <details key={index} className="group py-4"><summary className="cursor-pointer font-semibold text-gray-900 group-open:text-[#FC5D01]">{faq.question}</summary><p className="mt-3 leading-7 text-gray-600">{faq.answer}</p></details>)}</div></section>;
}
