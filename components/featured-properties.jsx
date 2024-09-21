import React from "react";
import { fetchProperties } from "@/utils/requests";
import FeaturedPropertyCard from "./featured-property-card";

export default async function FeaturedProperties() {
  const properties = await fetchProperties({ showFeatured: true });

  if (properties.length === 0) return null;

  return (
    <section className="bg-blue-50 px-4 pb-10 pt-6">
      <div className="container-xl m-auto lg:container">
        <h2 className="mb-6 text-center text-3xl font-bold text-blue-500">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
