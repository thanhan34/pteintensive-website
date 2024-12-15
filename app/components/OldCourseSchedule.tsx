"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function OldCourseSchedule() {
  const courses = [
    "PTE Pre",
    "PTE 30-36",
    "PTE 42-50",
    "PTE 50+"
  ];

  // Get all Tuesdays in the current month and find current week
  const getTuesdaysAndCurrentWeek = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const tuesdays = [];
    let currentWeekIndex = 0;
    
    // Start from the first day of the month
    const date = new Date(currentYear, currentMonth, 1);
    
    // Find all Tuesdays in the current month
    while (date.getMonth() === currentMonth) {
      if (date.getDay() === 2) { // Tuesday is 2
        if (date <= now) {
          currentWeekIndex = tuesdays.length;
        }
        tuesdays.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }
    
    return { tuesdays, currentWeekIndex };
  };

  const { tuesdays, currentWeekIndex } = getTuesdaysAndCurrentWeek();
  const [activeWeek, setActiveWeek] = useState(currentWeekIndex);

  // Set active week to current week on component mount
  useEffect(() => {
    setActiveWeek(currentWeekIndex);
  }, [currentWeekIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lịch Khai Giảng Tháng {new Date().toLocaleString('vi-VN', { month: 'long' })}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Các khóa học khai giảng vào mỗi Thứ Ba hàng tuần
          </p>
        </motion.div>

        {/* Week Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex rounded-lg bg-[#fedac2]/20 p-1">
            {tuesdays.map((tuesday, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeWeek === index
                    ? 'bg-[#fc5d01] text-white'
                    : 'text-[#fc5d01] hover:bg-[#fedac2]/50'
                }`}
                onClick={() => setActiveWeek(index)}
              >
                Tuần {index + 1}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="overflow-x-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <table className="w-full min-w-[800px] bg-white rounded-xl shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-[#fc5d01] text-white">
                <th className="py-4 px-6 text-left">Khóa Học</th>
                <th className="py-4 px-6 text-left">Ngày Khai Giảng</th>
                <th className="py-4 px-6 text-center">Thời Gian</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#fedac2]/10'}
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {course}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {tuesdays[activeWeek].toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    18:00 - 20:00
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>* Học viên có thể chọn lịch học linh hoạt theo thời gian phù hợp</p>
          <p>* Mỗi khóa học 2 buổi/tuần</p>
          <p className="mt-2 text-[#fc5d01]">
            * Các khóa học khai giảng vào mỗi Thứ Ba hàng tuần
          </p>
        </motion.div>
      </div>
    </section>
  );
}
