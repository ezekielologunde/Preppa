import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MenuBoard } from "@/components/MenuBoard";
import { HowItWorks } from "@/components/HowItWorks";
import { WaitlistSection } from "@/components/WaitlistSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MenuBoard />
        <HowItWorks />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
