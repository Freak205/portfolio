import Hero from "@/components/sections/Hero";
import Band from "@/components/sections/Band";
import Services from "@/components/sections/Services";
import Arsenal from "@/components/sections/Arsenal";
import Work from "@/components/sections/Work";
import Lab from "@/components/sections/Lab";
import Awards from "@/components/sections/Awards";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Everything below the hero sits on the base surface, which lifts the
          sticky hero out from under it as you scroll past. */}
      <div className="relative z-10 bg-void">
        <Band />
        <Services />
        <Arsenal />
        <Work />
        <Lab />
        <Awards />
        <About />
        <Experience />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
}
