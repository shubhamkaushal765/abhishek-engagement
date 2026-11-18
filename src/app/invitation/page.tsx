import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COUPLE, EVENT, ROUTES, VENUE } from "@/lib/site";
import bgJewel from "@/assets/img/bg-jewel-box.webp";
import bgRose from "@/assets/img/bg-rose-garden.webp";
import bgRsvp from "@/assets/img/bg-rsvp-couple.webp";
import bowGreen from "@/assets/img/bow-green.webp";
import envelopeOpen from "@/assets/img/envelope-open-letter.webp";
import frameLeft from "@/assets/img/frame-oval-left.webp";
import frameRight from "@/assets/img/frame-oval-right.webp";
import ornament from "@/assets/img/ornament-swans.webp";
import photoEmbrace from "@/assets/img/photo-couple-embrace.webp";
import photoWalking from "@/assets/img/photo-couple-walking.webp";
import wreath from "@/assets/img/wreath-oval.webp";
import Countdown from "./Countdown";
import styles from "./invitation.module.css";

export const metadata: Metadata = { title: "Invitation" };

export default function InvitationPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image src={bgRose} alt="" fill sizes="100vw" className={styles.cover} loading="eager" fetchPriority="high" />
        <div className={styles.letter}>
          <Image
            src={envelopeOpen}
            alt=""
            sizes="(max-width: 705px) 100vw, 705px"
            className={styles.fluid}
            loading="eager"
            fetchPriority="high"
          />
          <div className={styles.letterText}>
            <h1 className={`script ${styles.letterScript}`}>
              We’re getting
              <br />
              engaged
            </h1>
            <p className={`names ${styles.letterNames}`}>{COUPLE}</p>
            <p className={`caps ${styles.letterSmall}`}>{VENUE.name}</p>
            <p className={`caps ${styles.letterSmall}`}>{EVENT.dateDots}</p>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.composite}>
          <Image src={photoWalking} alt="" sizes="260px" className={`${styles.abs} ${styles.photoL}`} />
          <Image src={frameLeft} alt="" sizes="340px" className={`${styles.abs} ${styles.frameL}`} />
          <Image src={photoEmbrace} alt="" sizes="340px" className={`${styles.abs} ${styles.photoR}`} />
          <Image src={frameRight} alt="" sizes="380px" className={`${styles.abs} ${styles.frameR}`} />
          <Image src={bowGreen} alt="" sizes="450px" className={`${styles.abs} ${styles.bow}`} />
        </div>
        <p className={styles.introText}>
          As we begin this new chapter together, nothing would mean more to us than having you by our side. Here
          you’ll find everything you need for our day: the schedule, the venue, travel details and how to RSVP.
        </p>
        <p className={styles.thanks}>Thank you for being part of our story</p>
        <p className={`caps ${styles.withLove}`}>With love</p>
        <p className={`names ${styles.signature}`}>{COUPLE}</p>
      </section>

      <section className={styles.rsvp}>
        <Image src={bgRsvp} alt="" fill sizes="100vw" className={`${styles.cover} ${styles.rsvpBg}`} />
        <Link href={ROUTES.rsvp} className={styles.wreath} aria-label="Kindly RSVP, click here">
          <Image src={wreath} alt="" sizes="(max-width: 585px) 92vw, 539px" className={styles.fluid} />
          <span className={styles.wreathText}>
            <span className={`script ${styles.wreathScript}`}>
              Kindly
              <br />
              RSVP
            </span>
            <span className={`rule ${styles.wreathRule}`} />
            <span className={`caps ${styles.wreathSmall}`}>Click here</span>
          </span>
        </Link>
      </section>

      <section className={styles.count}>
        <Image src={ornament} alt="" sizes="(max-width: 748px) 90vw, 673px" className={styles.ornament} />
        <h2 className={`script ${styles.countTitle}`}>The countdown is on</h2>
        <Countdown targetIso={EVENT.startIso} />
      </section>

      <section className={styles.teaser}>
        <Link href={ROUTES.details} className={styles.jewel} aria-label="The Details, click here">
          <Image src={bgJewel} alt="" sizes="100vw" className={styles.jewelImg} />
          <span className={styles.jewelText}>
            <span className={`script ${styles.jewelScript}`}>
              The
              <br />
              Details
            </span>
            <span className={`rule ${styles.wreathRule}`} />
            <span className={`caps ${styles.jewelSmall}`}>Click here</span>
          </span>
        </Link>
      </section>
    </main>
  );
}
