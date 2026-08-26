"use client";

import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiCplusplus,
  SiPython,
  SiDart,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJetpackcompose,
  SiAndroid,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiSpringboot,
  SiDotnet,
  SiExpress,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiSupabase,
  SiGooglecloud,
  SiVercel,
  SiCloudflare,
  SiGooglegemini,
  SiGit,
  SiArduino,
} from "react-icons/si";

const ICONS: Record<string, IconType> = {
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiCplusplus,
  SiPython,
  SiDart,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJetpackcompose,
  SiAndroid,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiSpringboot,
  SiDotnet,
  SiExpress,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiSupabase,
  SiGooglecloud,
  SiVercel,
  SiCloudflare,
  SiGooglegemini,
  SiGit,
  SiArduino,
};

export default function TechIcon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} style={style} aria-hidden />;
}
