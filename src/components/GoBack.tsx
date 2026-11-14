import Link from "next/link";
import { ROUTES } from "@/lib/site";

export default function GoBack({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTES.invitation}
      className={className}
      style={{
        fontFamily: "var(--font-caps), serif",
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 5,
        color: "#fff",
        textDecoration: "underline",
      }}
    >
      &lt; GO BACK
    </Link>
  );
}
