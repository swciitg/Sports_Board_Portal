import { TbLoader2 } from "react-icons/tb";

function Loader({ isOpen, message = "Loading..." }) {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-stone-800/40 flex justify-center overflow-y-auto md:overflow-y-scroll items-center z-50 transition-opacity m-0 duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-white p-8 rounded-md shadow-xl w-full max-h-[90vh] transform max-w-fit flex items-center gap-4 transition-all duration-500 ease-out origin-center md:overflow-scroll overflow-auto ${isOpen ? 'scale-100' : 'scale-80'}` }>
            <TbLoader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-lg font-medium text-gray-700">{message}</p>
        </div>
    </div>    
  );
}

export default Loader;
