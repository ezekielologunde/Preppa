import type { Metadata } from "next";
import { HelpShell } from "@/components/HelpShell";

export const metadata: Metadata = {
  title: {
    default: "Preppa Help Center",
    template: "%s",
  },
  description: "Guides for using Preppa, plus our Terms, Privacy Policy, and Cook Agreement.",
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <HelpShell>{children}</HelpShell>;
}
