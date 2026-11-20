import Banner from "@/components/HomePage/Banner";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <Banner />
      {/* How It Works Section */}
      <section id="how-it-works" className="scroll-mt-16">
        how it works
      </section>

      {/* About Us Section */}
      <section id="about-us" className="scroll-mt-16">
        about us
      </section>
    </main>
  );
}