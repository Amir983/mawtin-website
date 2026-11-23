import { useState } from "react";
import type { FormEvent } from "react";
import type { IBookingFormProps, IFormTexts } from "@/interfaces";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SuccessPanel } from "@/components/shared/SuccessPanel";
import { formatDateTime, getNowForInput } from "@/lib/formatters";
import { validateEmail, validateFutureDate, validatePhone, validateRequired } from "@/validation";

const emptyTexts: IFormTexts = { name: "", phone: "", email: "", when: "", note: "" };

// كارت حجز معاينة (بيتثبت جنب التفاصيل على الشاشات الكبيرة)
// الفورم مش بيعرف حاجة عن Supabase: بينادي onSubmit اللي جاية من الصفحة
export function BookingForm({ propertyTitle, onSubmit }: IBookingFormProps) {
  const [values, setValues] = useState<IFormTexts>(emptyTexts);
  const [errors, setErrors] = useState<IFormTexts>(emptyTexts);
  const [isSending, setIsSending] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isDone, setIsDone] = useState(false);

  function setValue(field: keyof IFormTexts, value: string) {
    setValues({ ...values, [field]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // نتحقق من كل الحقول
    const newErrors: IFormTexts = {
      name: validateRequired(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      when: validateFutureDate(values.when),
      note: "",
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.phone || newErrors.email || newErrors.when) {
      return;
    }

    setIsSending(true);
    setHasFailed(false);
    try {
      await onSubmit({
        full_name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        scheduled_at: values.when,
        notes: values.note.trim() || null,
      });
      setIsDone(true);
    } catch {
      // لو فشل الإرسال نعرض رسالة الخطأ وبياناته تفضل زي ما هي
      setHasFailed(true);
      setIsSending(false);
    }
  }

  const cardClasses = "bg-white border border-line rounded-xl p-[22px] min-[960px]:sticky min-[960px]:top-[84px]";

  if (isDone) {
    return (
      <aside className={cardClasses}>
        <SuccessPanel
          title="Request received"
          text="Thank you. We will call you to confirm the time."
          rows={[
            { label: "Property", value: propertyTitle },
            { label: "Preferred time", value: formatDateTime(values.when) },
            { label: "Name", value: values.name.trim() },
          ]}
        />
      </aside>
    );
  }

  return (
    <aside className={cardClasses}>
      <h2 className="text-[24px] mb-1">Book a viewing</h2>
      <p className="text-mut mb-4 text-[14px]">Pick the time that suits you. We will call to confirm.</p>

      <form noValidate onSubmit={handleSubmit}>
        <Field label="Full name" error={errors.name}>
          <Input name="name" autoComplete="name" value={values.name} onChange={(v) => setValue("name", v)} error={!!errors.name} />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <Input name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(v) => setValue("phone", v)} error={!!errors.phone} />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <Input name="email" type="email" autoComplete="email" value={values.email} onChange={(v) => setValue("email", v)} error={!!errors.email} />
        </Field>
        <Field label="Preferred date and time" error={errors.when}>
          <Input name="when" type="datetime-local" min={getNowForInput()} value={values.when} onChange={(v) => setValue("when", v)} error={!!errors.when} />
        </Field>
        <Field label="Note (optional)" error={errors.note}>
          <Textarea name="note" placeholder="Anything we should know?" value={values.note} onChange={(v) => setValue("note", v)} />
        </Field>

        {hasFailed && (
          <div className="bg-[#FBECEA] text-error rounded-[10px] px-3 py-[10px] text-[14px]">
            We could not send your request. Check your connection and try again. Your details are still here.
          </div>
        )}

        <Button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Request viewing"}
        </Button>
      </form>
    </aside>
  );
}
