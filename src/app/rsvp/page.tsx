import type { Metadata } from "next";
import GoBack from "@/components/GoBack";
import RsvpForm from "./RsvpForm";
import styles from "./rsvp.module.css";

export const metadata: Metadata = { title: "RSVP" };

export default function RsvpPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <RsvpForm />
      </div>
      <div className={styles.bar}>
        <GoBack />
      </div>
    </main>
  );
}
