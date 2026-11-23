// اللافتة المعلّقة في الـ Home: بتتأرجح وعليها الأيقونة والاسم وشريط "Now selling"
export function HeroSign() {
  return (
    <div
      role="img"
      aria-label="Mawtin Estates"
      className={
        "justify-self-center relative w-[min(100%,340px)] bg-[#FBF8F2] border-[3px] border-copper rounded-md " +
        "pt-[26px] px-[22px] pb-[22px] text-center shadow-[0_24px_50px_rgba(0,0,0,.35)] " +
        "[transform:rotate(-3deg)] [transform-origin:50%_0] " +
        "[animation:signIn_1s_.35s_both_cubic-bezier(.2,.8,.2,1),sway_6s_1.35s_ease-in-out_infinite_alternate]"
      }
    >
      {/* الإطار الداخلي الرفيع */}
      <div className="absolute inset-[7px] border border-[#E8D5BC] rounded-[3px] pointer-events-none" />

      {/* شريط Now selling */}
      <span className="[font-family:'Plus_Jakarta_Sans',sans-serif] absolute top-[14px] -right-[14px] bg-copper text-white font-bold text-[11px] leading-none tracking-[.08em] uppercase px-3 py-[7px] [transform:rotate(6deg)] shadow-[0_6px_14px_rgba(0,0,0,.25)]">
        Now selling
      </span>

      <svg viewBox="0 0 1024 1024" className="block w-[54px] h-[54px] mx-auto mb-2" aria-hidden="true">
        <rect x="12" y="12" width="1000" height="1000" rx="156" fill="#C8793B" />
        <rect x="36" y="36" width="952" height="952" rx="132" fill="#0B4F4A" />
        <polygon points="512,155 833,409 798,454 512,229 226,454 190,409" fill="#C8793B" />
        <polygon points="246,495 512,684 778,495 778,848 694,848 694,656 512,786 329,656 329,848 246,848" fill="#fff" />
      </svg>

      <span className="block font-display font-normal italic text-[length:clamp(46px,9vw,60px)] leading-none text-teal [transform:skewX(-7deg)]">
        Mawtin
      </span>
      <span className="[font-family:'Plus_Jakarta_Sans',sans-serif] block font-semibold text-[12px] leading-none tracking-[.5em] indent-[.5em] text-copper-dark mt-[10px] mb-[14px]">
        ESTATES
      </span>
      <span className="block text-[13px] text-mut border-t border-[#E8D5BC] pt-3">
        Homes &middot; Villas &middot; Shops &middot; Land
      </span>
    </div>
  );
}
