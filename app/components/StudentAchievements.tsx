"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { reviewData } from '@/lib/reviewData';
import Link from 'next/link';

export default function StudentAchievements() {
  // Get top achievements
  const achievements = [
    {
      type: 'highest',
      title: 'Điểm số cao nhất',
      data: reviewData
        .filter(review => review.score && parseInt(review.score.split(' ')[0] || '0') >= 65)
        .sort((a, b) => {
          const scoreA = parseInt(a.score?.split(' ')[0] || '0');
          const scoreB = parseInt(b.score?.split(' ')[0] || '0');
          return scoreB - scoreA;
        })[0]
    },
    {
      type: 'quickest',
      title: 'Tiến độ nhanh nhất',
      data: reviewData
        .filter(review => review.studyDuration && review.score && parseInt(review.score.split(' ')[0] || '0') >= 65)
        .sort((a, b) => {
          const durationA = parseInt(a.studyDuration?.split(' ')[0] || '999');
          const durationB = parseInt(b.studyDuration?.split(' ')[0] || '999');
          const scoreA = parseInt(a.score?.split(' ')[0] || '0');
          const scoreB = parseInt(b.score?.split(' ')[0] || '0');
          return durationA === durationB ? scoreB - scoreA : durationA - durationB;
        })[0]
    },
    {
      type: 'improved',
      title: 'Tiến bộ vượt bậc',
      data: reviewData
        .filter(review => review.beforeScore && review.afterScore)
        .sort((a, b) => {
          const improvementA = parseInt(a.afterScore?.split(' ')[0] || '0') - parseInt(a.beforeScore?.split(' ')[0] || '0');
          const improvementB = parseInt(b.afterScore?.split(' ')[0] || '0') - parseInt(b.beforeScore?.split(' ')[0] || '0');
          return improvementB - improvementA;
        })[0]
    }
  ].filter(item => item.data);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  if (achievements.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Thành Tích Học Viên
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những câu chuyện thành công đáng kinh ngạc từ học viên PTE INTENSIVE
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <motion.div
              key={`${achievement.type}-${achievement.data.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {/* Student Image */}
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={achievement.data.studentImage}
                  alt={achievement.data.name}
                  width={400}
                  height={192}
                  className="object-cover"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Achievement Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 text-[#fc5d01] px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {achievement.title}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{achievement.data.name}</h3>
                  <p className="text-sm opacity-90">{achievement.data.course}</p>
                </div>
              </div>

              <div className="p-6">
                {/* Score Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-600 font-medium">Điểm số đạt được</div>
                    <div className="text-[#fc5d01] font-bold text-xl">{achievement.data.score}</div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, (parseInt(achievement.data.score?.split(' ')[0] || '0') / 90) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                {/* Study Duration */}
                {achievement.data.studyDuration && (
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thời gian học: {achievement.data.studyDuration}</span>
                  </div>
                )}

                {/* Score Improvement */}
                {(achievement.data.beforeScore && achievement.data.afterScore) && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500">Trước</div>
                      <div className="text-sm text-gray-500">Sau</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-xl">{achievement.data.beforeScore}</div>
                      <svg className="w-5 h-5 text-[#fc5d01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <div className="font-bold text-xl text-[#fc5d01]">{achievement.data.afterScore}</div>
                    </div>
                  </div>
                )}

                {/* Review Preview */}
                <p className="text-gray-600 line-clamp-3 mb-4">{achievement.data.comment}</p>

                {/* Facebook Link */}
                {achievement.data.facebookLink && (
                  <Link
                    href={achievement.data.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#fc5d01] hover:text-[#fd7f33] transition-colors"
                  >
                    <span className="text-sm font-medium">Xem chi tiết</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}