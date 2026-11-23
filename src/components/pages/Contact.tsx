import type { IContactFormValues, IconName } from "@/interfaces";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHeading } from "@/components/shared/PageHeading";
import { COMPANY } from "@/lib/company";
import { sendContactMessage } from "@/api/Interactions";

// بيانات كارت "Visit or call"
const infoRows: { icon: IconName; label: string; value: string }[] = [
  { icon: "pin", label: "Office", value: COMPANY.address },
  { icon: "phone", label: "Phone", value: COMPANY.phone },
  { icon: "mail", label: "Email", value: COMPANY.email },
  { icon: "clock", label: "Working hours", value: COMPANY.hours },
];

// صفحة التواصل: فورم رسالة + بيانات الشركة
export function Contact() {
  async function handleMessage(values: IContactFormValues) {
    await sendContactMessage(values);
  }

  return (
    <Container>
      <PageHeading
        title="Contact us"
        text="Questions about a property or a viewing? Send us a message."
      />

      <div className="grid gap-[22px] pb-14 min-[900px]:grid-cols-[1.2fr_1fr] min-[900px]:items-start">
        <ContactForm onSubmit={handleMessage} />

        <div className="bg-white border border-line rounded-xl p-[22px] grid gap-4">
          <h2 className="text-[24px] mb-1">Visit or call</h2>
          {infoRows.map((row) => (
            <div key={row.label} className="flex gap-3">
              <Icon
                name={row.icon}
                className="w-5 h-5 text-copper flex-none mt-[3px]"
              />
              <p>
                <b className="block font-semibold">{row.label}</b>
                <span className="text-mut">{row.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
