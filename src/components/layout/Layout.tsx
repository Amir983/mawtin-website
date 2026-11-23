import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// القالب المشترك لكل الصفحات: Header + محتوى الصفحة + Footer
export function Layout() {
  const location = useLocation();

  // كل ما نفتح صفحة نرجع لأول الصفحة
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <>
      <Header />
      {/* key بيخلّي الصفحة تتبني من جديد (وتتحرك حركة الدخول) مع كل تنقّل، حتى لو لنفس الرابط */}
      <main key={location.key} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
