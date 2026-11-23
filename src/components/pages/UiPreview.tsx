import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { IconName } from "@/interfaces";

// ⚠️ صفحة مؤقتة في المرحلة 1 بس عشان نشوف الـ ui components. هتتشال في المرحلة 3.
const typeOptions = [
  { value: "", label: "All types" },
  { value: "Apartment", label: "Apartment" },
  { value: "Villa", label: "Villa" },
  { value: "Shop", label: "Shop" },
  { value: "Land", label: "Land" },
];

const iconNames: IconName[] = [
  "pin", "bed", "area", "phone", "mail", "clock", "search", "chevron",
  "check", "facebook", "instagram", "linkedin", "whatsapp",
];

export function UiPreview() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("");
  const [beds, setBeds] = useState(0);

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-10 grid gap-8">
      <h1 className="text-[36px]">UI components preview</h1>

      <div className="flex flex-wrap gap-3 bg-teal-dark p-5 rounded-xl">
        <Button>Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="teal">Teal</Button>
        <Button disabled>Sending...</Button>
      </div>

      <div className="grid gap-3.5 max-w-[420px]">
        <Field label="Full name" error="">
          <Input value={name} onChange={setName} />
        </Field>
        <Field label="Phone" error="Enter a valid phone number">
          <Input value="" onChange={() => {}} error />
        </Field>
        <Field label="Note (optional)" error="">
          <Textarea value={note} onChange={setNote} placeholder="Anything we should know?" />
        </Field>
        <Field label="Type" as="div">
          <Select options={typeOptions} value={type} onChange={setType} />
        </Field>
        <Field label="Bedrooms" as="div">
          <Counter value={beds} onChange={setBeds} />
        </Field>
      </div>

      <div className="flex gap-3 items-center">
        <Badge>Apartment</Badge>
        <Badge variant="success">Available</Badge>
      </div>

      <div className="flex flex-wrap gap-4 text-teal">
        {iconNames.map((iconName) => (
          <Icon key={iconName} name={iconName} className="w-6 h-6" />
        ))}
      </div>
    </div>
  );
}
