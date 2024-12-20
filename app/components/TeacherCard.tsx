"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Teacher } from '../../lib/teacherData';

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
        <p className="text-[#fc5d01] font-medium mb-2">{teacher.position}</p>
        <p className="text-gray-600 text-sm mb-4">{teacher.experience}</p>

        {/* Qualifications */}
        {teacher.qualifications.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Qualifications</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {teacher.qualifications.map((qual, idx) => (
                <li key={idx}>{qual}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Specialization & Current Work */}
        {(teacher.specialization || teacher.currentWork) && (
          <div className="mb-4 space-y-2">
            {teacher.specialization && (
              <div>
                <span className="text-sm font-semibold text-gray-800">Specialization: </span>
                <span className="text-sm text-gray-600">{teacher.specialization}</span>
              </div>
            )}
            {teacher.currentWork && (
              <div>
                <span className="text-sm font-semibold text-gray-800">Current Work: </span>
                <span className="text-sm text-gray-600">{teacher.currentWork}</span>
              </div>
            )}
          </div>
        )}

        {/* Location & Hobbies */}
        <div className="mb-4 space-y-2">
          <div>
            <span className="text-sm font-semibold text-gray-800">Location: </span>
            <span className="text-sm text-gray-600">{teacher.location}</span>
          </div>
          {teacher.hobbies && (
            <div>
              <span className="text-sm font-semibold text-gray-800">Hobbies: </span>
              <span className="text-sm text-gray-600">{teacher.hobbies}</span>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="space-y-2 mb-4">
          {teacher.achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-5 h-5 flex-shrink-0 bg-[#fc5d01]/10 rounded-full flex items-center justify-center mt-1">
                <svg 
                  className="w-3 h-3 text-[#fc5d01]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">{achievement}</p>
            </div>
          ))}
        </div>

        {/* Quotes */}
        {teacher.quotes.length > 0 && (
          <div className="border-t pt-4">
            <div className="space-y-2">
              {teacher.quotes.map((quote, idx) => (
                <p key={idx} className="text-sm italic text-gray-600">"{quote}"</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
