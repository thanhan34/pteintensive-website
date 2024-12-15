"use client";

import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { reviewData } from '../../lib/reviewData';

const ReviewSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          ĐÁNH GIÁ TỪ <span className="text-[#FF4D00]">HỌC VIÊN</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewData.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.course}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 line-clamp-3">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
