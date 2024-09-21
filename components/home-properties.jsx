import PropertyCard from "./property-card";
import Link from "next/link";
import { fetchProperties } from "@/utils/requests";

export default async function HomeProperties() {
  const data = await fetchProperties();

  const recentProperties = data.properties
    .sort((e) => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl m-auto lg:container">
          <h2 className="mb-6 text-center text-3xl font-bold text-blue-500">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentProperties === 0 ? (
              <p>No properties found</p>
            ) : (
              recentProperties.map((e) => (
                <PropertyCard key={e._id} property={e} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto my-10 max-w-lg px-6">
        <Link
          href="/properties"
          className="block rounded-xl bg-gray-900 px-6 py-4 text-center text-white hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}
