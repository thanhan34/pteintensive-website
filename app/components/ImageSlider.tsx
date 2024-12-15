"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png"
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="tw-relative tw-w-full tw-h-screen">
      {/* Images */}
      <div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`tw-absolute tw-w-full tw-h-full tw-transition-opacity tw-duration-500 tw-ease-in-out ${
              index === currentIndex ? "tw-opacity-100" : "tw-opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      {/* <div className="tw-absolute tw-inset-0 tw-bg-black/30" /> */}

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="tw-absolute tw-left-4 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-bg-white/80 tw-p-4 tw-rounded-full hover:tw-bg-white tw-transition-colors tw-z-20"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="tw-absolute tw-right-4 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-bg-white/80 tw-p-4 tw-rounded-full hover:tw-bg-white tw-transition-colors tw-z-20"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="tw-absolute tw-bottom-4 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-flex tw-gap-2 tw-z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`tw-w-3 tw-h-3 tw-rounded-full tw-transition-all ${
              currentIndex === index 
                ? "tw-bg-white tw-scale-110" 
                : "tw-bg-white/50 hover:tw-bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
