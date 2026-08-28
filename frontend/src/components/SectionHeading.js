/**
 * The redesign's repeated section header: a short teal rule + Poppins eyebrow,
 * then an uppercase display heading closed with a teal full stop.
 */
export default function SectionHeading({
  eyebrow,
  title,
  light = false,
  className = "",
  size = "text-[clamp(48px,5.2vw,80px)]",
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3.5">
          <span className="block w-7 h-0.5 bg-accent" />
          <span
            className={`font-poppins text-[11px] font-semibold tracking-[0.22em] uppercase ${
              light ? "text-accent-pale" : "text-accent-deep"
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-display font-bold ${size} leading-[0.92] tracking-tight m-0 uppercase ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
        <span className="text-accent">.</span>
      </h2>
    </div>
  );
}
