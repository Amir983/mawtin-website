import type { IHeroProps } from "@/interfaces";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

// حركة دخول النص (كل سطر بيتأخر شوية عن اللي قبله)
const enterAnimation = "[animation:up_.8s_cubic-bezier(.2,.7,.2,1)_both]";

// الـ Hero: صورة خلفية بتتحرك ببطء + طبقة غامقة + نص (وممكن لافتة جنبه)
// small = نسخة أقصر بتتستخدم في صفحة About
export function Hero({ imageUrl, title, text, actions, aside, small }: IHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden isolate bg-teal-dark text-white flex items-center",
        small ? "min-h-[320px]" : "min-h-[560px]",
      )}
    >
      {/* صورة الخلفية بتكبر ببطء */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center [animation:kb_24s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: "url('" + imageUrl + "')" }}
      />
      {/* طبقة غامقة فوق الصورة */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,38,35,.93)_0%,rgba(6,38,35,.72)_50%,rgba(6,38,35,.3)_100%)]" />

      <Container
        className={cn(
          "w-full grid gap-7 items-center py-16 min-[900px]:py-24",
          small ? "min-[900px]:grid-cols-1" : "min-[900px]:grid-cols-[1.1fr_1fr]",
        )}
      >
        <div>
          <h1
            className={cn(
              "text-white text-[length:clamp(34px,7vw,60px)] max-w-[14ch] [&_em]:italic [&_em]:text-[#F0B27A]",
              enterAnimation,
            )}
          >
            {title}
          </h1>
          <p
            className={cn("text-[#CFE0DC] max-w-[46ch] mt-4 mb-[26px] text-[17px]", enterAnimation)}
            style={{ animationDelay: "120ms" }}
          >
            {text}
          </p>
          {actions && (
            <div className={cn("flex flex-wrap gap-3", enterAnimation)} style={{ animationDelay: "240ms" }}>
              {actions}
            </div>
          )}
        </div>
        {aside}
      </Container>
    </section>
  );
}
