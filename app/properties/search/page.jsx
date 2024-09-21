"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/property-card";
import Spinner from "@/components/spinner";
import PropertySearchForm from "@/components/property-search-form";

export const dynamic = "force-dynamic";

export default function SearchResultsPage() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  if (isLoading) return <Spinner loading={isLoading} />;

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <Link
            href="/properties"
            className="mb-3 flex items-center text-blue-500 hover:underline"
          >
            <FaArrowAltCircleLeft className="mb-1 mr-2" /> Back to properties
          </Link>
          <h1 className="mb-4 text-2xl">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {properties.map((e) => (
                <PropertyCard key={e._id} property={e} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
