import type { Metadata } from "next";
import EnvelopeLanding from "./EnvelopeLanding";

export const metadata: Metadata = { title: "Home" };

export default function Home() {
  return <EnvelopeLanding />;
}
