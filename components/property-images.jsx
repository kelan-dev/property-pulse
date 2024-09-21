import React from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function PropertyImages({ images }) {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  className="mx-auto h-[400px] w-auto cursor-pointer rounded-xl object-cover"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {images.map((image, index) => (
                <div
                  key={image}
                  className={`${images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        className="h-[400px] w-full cursor-pointer rounded-xl object-cover"
                        width={1800}
                        height={400}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}
