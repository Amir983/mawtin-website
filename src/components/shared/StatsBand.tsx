import type { IStatsBandProps } from "@/interfaces";
import { Container } from "@/components/shared/Container";
import { StatItem } from "@/components/shared/StatItem";

// شريط الإحصائيات الأخضر (في صفحة About)
export function StatsBand({ stats }: IStatsBandProps) {
  return (
    <section className="bg-teal py-10">
      <Container className="grid grid-cols-2 gap-6 text-center min-[800px]:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </Container>
    </section>
  );
}
