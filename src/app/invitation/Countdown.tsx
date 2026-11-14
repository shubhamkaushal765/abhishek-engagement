"use client";

import { useEffect, useState } from "react";
import { pad2, timeLeft, type TimeLeft } from "@/lib/countdown";
import styles from "./invitation.module.css";

export default function Countdown({ targetIso }: { targetIso: string }) {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = Date.parse(targetIso);
    const tick = () => setLeft(timeLeft(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const cells = [
    { id: "days", label: "Days", value: left ? String(left.days) : "--" },
    { id: "hours", label: "Hours", value: left ? pad2(left.hours) : "--" },
    { id: "minutes", label: "Minutes", value: left ? pad2(left.minutes) : "--" },
    { id: "seconds", label: "Seconds", value: left ? pad2(left.seconds) : "--" },
  ];

  return (
    <div className={styles.countdown} role="timer" aria-label="Countdown to the engagement">
      {cells.map((c, i) => (
        <div key={c.id} className={styles.cdGroup}>
          {i > 0 && <span className={styles.cdColon} aria-hidden="true">:</span>}
          <div className={styles.cdCell}>
            <span className={styles.cdDigits} data-testid={`cd-${c.id}`}>
              {c.value}
            </span>
            <span className={`caps ${styles.cdLabel}`}>{c.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
