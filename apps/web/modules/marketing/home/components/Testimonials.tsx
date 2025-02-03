"use client"
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah & Bella 🐶",
    review: "This was the best stay for my dog! The hotel was super friendly and clean.",
    location: "Lisbon",
  },
  {
    name: "John & Max 🐕",
    review: "Max loved the backyard and play area. Highly recommended!",
    location: "Porto",
  },
  {
    name: "Emily & Charlie 🐾",
    review: "A wonderful experience! My cat was super comfortable and well cared for.",
    location: "Algarve",
  },
  {
    name: "Daniel & Coco 🐩",
    review: "Great service! The pet hotel had everything my dog needed.",
    location: "Madeira",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length); // Loop through testimonials
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Testimonials</h2>
      {/* Testimonial Wrapper with Transition */}
      <div className="relative h-40 overflow-hidden">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <p className="text-gray-700 italic">"{testimonial.review}"</p>
              <p className="text-sm font-semibold mt-4">{testimonial.name}</p>
              <p className="text-xs text-gray-500">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}