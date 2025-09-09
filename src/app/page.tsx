import FeatureCarousel from "@/components/home/FeatureCarousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center gap-8 p-6">
      {/* Client Carousel */}
      <FeatureCarousel />
    </div>
  );
}
