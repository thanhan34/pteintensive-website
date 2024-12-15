import { Metadata } from 'next';
import CompanyIntro from '@/components/CompanyIntro';
import FounderMessage from '@/components/FounderMessage';
import CoFounderMessage from '@/components/CoFounderMessage';
import MissionValues from '@/components/MissionValues';
import TeachingMethodology from '@/components/TeachingMethodology';
import TeamInformation from '@/components/TeamInformation';
import ReviewCallToAction from '@/components/ReviewCallToAction';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi | PTE LIFE',
  description: 'Tìm hiểu về PTE Intensive - Nơi đồng hành cùng bạn trên hành trình chinh phục PTE Academic.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Company Introduction */}
      <CompanyIntro />

      {/* Founder Message */}
      <FounderMessage />

      {/* Co-Founder Message */}
      <CoFounderMessage />

      {/* Mission and Values */}
      <MissionValues />

      {/* Teaching Methodology */}
      <TeachingMethodology />

      {/* Team Information */}
      <TeamInformation />

      {/* Call to Action */}
      <ReviewCallToAction />
    </main>
  );
}
