import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import CourseSection from './components/CourseSection';
import CourseSchedule from './components/CourseSchedule';
import ReviewSection from './components/ReviewSection';
import TeacherSection from './components/TeacherSection';
import ReviewCallToAction from './components/ReviewCallToAction';
import CommonQuestions from './components/CommonQuestions';
import ScoreComparisonTable from './components/ScoreComparisonTable';
import GuaranteeSection from './components/GuaranteeSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Score Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <ScoreComparisonTable />
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeSection />

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
