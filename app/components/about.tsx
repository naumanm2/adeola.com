import CTA from "./cta";

const About = () => {
  return (
    <div className="text-white p-6 rounded-xl border w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">ABOUT</h2>
      <p className="text-sm font-bold bg-gradient-to-b from-white via-white/70 to-white/30 bg-clip-text text-transparent mb-4">
        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ut aliquip ex ea commodo consequat.
      </p>
      <CTA link="/" text="See full bio" />
    </div>
  );
};

export default About;
