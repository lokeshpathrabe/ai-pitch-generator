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
      <div className="px-4 pt-4 h-full">{children}</div>
      <Toaster />
    </div>
  );
}
