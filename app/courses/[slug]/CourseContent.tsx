"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Course } from '@/lib/courseData';

// Dynamically import components with SSR disabled to avoid hydration issues
const CourseDetailClient = dynamic(() => import('./CourseDetailClient'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});

const OldLearningRoadmap = dynamic(() => import('@/components/OldLearningRoadmap'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});

const ExtendedLearningRoadmap = dynamic(() => import('@/components/ExtendedLearningRoadmap'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});

const OldCourseSchedule = dynamic(() => import('@/components/OldCourseSchedule'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});

const RegistrationSteps = dynamic(() => import('@/components/RegistrationSteps'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});

const FAQSection = dynamic(() => import('@/components/FAQSection'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-96 rounded-xl" />
  )
});

const ReviewCallToAction = dynamic(() => import('@/components/ReviewCallToAction'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-[#fedac2]/20 h-48 rounded-xl" />
  )
});

interface CourseContentProps {
  course: Course;
}

export default function CourseContent({ course }: CourseContentProps) {
  return (
    <>
      {/* Course Detail Hero and Overview */}
      <CourseDetailClient course={course} />

      {/* Old Learning Roadmap */}
      <div className="bg-gradient-to-b from-white to-[#fedac2]/10">
        <OldLearningRoadmap />
      </div>

      {/* Hot News Section */}
      <div className="bg-[#fedac2]/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[21/9]  overflow-hidden">
              <Image
                src="/images/HOT NEWS.png"
                alt="Hot News"
                fill
                className="object-contain"
              />
            </div>
           
          </motion.div>
        </div>
      </div>

      {/* Extended Learning Roadmap */}
      <div className="bg-white">
        <ExtendedLearningRoadmap />
      </div>

      {/* Course Schedule */}
      <div className="bg-gradient-to-b from-[#fedac2]/10 to-white">
        <OldCourseSchedule />
      </div>

      {/* Registration Steps */}
      <div className="bg-white">
        <RegistrationSteps />
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-[#fedac2]/10 to-white">
        <FAQSection />
      </div>

      {/* Call to Action */}
      <ReviewCallToAction />
    </>
  );
}
