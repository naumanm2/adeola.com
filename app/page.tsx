import ade1 from "@/public/ade1.png";
import Spacer from "./components/spacer";
import TextWithImageLead from "./components/text-with-image-lead";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <div className="pt-32 md:pt-96">
          <div className="flex flex-row gap-2 text-secondary uppercase">
            <small>Singer</small>
            <small>•</small>
            <small>Songwriter</small>
          </div>
          <div className="">
            <h1>ADEOLA</h1>
            <div className="ade-shadow -scale-x-100 rotate-180">
              <h1>ADEOLA</h1>
            </div>
          </div>
          <Spacer />
          <TextWithImageLead imagesrc={ade1.src} imagealt="placeholder" />
          <Spacer />
        </div>
      </div>
    </>
  );
}
