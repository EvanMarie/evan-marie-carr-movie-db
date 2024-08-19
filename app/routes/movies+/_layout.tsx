import { Outlet } from "@remix-run/react";
import FlexFull from "~/buildingBlockComponents/flexFull";

export default function MoviesLayout() {
  return (
    <FlexFull className="h-[100svh] bg-col-980 bg-gradient-to-br from-indigo-400/50 via-cyan-500/50 to-violet-400/50 rounded-none">
      <Outlet />
    </FlexFull>
  );
}
