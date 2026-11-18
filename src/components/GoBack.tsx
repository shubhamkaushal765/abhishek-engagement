import Link from "next/link";
import { ROUTES } from "@/lib/site";

export default function GoBack({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTES.invitation}
      className={className}
      style={{
        fontFamily: "var(--font-caps), serif",
        fontSize: "var(--fs-sm)",
        display: "inline-flex",
        alignItems: "center",
        minHeight: 44,
        padding: "0 12px",
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
