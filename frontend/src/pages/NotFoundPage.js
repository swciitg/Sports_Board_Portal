import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import Container from "../components/Container";

function NotFoundPage() {
  return (
    <div className="w-full bg-white py-16 md:py-24">
      <Container>
        <div className="border border-line bg-surface px-6 md:px-10 py-16 md:py-[72px] flex flex-col items-center text-center gap-[18px]">
          <span className="font-display font-bold text-[96px] md:text-[132px] leading-[0.8] text-accent">
            404
          </span>
          <span className="font-display font-bold text-[32px] md:text-[40px] uppercase text-ink">
            Out of bounds
          </span>
          <p className="max-w-[44ch] m-0 text-base leading-[1.7] text-muted">
            We couldn't find that page. Check the URL, or head back to the sports board home page.
          </p>
          <Link
            to="/"
            className="mt-2.5 font-poppins text-sm font-semibold px-7 py-[15px] bg-ink text-white inline-flex items-center gap-2.5 transition-colors hover:bg-accent-deep"
          >
            Back to home <LuArrowRight />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
