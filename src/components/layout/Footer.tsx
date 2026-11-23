import { Link } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { COMPANY, FOOTER_DESCRIPTION, NAV_LINKS, PROPERTY_TYPE_LINKS, SOCIAL_LINKS } from "@/lib/company";

const linkClasses = "transition-colors duration-200 hover:text-white";
const headingClasses = '[font-family:"Plus_Jakarta_Sans",sans-serif] text-white font-semibold text-[15px] leading-none mb-4';

// الفوتر: وصف + روابط + أنواع العقارات + بيانات التواصل
export function Footer() {
  return (
    <footer className="bg-teal-dark text-[#CFE0DC] mt-5 pt-[52px] pb-[22px] text-[14px]">
      <Container>
        <div className="grid gap-8 grid-cols-1 min-[640px]:grid-cols-2 min-[960px]:grid-cols-[1.5fr_.8fr_.8fr_1.3fr]">
          <div>
            <Link to="/" aria-label="Mawtin Estates home" className="flex items-center gap-[10px]">
              <Logo variant="dark" className="h-[54px]" />
            </Link>
            <p className="max-w-[36ch] mt-[14px] mb-[18px]">{FOOTER_DESCRIPTION}</p>
            <div className="flex gap-[10px]">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={social.name}
                  className="w-[38px] h-[38px] rounded-full border border-white/25 grid place-items-center transition-[background-color,border-color,translate] duration-200 hover:bg-copper hover:border-copper hover:-translate-y-0.5"
                >
                  <Icon name={social.icon} className="w-[17px] h-[17px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={headingClasses}>Explore</h4>
            <ul className="list-none p-0 grid gap-[10px]">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingClasses}>Property types</h4>
            <ul className="list-none p-0 grid gap-[10px]">
              {PROPERTY_TYPE_LINKS.map((link) => (
                <li key={link.type}>
                  {/* بنبعت النوع في state، وصفحة Properties بتفتح بالفلتر ده */}
                  <Link to="/properties" state={{ type: link.type }} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingClasses}>Get in touch</h4>
            <ul className="list-none p-0 grid gap-[10px]">
              <li className="flex gap-[10px]">
                <Icon name="pin" className="w-[17px] h-[17px] text-copper flex-none mt-[3px]" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex gap-[10px]">
                <Icon name="phone" className="w-[17px] h-[17px] text-copper flex-none mt-[3px]" />
                <span>{COMPANY.phone}</span>
              </li>
              <li className="flex gap-[10px]">
                <Icon name="mail" className="w-[17px] h-[17px] text-copper flex-none mt-[3px]" />
                <span>{COMPANY.email}</span>
              </li>
              <li className="flex gap-[10px]">
                <Icon name="clock" className="w-[17px] h-[17px] text-copper flex-none mt-[3px]" />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-[10px] justify-between mt-9 pt-5 border-t border-white/14 text-[13px]">
          <span>{"\u00A9 " + new Date().getFullYear() + " Mawtin Estates. All rights reserved."}</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer hover:text-white"
          >
            Back to top
          </button>
        </div>
      </Container>
    </footer>
  );
}
