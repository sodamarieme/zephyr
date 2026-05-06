import type { Metadata } from "next";
import { Portfolio } from "@/components/home/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Découvrez nos réalisations — sites web, applications mobiles et identités visuelles.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-28">
      <div className="container-custom text-center pt-12 pb-4">
        <span className="tag">Nos réalisations</span>
        <h1 className="section-title mt-3 mb-4">
          Ce que nous <span className="gradient-text">construisons</span>
        </h1>
        <p className="section-subtitle mx-auto">
          Chaque projet est une opportunité de redéfinir les standards.
        </p>
      </div>
      <Portfolio />
    </div>
  );
}
