import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FoundingCohort } from "@/components/FoundingCohort";
import { WhyTrust } from "@/components/WhyTrust";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSafety } from "@/components/TrustSafety";
import { MealPlans } from "@/components/MealPlans";
import { FoodServices } from "@/components/FoodServices";
import { MeetPreppas } from "@/components/MeetPreppas";
import { Waitlist } from "@/components/Waitlist";
import { BecomePreppa } from "@/components/BecomePreppa";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FoundingCohort />
        <WhyTrust />
        <HowItWorks />
        <TrustSafety />
        <MealPlans />
        <FoodServices />
        <MeetPreppas />
        <Waitlist />
        <BecomePreppa />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
