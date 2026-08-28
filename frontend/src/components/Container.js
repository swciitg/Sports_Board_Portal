/**
 * The redesign's single layout rail: 1240px wide, 40px gutters (24px on small screens).
 */
export default function Container({ className = "", children }) {
  return (
    <div className={`w-full max-w-container mx-auto px-6 md:px-10 box-border ${className}`}>
      {children}
    </div>
  );
}
