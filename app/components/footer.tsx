import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white text-center py-6 relative">
      <div className="flex flex-col md:flex-row justify-center items-center uppercase pb-4 border-b">
        <Link href="#" className="hover:underline">
          SoundCloud
        </Link>
        <Link href="#" className="hover:underline">
          Instagram
        </Link>
        <Link href="#" className="hover:underline">
          Facebook
        </Link>
      </div>
      <h1 className="w-full !text-[200px] font-bold mt-4 overflow-auto">
        ADEOLA
      </h1>
      <p className="text-xs opacity-75 mt-2">cc. Adeola Ikuesan 2025</p>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full text-center opacity-20">
        <h1 className="!text-[200px] font-bold overflow-auto scale-y-[-1]">
          ADEOLA
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
