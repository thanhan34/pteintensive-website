"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CourseSchedule() {
  const [activeWeek, setActiveWeek] = useState(1);
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

  useEffect(() => {
    // Get current week of the month (1-4)
    const currentWeek = Math.ceil(currentDate.getDate() / 7);
    setActiveWeek(Math.min(currentWeek, 4)); // Ensure week doesn't exceed 4
  }, []);

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

        <div className="overflow-hidden rounded">
          {/* Week Tabs */}
          <div className="grid grid-cols-4 bg-gray-100">
            {[1, 2, 3, 4].map((week) => (
              <button
                key={week}
                onClick={() => setActiveWeek(week)}
                className={`py-4 text-lg font-medium transition-colors border-r last:border-r-0 border-gray-200
                  ${activeWeek === week 
                    ? 'bg-[#fc5d01] text-white border-b-0' 
                    : 'bg-gray-100 text-gray-500 border-b border-gray-200'}`}
              >
                Tuần {week}
              </button>
            ))}
          </div>

          {/* Course Details Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#fc5d01] text-white p-6 text-left font-medium border-r border-white/20 last:border-r-0">Khóa học</th>
                <th className="bg-[#fc5d01] text-white p-6 text-left font-medium border-r border-white/20 last:border-r-0">Mục tiêu đầu ra</th>
                <th className="bg-[#fc5d01] text-white p-6 text-left font-medium border-r border-white/20 last:border-r-0">Lịch học</th>
                <th className="bg-[#fc5d01] text-white p-6 text-left font-medium border-r border-white/20 last:border-r-0">Ngày khai giảng</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td className="p-6 border-b border-gray-200 text-[#fc5d01] font-medium bg-white">
                    {course.name}
                  </td>
                  <td className="p-6 border-b border-gray-200 bg-white">
                    {course.target}
                  </td>
                  <td className="p-6 border-b border-gray-200 bg-white">
                    {course.schedule}
                  </td>
                  <td className="p-6 border-b border-gray-200 bg-white">
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
