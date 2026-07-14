import { Hero } from "@/components/Hero";
import { AboutBand } from "@/components/AboutBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <AboutBand />
      </main>
      <Footer />
    </>
  );
}
