import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeatureSection from "@/components/FeatureSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import NitroSection from "@/components/NitroSection";
import DiscoverSection from "@/components/DiscoverSection";
import SafetySection from "@/components/SafetySection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <StatsSection />
      <FeatureSection />
      <FeaturesGrid />
      <NitroSection />
      <DiscoverSection />
      <SafetySection />
      <DownloadSection />
      <Footer />
    </div>
  );
};

export default Index;
