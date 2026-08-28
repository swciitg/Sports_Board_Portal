import Container from "./Container";

/**
 * Inline loading state: spinner + shimmer skeleton grid.
 * The redesign is explicit that loading must not block the page behind a modal.
 */
export default function Loader({ isOpen = true, message = "Loading..." }) {
  if (!isOpen) return null;

  return (
    <div className="w-full bg-white py-16">
      <Container>
        <div className="flex items-center gap-3 mb-7">
          <span className="w-5 h-5 rounded-full border-2 border-line border-t-accent animate-spin inline-block" />
          <span className="font-poppins text-[13px] font-medium text-muted">{message}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((k) => (
            <div key={k} className="flex flex-col gap-3">
              <div
                className="aspect-[4/3] animate-shimmer"
                style={{
                  background: "linear-gradient(90deg,#EFEFEF 0px,#F7F7F7 120px,#EFEFEF 240px)",
                  backgroundSize: "420px 100%",
                }}
              />
              <div className="h-3.5 w-[70%] bg-[#EFEFEF]" />
              <div className="h-2.5 w-[45%] bg-[#F2F2F2]" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
