import type { ICtaBannerProps } from "@/interfaces";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

// شريط الدعوة للتواصل (بيظهر في آخر Home وAbout)
export function CtaBanner({ title, text, buttonText, buttonTo }: ICtaBannerProps) {
  return (
    <section>
      <Container className="pb-14">
        <Reveal className="bg-teal-dark text-white rounded-2xl px-[26px] py-[34px] grid gap-[18px] items-center min-[800px]:grid-cols-[1fr_auto] min-[800px]:p-10">
          <div>
            <h2 className="text-white text-[length:clamp(24px,4vw,34px)]">{title}</h2>
            <p className="text-[#CFE0DC] mt-1.5">{text}</p>
          </div>
          <Button to={buttonTo}>{buttonText}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
