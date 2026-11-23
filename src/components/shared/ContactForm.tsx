import { useState } from "react";
import type { FormEvent } from "react";
import type { IContactFormProps, IFormTexts } from "@/interfaces";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SuccessPanel } from "@/components/shared/SuccessPanel";
import { validateEmail, validatePhone, validateRequired } from "@/validation";

const emptyTexts: IFormTexts = { name: "", phone: "", email: "", when: "", note: "" };

// فورم التواصل (هنا حقل note هو نص الرسالة)
export function ContactForm({ onSubmit }: IContactFormProps) {
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

    const newErrors: IFormTexts = {
      name: validateRequired(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      when: "",
      note: validateRequired(values.note),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.phone || newErrors.email || newErrors.note) {
      return;
    }

    setIsSending(true);
    setHasFailed(false);
    try {
      await onSubmit({
        full_name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        notes: values.note.trim(),
      });
      setIsDone(true);
    } catch {
      setHasFailed(true);
      setIsSending(false);
    }
  }

  const boxClasses = "bg-white border border-line rounded-xl p-[22px]";

  if (isDone) {
    return (
      <div className={boxClasses}>
        <SuccessPanel title="Message sent" text="Thank you. We will get back to you within one working day." />
      </div>
    );
  }

  return (
    <div className={boxClasses}>
      <h2 className="text-[24px] mb-1">Send a message</h2>
      <p className="text-mut mb-4 text-[14px]">We usually reply within one working day.</p>

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
        <Field label="Message" error={errors.note}>
          <Textarea name="message" value={values.note} onChange={(v) => setValue("note", v)} error={!!errors.note} />
        </Field>

        {hasFailed && (
          <div className="bg-[#FBECEA] text-error rounded-[10px] px-3 py-[10px] text-[14px]">
            We could not send your message. Check your connection and try again. Your details are still here.
          </div>
        )}

        <Button type="submit" variant="teal" disabled={isSending}>
          {isSending ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  );
}
