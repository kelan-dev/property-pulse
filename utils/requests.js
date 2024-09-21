const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const dynamic = "force-dynamic";

export async function fetchProperties({ showFeatured = false } = {}) {
  if (!apiDomain) return [];

  try {
    const res = await fetch(
      apiDomain + `/properties${showFeatured ? "/featured" : ""}`,
      // { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProperty(id) {
  if (!apiDomain) return null;

  try {
    const res = await fetch(apiDomain + "/properties/" + id);

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
