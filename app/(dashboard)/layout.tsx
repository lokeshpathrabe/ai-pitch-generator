import DashboardNavbar from "@/components/DashboardNavbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <DashboardNavbar />
      <div className="px-4 pt-4 h-full w-full sm:max-w-[1200px] mx-auto justify-center">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
