import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/home/IntroAnimation";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroAnimation />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
