import Image from "next/image";
import React from "react";

export default function PropertyHeaderImage({ image }) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="relative grid h-[400px] w-full grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover"
            fill={true}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
