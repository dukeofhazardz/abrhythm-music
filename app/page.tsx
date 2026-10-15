import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Audiences } from "@/components/sections/Audiences";
import { Commitment } from "@/components/sections/Commitment";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Kids } from "@/components/sections/Kids";
import { OtherServices } from "@/components/sections/OtherServices";
import { Training } from "@/components/sections/Training";

export default function Home() {
  return (
    <main id="main" className="bg-paper text-ink">
      <Hero />
      <About />
      <Training />
      <Kids />
      <Approach />
      <OtherServices />
      <Audiences />
      <Commitment />
      <Contact />
    </main>
  );
}
