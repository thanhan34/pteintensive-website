"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CourseSchedule() {
  const [activeWeek, setActiveWeek] = useState(3); // Default to week 3 as shown in image
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('vi-VN', { month: 'long' });

  // Get all Tuesdays of the current month
  const getTuesdays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const tuesdays = [];

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 2) { // Tuesday is 2
        tuesdays.push(new Date(d));
      }
    }
    return tuesdays;
  };

  const tuesdays = getTuesdays();

  const getStartDate = (weekIndex: number) => {
    if (weekIndex < tuesdays.length) {
      return tuesdays[weekIndex].toLocaleDateString('vi-VN');
    }
    return 'Mỗi ngày';
  };

  const courses = [
    {
      name: "PTE Intensive Foundation",
      target: "Xây dựng nền tảng phát âm chuẩn IPA và cấu trúc ngữ pháp, từ vựng theo chủ đề",
      schedule: "2 buổi / tuần",
      startDate: getStartDate(activeWeek - 1)
    },
    {
      name: "PTE 30 - 36 - 42",
      target: "Luyện thi cấp tốc PTE 30 - 36 - 42",
      schedule: "2 buổi / tuần",
      startDate: getStartDate(activeWeek - 1)
    },
    {
      name: "PTE 50 - 58",
      target: "Luyện thi cấp tốc PTE 50 - 58",
      schedule: "4 buổi / tuần",
      startDate: getStartDate(activeWeek - 1)
    },
    {
      name: "Coaching 1:1",
      target: "Dạy và học 1-1 chinh phục mọi target",
      schedule: "Linh hoạt giữa học viên và Trainers",
      startDate: "Mỗi ngày"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#fc5d01] mb-4">
            PTE SIÊU KHÓ ĐỪNG NHĂN NHÓ
          </h2>
          <h3 className="text-2xl font-bold mb-2">
            VÌ ĐÃ CÓ PTE INTENSIVE LO
          </h3>
          <p className="text-lg text-gray-600">
            {currentMonth} {currentYear} - Khai giảng mỗi Thứ 3 hàng tuần
          </p>
        </motion.div>

        {/* Week Tabs */}
        <div className="flex mb-8">
          {[1, 2, 3, 4].map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`flex-1 py-3 text-lg font-medium transition-colors
                ${activeWeek === week 
                  ? 'bg-[#fc5d01] text-white' 
                  : 'bg-[#F3F4F6] text-gray-600 hover:bg-gray-200'}`}
            >
              Tuần {week}
            </button>
          ))}
        </div>

        {/* Course Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-[#fc5d01] bg-[#fc5d01] text-white p-4 text-left">KHÓA HỌC</th>
                <th className="border border-[#fc5d01] bg-[#fc5d01] text-white p-4 text-left">Mục tiêu đầu ra</th>
                <th className="border border-[#fc5d01] bg-[#fc5d01] text-white p-4 text-left">Lịch học</th>
                <th className="border border-[#fc5d01] bg-[#fc5d01] text-white p-4 text-left">Ngày khai giảng</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-orange-50">
                  <td className="border border-[#FFE5D9] p-4 font-medium text-[#fc5d01]">
                    {course.name}
                  </td>
                  <td className="border border-[#FFE5D9] p-4">
                    {course.target}
                  </td>
                  <td className="border border-[#FFE5D9] p-4">
                    {course.schedule}
                  </td>
                  <td className="border border-[#FFE5D9] p-4">
                    {course.startDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          className="mt-8 text-center text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>* Lịch học có thể điều chỉnh theo nhu cầu của lớp</p>
        </motion.div>
      </div>
    </section>
  );
}
