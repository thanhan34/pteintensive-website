"use client";

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  answer: string;
}

export default function CommonQuestions() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const idPrefix = useId();

  const questions: Question[] = [
    {
      id: 1,
      question: "PTE có nghĩa là gì?",
      answer: "PTE (Pearson Test of English) là bài thi đánh giá khả năng tiếng Anh học thuật được công nhận toàn cầu, được phát triển bởi tập đoàn giáo dục Pearson."
    },
    {
      id: 2,
      question: "Kết quả của bài thi PTE được sử dụng để làm gì?",
      answer: "Kết quả PTE được sử dụng để xin visa du học, định cư, làm việc tại các quốc gia nói tiếng Anh như Úc, New Zealand, Canada, và nhiều quốc gia khác."
    },
    {
      id: 3,
      question: "Sự khác biệt giữa bài thi IELTS và PTE là gì?",
      answer: "PTE là bài thi hoàn toàn trên máy tính, chấm điểm bằng AI, có kết quả nhanh (2-5 ngày). IELTS có phần thi Speaking trực tiếp với giám khảo, chấm điểm thủ công, thời gian có kết quả lâu hơn."
    },
    {
      id: 4,
      question: "Kết quả thi PTE có được chấp nhận ở tất cả các quốc gia không?",
      answer: "PTE được chấp nhận rộng rãi tại hơn 3,000 tổ chức giáo dục và chính phủ trên toàn thế giới, đặc biệt là Úc, New Zealand, và nhiều quốc gia khác."
    },
    {
      id: 5,
      question: "Chứng chỉ PTE có giá trị trong bao lâu?",
      answer: "Chứng chỉ PTE có giá trị trong vòng 2 năm kể từ ngày thi."
    },
    {
      id: 6,
      question: "Có giới hạn số lần tham gia bài thi PTE hay không?",
      answer: "Không có giới hạn số lần thi PTE. Tuy nhiên, bạn phải chờ ít nhất 5 ngày giữa hai lần thi."
    },
    {
      id: 7,
      question: "Có tất cả bao nhiêu câu hỏi trong bài thi PTE?",
      answer: "Bài thi PTE gồm 20 dạng câu hỏi khác nhau, chia thành 3 phần chính: Speaking & Writing, Reading, và Listening."
    },
    {
      id: 8,
      question: "Tại sao nên lựa chọn PTE INTENSIVE?",
      answer: "PTE INTENSIVE cung cấp phương pháp học hiệu quả, đội ngũ giảng viên giàu kinh nghiệm, và cam kết đầu ra cho học viên."
    },
    {
      id: 9,
      question: "Trung tâm có hỗ trợ gì cho học viên trước khi thi không?",
      answer: "Trung tâm cung cấp tài liệu ôn tập, mock test, tư vấn chiến lược làm bài và hỗ trợ 1-1 cho học viên trước khi thi."
    },
    {
      id: 10,
      question: "Tôi có được học thử không?",
      answer: "Có, trung tâm có buổi học thử miễn phí để học viên trải nghiệm phương pháp giảng dạy và đánh giá trình độ."
    }
  ];

  const toggleQuestion = (id: number) => {
    setOpenQuestion(current => current === id ? null : id);
  };

  return (
    <section aria-labelledby={`${idPrefix}-heading`} className="home-content py-16 md:py-20 bg-gradient-to-b from-[#fedac2]/10 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id={`${idPrefix}-heading`}
          className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-4"
        >
          Những câu hỏi thường gặp
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-base leading-7 text-gray-600 md:mb-12">Tìm hiểu thêm trước khi bắt đầu hành trình học PTE của bạn.</p>

        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 ${
                openQuestion === q.id ? 'border-primary/50' : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <h3>
                <button
                type="button"
                id={`${idPrefix}-trigger-${q.id}`}
                aria-expanded={openQuestion === q.id}
                aria-controls={`${idPrefix}-answer-${q.id}`}
                onClick={() => toggleQuestion(q.id)}
                className="home-focus min-h-14 w-full rounded-2xl px-6 py-5 flex gap-4 items-center justify-between text-left transition hover:bg-peach-light/20"
              >
                <span className="font-medium text-gray-900">{q.question}</span>
                <Plus aria-hidden="true" className={`h-6 w-6 shrink-0 text-primary transition-transform duration-200 motion-reduce:transition-none ${openQuestion === q.id ? 'rotate-45' : ''}`} />
                </button>
              </h3>
              <div
                id={`${idPrefix}-answer-${q.id}`}
                hidden={openQuestion !== q.id}
                role="region"
                aria-labelledby={`${idPrefix}-trigger-${q.id}`}
                className="overflow-hidden px-6"
              >
                <p className="pb-5 text-sm leading-7 text-gray-600 md:text-base">{q.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-7 text-gray-600">Bạn có câu hỏi khác?{' '}<Link href="/contact" className="home-focus inline-flex min-h-11 items-center rounded-md font-semibold text-gray-900 underline decoration-primary underline-offset-4 hover:decoration-2">Liên hệ để được tư vấn</Link></p>
      </div>
    </section>
  );
}
