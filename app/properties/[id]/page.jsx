"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/property-header-image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/property-details";
import Spinner from "@/components/spinner";
import PropertyImages from "@/components/property-images";
import BookmarkButton from "@/components/bookmark-button";
import ShareButtons from "@/components/share-buttons";
import PropertyContactForm from "@/components/property-contact-form";

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log("Error fetching property:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (property === null) fetchPropertyData();
  }, [id, property]);

  if (!property && !isLoading)
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    );

  return (
    <>
      {isLoading && <Spinner loading={isLoading} />}
      {!isLoading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto px-6 py-6">
              <Link
                href="/properties"
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto px-6 py-10">
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />

                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
}
