import Banner from "@/components/HomePage/Banner";
import HowItWorks from "@/components/HomePage/HowItWorks";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <Banner />
      <HowItWorks></HowItWorks>

      {/* About Us Section */}
      <section id="about-us" className="scroll-mt-16">
        about us
      </section>
    </main>
  );
}