import About from "./components/about";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="pt-32 md:pt-96">
          <About />
        </div>
      </div>
    </>
  );
}
