import { LuCircleAlert } from "react-icons/lu";
import Container from "./Container";

/**
 * Error card. Prop signature is unchanged from the previous version so every
 * existing call site keeps working; `secondaryAction` is optional.
 */
function Errors({
  status_code = 404,
  title = "Page Not Found",
  message = "Something went wrong. Please try again in a moment.",
  onClick = () => window.history.back(),
  buttonText = "Go back to Home",
  secondaryAction = null,
}) {
  return (
    <div className="w-full bg-white py-16 md:py-24">
      <Container>
        <div className="border border-line">
          <div className="font-poppins text-[11px] font-semibold tracking-[0.16em] uppercase text-subtle px-5 py-3.5 border-b border-line">
            Error {status_code}
          </div>
          <div className="px-6 md:px-10 py-12 md:py-14 flex flex-col items-center text-center gap-4">
            <LuCircleAlert className="text-[44px] text-danger" />
            <span className="font-display font-bold text-[28px] md:text-[34px] uppercase text-ink">
              {title}
            </span>
            <p className="max-w-[46ch] m-0 text-[15px] leading-[1.7] text-muted">{message}</p>
            <div className="flex gap-2.5 mt-2 flex-wrap justify-center">
              <button
                onClick={onClick}
                className="font-poppins text-[13px] font-semibold px-6 py-[13px] bg-ink text-white transition-colors hover:bg-accent-deep"
              >
                {buttonText}
              </button>
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className="font-poppins text-[13px] font-semibold px-6 py-[13px] border border-[#D8D8D8] text-ink transition-colors hover:bg-surface"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Errors;
