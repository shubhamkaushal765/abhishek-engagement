"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COUPLE, EVENT, ROUTES, VENUE } from "@/lib/site";
import bgRose from "@/assets/img/bg-rose-garden.webp";
import envelopeClosed from "@/assets/img/envelope-closed.webp";
import envelopeOpen from "@/assets/img/envelope-open-letter.webp";
import envBack from "@/assets/img/env-back.webp";
import envCard from "@/assets/img/env-card.webp";
import envFlap from "@/assets/img/env-flap.webp";
import envPocket from "@/assets/img/env-pocket.webp";
import envRibbons from "@/assets/img/env-ribbons.webp";
import styles from "./landing.module.css";

// Geometry of the layered open-envelope frame (1024x1536 px art, layers cut from envelope-open-letter.webp):
// body rect x 36..988, hinge y 667, body bottom y 1273. The final transform comes from the probe box below,
// which repeats the /invitation hero letter rules so the hand-off to that page is a seamless cut.
const BODY = { x: 36, y: 667, w: 952, h: 606 };
const CLOSED_BODY = { x: 90, y: 69, w: 622, h: 405, imgW: 800 };
const OPEN_MS = 2700;

type Camera = Record<"--tx0" | "--ty0" | "--kx0" | "--ky0" | "--tx1" | "--ty1" | "--k1" | "--tt", string>;

export default function EnvelopeLanding() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closedRef = useRef<HTMLImageElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    router.prefetch(ROUTES.invitation);
    // Warm the cache with the invitation hero letter so the hand-off to /invitation has no blank frame.
    const warm = new window.Image();
    warm.decoding = "async";
    warm.src = envelopeOpen.src;
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
    const img = closedRef.current;
    if (img) {
      // Align the layered frame's body rect with the closed envelope body, then pull back to fit the viewport.
      // offsetWidth ignores the hover scale transform; the bounding box centre is unaffected by it.
      const r = img.getBoundingClientRect();
      const w = img.offsetWidth;
      const left = r.left + r.width / 2 - w / 2;
      const top = r.top + r.height / 2 - (img.offsetHeight || r.height) / 2;
      const sx = w / CLOSED_BODY.imgW;
      const kx0 = (CLOSED_BODY.w * sx) / BODY.w;
      const ky0 = (CLOSED_BODY.h * sx) / BODY.h;
      const tx0 = left + CLOSED_BODY.x * sx - BODY.x * kx0;
      const ty0 = top + CLOSED_BODY.y * sx - BODY.y * ky0;
      const probe = probeRef.current?.getBoundingClientRect();
      const k1 = probe ? probe.width / 1024 : 0.5;
      const tx1 = probe ? probe.left : 0;
      const ty1 = probe ? probe.top : 0;
      // /invitation positions the text at 43% of the (clipped) hero height, not of the full letter height.
      const heroH = probeRef.current?.parentElement?.getBoundingClientRect().height ?? 0;
      const tt = heroH && k1 ? (0.43 * heroH) / k1 : 0.43 * 1536;
      setCamera({
        "--tx0": `${tx0}px`,
        "--ty0": `${ty0}px`,
        "--kx0": `${kx0}`,
        "--ky0": `${ky0}`,
        "--tx1": `${tx1}px`,
        "--ty1": `${ty1}px`,
        "--k1": `${k1}`,
        "--tt": `${tt}px`,
      });
    }
    setOpening(true);
    timer.current = setTimeout(() => router.push(ROUTES.invitation), OPEN_MS);
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
            ref={closedRef}
            loading="eager"
            fetchPriority="high"
          />
        </button>
        <p className={`caps ${styles.hint} ${styles.fade}`}>Tap envelope to open</p>
      </div>
      <div className={styles.stage} style={(camera ?? undefined) as CSSProperties | undefined} aria-hidden="true">
        <div className={styles.introFill} />
        <div className={styles.heroBox}>
          <Image src={bgRose} alt="" fill sizes="100vw" className={styles.bg} loading="eager" fetchPriority="low" />
          <div className={styles.heroLetter} ref={probeRef} />
        </div>
        <div className={styles.camClip}>
        <div className={styles.cam}>
          <div className={styles.frame}>
            <Image src={envBack} alt="" sizes="660px" className={`${styles.layer} ${styles.back}`} loading="eager" fetchPriority="low" />
            <div className={styles.flap}>
              <div className={styles.flapFront}>
                <Image src={envFlap} alt="" sizes="660px" className={styles.fill} loading="eager" fetchPriority="low" />
              </div>
              <div className={styles.flapBack}>
                <Image src={envFlap} alt="" sizes="660px" className={`${styles.fill} ${styles.outside}`} loading="eager" fetchPriority="low" />
              </div>
            </div>
            <div className={styles.cardClip}>
              <div className={styles.cardSlide}>
                <Image src={envCard} alt="" sizes="660px" className={`${styles.layer} ${styles.card}`} loading="eager" fetchPriority="low" />
                <div className={styles.cardText}>
                  <p className={`script ${styles.cardScript}`}>
                    We’re getting
                    <br />
                    engaged
                  </p>
                  <p className={`names ${styles.cardNames}`}>{COUPLE}</p>
                  <p className={`caps ${styles.cardSmall}`}>{VENUE.name}</p>
                  <p className={`caps ${styles.cardSmall}`}>{EVENT.dateDots}</p>
                </div>
              </div>
            </div>
            <Image src={envPocket} alt="" sizes="660px" className={`${styles.layer} ${styles.pocket}`} loading="eager" fetchPriority="low" />
            <Image src={envRibbons} alt="" sizes="660px" className={`${styles.layer} ${styles.ribbons}`} loading="eager" fetchPriority="low" />
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
