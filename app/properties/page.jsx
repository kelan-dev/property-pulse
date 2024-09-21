import React from "react";
import PropertySearchForm from "@/components/property-search-form";
import Properties from "@/components/properties";

export default async function PropertiesPage() {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
}
