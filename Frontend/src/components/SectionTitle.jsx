function SectionTitle({ title }) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-[40px]">
        {title}
      </h2>
      <div className="mt-4 h-1 w-20 rounded-full bg-cyan-300" />
    </div>
  );
}

export default SectionTitle;
