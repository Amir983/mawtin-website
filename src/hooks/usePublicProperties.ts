import { useEffect, useState } from "react";
import type { IProperty } from "@/interfaces";
import { getPublicProperties } from "@/api/properties";

// TODO: استبدل الدالة دي باستدعاء دالة الـ API بتاعتك (من فولدر src/api).
// المطلوب: ترجّع كل العقارات مع اسم النوع (join مع PropertyTypes) في شكل IProperty[].
// لحد ما تتبدل بترجّع قائمة فاضية.

// بيجيب العقارات ويرجّع المتاح منها بس (status === "available")
export function usePublicProperties() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    getPublicProperties()
      .then((data) => {
        if (!isCancelled) setProperties(data);
      })
      .catch(() => {
        if (!isCancelled)
          setError("We could not load the properties. Please try again.");
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    // لو الصفحة اتقفلت قبل ما الطلب يخلص منحدّثش الـ state
    return () => {
      isCancelled = true;
    };
  }, []);

  // الموقع العام بيعرض المتاح بس، reserved وsold مبيظهروش أبداً
  const availableProperties = properties.filter(
    (property) => property.status === "available",
  );

  return { properties: availableProperties, loading, error };
}
