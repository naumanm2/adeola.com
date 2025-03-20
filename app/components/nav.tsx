import CTA from "./cta";

export default function Nav() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="font-bold text-white">ADEOLA</div>
        <CTA link={"adeola"} text={"Contact"} />
      </div>
    </>
  );
}
