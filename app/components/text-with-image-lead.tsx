import React from "react";

import Image from "next/image";

type componentOptions = {
  imagesrc: string;
  imagealt: string;
  text?: string;
};

export default function textWithImageLead({
  imagesrc,
  imagealt,
  text,
}: componentOptions) {
  return (
    <div className="w-full">
      <h2 className="ade-text">
        <Image
          src={imagesrc}
          alt={imagealt}
          width={640}
          height={960}
          className="mr-2 inline-block w-1/2 md:w-1/4 align-baseline"
        />
        {text ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
      </h2>
    </div>
  );
}
