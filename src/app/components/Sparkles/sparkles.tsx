import React from "react";
import IconSparkle from "@/app/components/Icons/IconSparkle";
import IconCircleBlue from "@/app/components/Icons/IconCircleBlue";

export const SPARKLES = [
  // left side
  {
    svg: <IconCircleBlue id="svg-1" />,
    style: { position: "absolute" as const, top: 0, left: -20 },
  },
  {
    svg: <IconCircleBlue id="svg-2" />,
    style: { position: "absolute" as const, top: 28, left: -54 },
  },
  {
    svg: <IconSparkle id="svg-3" />,
    style: { position: "absolute" as const, top: 32, left: -28 },
  },
  {
    svg: <IconSparkle id="svg-4" />,
    style: { position: "absolute" as const, top: 60, left: -44 },
  },
  {
    svg: <IconCircleBlue id="svg-5" />,
    style: { position: "absolute" as const, top: 54, left: -16 },
  },
  {
    svg: <IconSparkle id="svg-6" />,
    style: { position: "absolute" as const, top: 72, left: 0 },
  },
  // right side
  {
    svg: <IconCircleBlue id="svg-7" />,
    style: { position: "absolute" as const, top: 0, right: -20 },
  },
  {
    svg: <IconSparkle id="svg-8" />,
    style: { position: "absolute" as const, top: 24, right: -40 },
  },
  {
    svg: <IconCircleBlue id="svg-9" />,
    style: { position: "absolute" as const, top: 32, right: -16 },
  },
  {
    svg: <IconSparkle id="svg-10" />,
    style: { position: "absolute" as const, top: 60, right: -10 },
  },
  {
    svg: <IconCircleBlue id="svg-11" />,
    style: { position: "absolute" as const, top: 54, right: -32 },
  },
  {
    svg: <IconCircleBlue id="svg-12" />,
    style: { position: "absolute" as const, top: 80, right: 0 },
  },
  {
    svg: <IconSparkle id="svg-13" />,
    style: { position: "absolute" as const, top: 80, right: -40 },
  },
];
