"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COUPLE, ROUTES } from "@/lib/site";
import bgRose from "@/assets/img/bg-rose-garden.webp";
import envelopeClosed from "@/assets/img/envelope-closed.webp";
import envelopeOpen from "@/assets/img/envelope-open-letter.webp";
import styles from "./landing.module.css";

export default function EnvelopeLanding() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    router.prefetch(ROUTES.invitation);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [router]);

  function open() {
    if (opening) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      router.push(ROUTES.invitation);
      return;
    }
    setOpening(true);
    timer.current = setTimeout(() => router.push(ROUTES.invitation), 1700);
  }

  return (
    <main className={`${styles.page} ${opening ? styles.opening : ""}`}>
      <Image
        src={bgRose}
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
        loading="eager"
        fetchPriority="high"
      />
      <div className={styles.column}>
        <p className={`caps ${styles.kicker} ${styles.fade}`}>You’ve got mail from</p>
        <h1 className={`script ${styles.names} ${styles.fade}`}>{COUPLE}</h1>
        <button type="button" className={styles.envelope} aria-label="Open invitation" onClick={open}>
          <Image
            src={envelopeClosed}
            alt=""
            sizes="(max-width: 822px) 92vw, 757px"
            className={styles.closed}
            loading="eager"
            fetchPriority="high"
          />
          <Image
            src={envelopeOpen}
            alt=""
            sizes="(max-width: 822px) 92vw, 757px"
            className={styles.letter}
            loading="eager"
          />
        </button>
        <p className={`caps ${styles.hint} ${styles.fade}`}>Tap envelope to open</p>
      </div>
    </main>
  );
}
