"use client";

import Image from 'next/image';
import { teacherData } from '../../lib/teacherData';

interface TeacherCardProps {
  teacher: (typeof teacherData)[0];
}

function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-6 shadow-lg">
      <div className="flex flex-col h-full">
        <div className="mb-6 relative h-48">
          <Image
            src={teacher.image}
            alt={teacher.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-red-600 mb-3">
            {teacher.name}
          </h3>
          <p className="text-gray-700 font-medium mb-4">
            {teacher.experience}
          </p>
          <ul className="space-y-2">
            {teacher.achievements.map((achievement, idx) => (
              <li
                key={idx}
                className="flex items-start text-gray-700 text-sm"
              >
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function TeacherSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            ĐỘI NGŨ GIÁO VIÊN TÂN TÂM - TẦM HUYẾT
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Là những giáo viên giỏi kiến thức và giỏi truyền đạt. Rất tận tâm với học viên, 
            dí dạy vì cái tâm và luôn khát khao học viên thì đạt mục tiêu đề ra
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teacherData.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </section>
  );
}
