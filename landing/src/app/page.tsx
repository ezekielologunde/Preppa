import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { CuisineTicker } from "@/components/CuisineTicker";
import { Stats } from "@/components/Stats";
import { MenuBoard } from "@/components/MenuBoard";
import { HowItWorks } from "@/components/HowItWorks";
import { BecomeAPreppa } from "@/components/BecomeAPreppa";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CuisineTicker />
        <Stats />
        <MenuBoard />
        <HowItWorks />
        <BecomeAPreppa />
      </main>
      <FinalCTA />
    </>
  );
}
