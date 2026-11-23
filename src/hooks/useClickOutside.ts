import { useEffect } from "react";
import type { RefObject } from "react";

// بينفّذ الدالة لما المستخدم يضغط بره العنصر (بنستخدمه في الـ Select وSearch)
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
) {
  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside();
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref, onOutside]);
}
