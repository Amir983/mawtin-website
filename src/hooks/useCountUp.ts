import { useEffect, useState } from "react";

// بيعدّ من 0 لحد target في 1.4 ثانية لما isActive تبقى true (حركة بتبطّأ في الآخر)
export function useCountUp(target: number, isActive: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let frameId = 0;
    let startTime = 0;

    function step(now: number) {
      if (startTime === 0) startTime = now;
      const progress = Math.min(1, (now - startTime) / 1400);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, isActive]);

  return value;
}
