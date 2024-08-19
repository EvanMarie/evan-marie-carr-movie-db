import { Outlet } from "@remix-run/react";
import FlexFull from "~/buildingBlockComponents/flexFull";

export default function MoviesLayout() {
  return (
    <FlexFull className="h-[100svh] bg-col-790 bg-gradient-to-br from-indigo-400/30 via-cyan-500/30 to-violet-400/30">
      <Outlet />
    </FlexFull>
  );
}
