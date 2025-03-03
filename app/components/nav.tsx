import CTA from "./cta";

export default function Nav() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="text-white">ADEOLA</div>
        <CTA link={"adeola"} text={"Contact"} />
      </div>
    </>
  );
}
