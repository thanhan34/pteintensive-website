import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import CourseSection from './components/CourseSection';
import CourseSchedule from './components/CourseSchedule';
import ReviewSection from './components/ReviewSection';
import TeacherSection from './components/TeacherSection';
import ReviewCallToAction from './components/ReviewCallToAction';
import CommonQuestions from './components/CommonQuestions';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Course Section */}
      <CourseSection />

      {/* Course Schedule */}
      <CourseSchedule />

      {/* Review Section */}
      <ReviewSection />

      {/* Teacher Section */}
      <TeacherSection />

      {/* Common Questions */}
      <CommonQuestions />

      {/* Call to Action */}
      <ReviewCallToAction />
    </main>
  );
}
