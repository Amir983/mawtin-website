import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

// الـ App بس بيشغّل الـ router
export default function App() {
  return <RouterProvider router={router} />;
}
