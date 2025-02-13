import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ToasterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer />;
    </>
  );
}
