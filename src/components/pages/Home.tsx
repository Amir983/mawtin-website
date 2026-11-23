import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { Hero } from "@/components/shared/Hero";
import { HeroSign } from "@/components/shared/HeroSign";
import { PropertyGrid } from "@/components/shared/PropertyGrid";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { usePublicProperties } from "@/hooks/usePublicProperties";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=70";

// الصفحة الرئيسية: Hero + آخر 6 عقارات + دعوة للتواصل
export function Home() {
  const { properties, loading, error } = usePublicProperties();

  // الأحدث أولاً (حسب created_at) وناخد 6 بس
  const latest = [...properties]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 6);

  return (
    <>
      <Hero
        imageUrl={HERO_IMAGE}
        title={
          <>
            Find a home that <em>feels like yours</em>
          </>
        }
        text="Apartments, villas, shops and land across Greater Cairo and the North Coast, with a team that walks you through every viewing."
        actions={
          <>
            <Button to="/properties">Browse properties</Button>
            <Button to="/contact" variant="ghost">
              Talk to us
            </Button>
          </>
        }
        aside={<HeroSign />}
      />

      <section className="py-[52px]">
        <Container>
          <SectionHeader
            title="Latest properties"
            text="Freshly listed and ready to view."
            linkText="See all properties"
            linkTo="/properties"
          />
          <PropertyGrid properties={latest} loading={loading} error={error} emptyText="No properties yet." />
        </Container>
      </section>

      <CtaBanner
        title="Not sure which one fits?"
        text="Tell us what you are looking for and an advisor will call you back."
        buttonText="Contact us"
        buttonTo="/contact"
      />
    </>
  );
}
