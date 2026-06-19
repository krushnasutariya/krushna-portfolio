import ksLogo from "../assets/ks-logo-transparent.png";

function BrandLogo({ size = "md", showText = false }) {
  const sizeClasses = {
    xs: "h-8 w-8",
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden rounded-2xl border border-orange-400/30 bg-[#151515] p-1.5 shadow-[0_0_24px_rgba(249,115,22,0.16)]`}
      >
        <img
          src={ksLogo}
          alt="Krushna Sutariya logo"
          className="h-full w-full object-contain"
        />
      </div>

      {showText && (
        <div>
          <p className="text-sm font-extrabold tracking-tight text-white">
            Krushna Sutariya
          </p>
          <p className="text-xs font-semibold text-cyan-300">
            Software Developer
          </p>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
