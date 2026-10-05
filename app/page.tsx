import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Navbar } from "@/components/navbar";
import { Technologies } from "@/components/technologies";
import { TrafficTracker } from "@/components/traffic-tracker";

export default function Home() {
  return (
    <>
      <TrafficTracker />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Technologies />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
