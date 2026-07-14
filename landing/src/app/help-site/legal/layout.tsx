import Link from "next/link";
import { Icon } from "@/components/Icon";

/** Shared chrome for every legal/policy article — centered prose column + back link. */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft hover:text-orange transition-colors mb-8">
        <Icon name="chevRight" size={14} className="rotate-180" /> Help Center
      </Link>
      {children}
    </div>
  );
}
