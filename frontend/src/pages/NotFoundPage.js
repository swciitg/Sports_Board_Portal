import { Errors, Container } from "../components";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
    const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 py-10 sm:px-5 md:px-10 lg:px-15 xl:px-22 space-y-6">
      <Errors 
      status_code={404}
      title='Page Not Found'
      onClick={() => navigate("/")}
      message='Sorry, we couldn’t find the page you’re looking for.
        Kindly check the URL'/>
    </div>
  );
}

export default NotFoundPage;
