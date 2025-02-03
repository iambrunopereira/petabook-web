import SearchBar from "@marketing/home/components/Search";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full pt-20 pb-6 relative  ">
      {/* Hero Image with Blur Gradient */}
      <div className="relative mt-3 aspect-[16/9] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/assets/hero-pet.jpg"
          alt="hero pet"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
          priority
        />

        {/* Soft Blur Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* SearchBar Component (Client-Side) */}
        <SearchBar />
      </div>
    </div>
  );
}