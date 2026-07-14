import { Reveal } from "./Reveal";

export function DownloadCTA() {
  return (
    <section id="download" className="py-0 pb-24 md:pb-32">
      <Reveal className="max-w-[1200px] mx-auto px-6">
        <div className="bg-ink rounded-[36px] overflow-hidden grid md:grid-cols-2 min-h-[340px]">
          <div className="p-10 md:p-14 flex flex-col justify-center text-white max-w-lg">
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-white/60 mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-orange" />
              Get the app
            </span>
            <h2 className="text-3xl md:text-[42px] font-extrabold tracking-tight leading-tight mb-4">
              Order anywhere, <span className="font-light text-white/50">track every plate live</span>
            </h2>
            <p className="text-white/70 mb-8">
              Discover cooks near you, order in a tap, and follow your meal from the stove to
              your door. Preppa runs in your browser today — native apps are on the way.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://app.preppa.live"
                className="bg-orange text-white font-bold px-7 h-14 rounded-2xl flex items-center shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
              >
                Open the web app
              </a>
              <div
                aria-disabled="true"
                title="Coming soon"
                className="border border-white/15 rounded-2xl px-5 h-14 flex items-center gap-2.5 text-sm opacity-50 cursor-default select-none"
              >
                <span className="text-left">
                  <small className="block text-white/50 text-[10px]">Coming soon to the</small>
                  <b>App Store</b>
                </span>
              </div>
              <div
                aria-disabled="true"
                title="Coming soon"
                className="border border-white/15 rounded-2xl px-5 h-14 flex items-center gap-2.5 text-sm opacity-50 cursor-default select-none"
              >
                <span className="text-left">
                  <small className="block text-white/50 text-[10px]">Coming soon on</small>
                  <b>Google Play</b>
                </span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[260px] md:min-h-0">
            <div className="absolute right-[6%] top-[14%] bg-white rounded-2xl px-3.5 py-2.5 shadow-[0_10px_24px_rgba(23,21,15,.08),0_30px_70px_rgba(23,21,15,.12)] z-[3]">
              <small className="block text-[10px] text-ink-soft font-bold">Tonight&rsquo;s drop</small>
              <b className="text-[17px]">$11.50</b>
            </div>
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[190px] h-[190px] rounded-full border-[6px] border-white/10 shadow-[0_10px_24px_rgba(23,21,15,.08),0_30px_70px_rgba(23,21,15,.12)] bg-gradient-to-br from-orange-soft to-purple-soft" />
            <div className="absolute right-[42%] top-[16%] w-[100px] h-[100px] rounded-full border-[6px] border-white/10 shadow-[0_10px_24px_rgba(23,21,15,.08),0_30px_70px_rgba(23,21,15,.12)] bg-gradient-to-br from-green-soft to-orange-soft" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
