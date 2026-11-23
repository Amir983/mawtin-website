import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { Hero } from "@/components/shared/Hero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatsBand } from "@/components/shared/StatsBand";
import { ValueCard } from "@/components/shared/ValueCard";

// ---------- نصوص صفحة About (محتوى تجريبي) ----------
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=70";
const STORY_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70";

const stats = [
  { value: 12, suffix: "+", label: "Years in the market" },
  { value: 850, suffix: "+", label: "Properties sold" },
  { value: 4, suffix: "", label: "Property types" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

const values = [
  {
    number: "01",
    title: "Honest advice",
    text: "We tell you what a property is really worth, including the drawbacks, so you decide with a clear view.",
  },
  {
    number: "02",
    title: "Local knowledge",
    text: "Our advisors know each district, from the compounds of New Cairo to the beaches of the North Coast.",
  },
  {
    number: "03",
    title: "Personal service",
    text: "One advisor stays with you from the first call to the day you get your keys.",
  },
];

const steps = [
  { number: "1", title: "Browse", text: "Search and filter the properties that fit your budget and needs." },
  { number: "2", title: "Book a viewing", text: "Choose a time online and we will confirm it by phone." },
  { number: "3", title: "Move in", text: "We support you through the paperwork until the keys are yours." },
];

// صفحة About us
export function About() {
  // لو صورة القصة ماتحمّلتش بنخفيها (الخلفية الخضرا تفضل)
  const [hasStoryImageFailed, setHasStoryImageFailed] = useState(false);

  return (
    <>
      <Hero
        small
        imageUrl={HERO_IMAGE}
        title={
          <>
            About <em>Mawtin Estates</em>
          </>
        }
        text="A Cairo real estate team built around honest advice, local knowledge and viewings that respect your time."
      />

      <section className="py-[52px]">
        <Container className="grid gap-[30px] items-center min-[900px]:grid-cols-2 min-[900px]:gap-14">
          <Reveal>
            <h2 className="text-[length:clamp(26px,4vw,36px)]">Our story</h2>
            <p className="text-[#3a4a4b] mt-[14px] max-w-[56ch]">
              Mawtin started with a simple idea: buying or renting a home should feel clear and calm. We began as a
              small office in New Cairo and grew by helping one family at a time.
            </p>
            <p className="text-[#3a4a4b] mt-[14px] max-w-[56ch]">
              Today we list apartments, villas, shops and land, and every listing is checked by our team before it
              goes online.
            </p>
          </Reveal>
          <Reveal className="rounded-xl overflow-hidden bg-teal aspect-[4/3]">
            {!hasStoryImageFailed && (
              <img
                src={STORY_IMAGE}
                alt="Modern home exterior"
                loading="lazy"
                onError={() => setHasStoryImageFailed(true)}
                className="w-full h-full object-cover block"
              />
            )}
          </Reveal>
        </Container>
      </section>

      <StatsBand stats={stats} />

      <section className="py-[52px]">
        <Container>
          <SectionHeader title="What we stand for" />
          <div className="grid gap-5 grid-cols-1 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
            {values.map((item, index) => (
              <ValueCard key={item.number} number={item.number} title={item.title} text={item.text} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-[52px]">
        <Container>
          <SectionHeader title="How it works" />
          <div className="grid gap-5 grid-cols-1 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
            {steps.map((item, index) => (
              <ValueCard key={item.number} number={item.number} title={item.title} text={item.text} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Let us find your next home"
        text="Talk to an advisor or book a viewing online."
        buttonText="Contact us"
        buttonTo="/contact"
      />
    </>
  );
}
