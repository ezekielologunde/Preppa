import { Reveal } from "./Reveal";

export function DownloadCTA() {
  return (
    <section id="download" className="py-24 md:py-32 bg-ink text-white">
      <Reveal className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-5">
          Order anywhere, <span className="font-light text-white/60">track every plate live</span>
        </h2>
        <p className="text-lg text-white/70 max-w-lg mx-auto mb-10">
          Discover cooks near you, order in a tap, and follow your meal from the stove to your
          door. Preppa runs in your browser today — native apps are on the way.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://app.preppa.live"
            className="bg-orange text-white font-bold px-7 h-14 rounded-full flex items-center shadow-[0_10px_26px_rgba(242,107,29,.32)]"
          >
            Open the web app
          </a>
          <a
            href="#"
            className="border border-white/25 rounded-2xl px-5 h-14 flex items-center gap-2.5 text-sm"
          >
            <span className="text-left">
              <small className="block text-white/50 text-[10px]">Download on the</small>
              <b>App Store</b>
            </span>
          </a>
          <a
            href="#"
            className="border border-white/25 rounded-2xl px-5 h-14 flex items-center gap-2.5 text-sm"
          >
            <span className="text-left">
              <small className="block text-white/50 text-[10px]">Get it on</small>
              <b>Google Play</b>
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
