import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { About } from "@/components/pages/About";
import { Contact } from "@/components/pages/Contact";
import { Home } from "@/components/pages/Home";
import { NotFound } from "@/components/pages/NotFound";
import { Properties } from "@/components/pages/Properties";
import { PropertyDetails } from "@/components/pages/PropertyDetails";

// كل الصفحات جوه الـ Layout (Header + Footer)
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
