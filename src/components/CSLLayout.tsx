import { ReactNode } from "react";
import CSLHeader from "./CSLHeader";
import CSLFooter from "./CSLFooter";

export default function CSLLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CSLHeader />
      <div style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 102px)" }} className="pb-20 lg:pb-0">
        {children}
      </div>
      <CSLFooter />
    </>
  );
}
