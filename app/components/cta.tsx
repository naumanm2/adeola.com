import Link from "next/link";
import React from "react";

export default function CTA({
  link,
  text,
  external,
}: {
  link: string;
  text: string;
  external?: boolean;
}) {
  return (
    <>
      <Link href={"/"}>
        <div className="bg-button flex flex-row gap-2 rounded-full border-[.4px] border-white/40 bg-black p-1.5 pr-3.5">
          <div className="flex items-center justify-center rounded-full bg-white p-2 pl-[9px]">
            <svg
              width="8"
              height="9"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 4.5L0 9L0 -3.49691e-07L8 4.5Z" fill="#161616" />
            </svg>
          </div>
          <div className="pb-0.25">{text}</div>
        </div>
      </Link>
    </>
  );
}
