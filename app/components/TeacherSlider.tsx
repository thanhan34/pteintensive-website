"use client";

import { useState, useEffect } from "react";
import TeacherCard from "./TeacherCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Teacher } from "@/lib/teacherData";

interface TeacherSliderProps {
  teachers: Teacher[];
}

export default function TeacherSlider({ teachers }: TeacherSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, teachers.length - itemsPerPage);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prevIndex) => 
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [maxIndex, isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match transition duration
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match transition duration
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500); // Match transition duration
  };

  const visibleTeachers = teachers.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(0%)` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {visibleTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full hover:bg-gray-50 transition-colors z-20 shadow-lg group"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <FaChevronLeft className="h-6 w-6 text-red-500 group-hover:text-red-600 transition-colors" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full hover:bg-gray-50 transition-colors z-20 shadow-lg group"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <FaChevronRight className="h-6 w-6 text-red-500 group-hover:text-red-600 transition-colors" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-red-500 scale-110" 
                : "bg-red-200 hover:bg-red-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
