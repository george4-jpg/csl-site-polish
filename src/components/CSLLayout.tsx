import { ReactNode } from "react";
import CSLHeader from "./CSLHeader";
import CSLFooter from "./CSLFooter";

export default function CSLLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CSLHeader />
      <div className="pt-[102px] pb-20 lg:pb-0">
        {children}
      </div>
      <CSLFooter />
    </>
  );
}
