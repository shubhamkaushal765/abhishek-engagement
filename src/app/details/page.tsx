import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import GoBack from "@/components/GoBack";
import {
  EVENT,
  FAMILY,
  HOSTS,
  LINKS,
  MONOGRAM,
  PHONES,
  ROUTES,
  TIMELINE,
  VENUE,
  type TimelineIcon,
} from "@/lib/site";
import bgDetailsHero from "@/assets/img/bg-details-hero.webp";
import bowGreen from "@/assets/img/bow-green.webp";
import cameoSwans from "@/assets/img/cameo-swans.webp";
import frameOvalLeft from "@/assets/img/frame-oval-left.webp";
import iconCake from "@/assets/img/icon-cake.webp";
import iconCamera from "@/assets/img/icon-camera.webp";
import iconCandelabra from "@/assets/img/icon-candelabra.webp";
import iconCar from "@/assets/img/icon-car.webp";
import iconRings from "@/assets/img/icon-rings.webp";
import iconSwans from "@/assets/img/icon-swans.webp";
import photoVenue from "@/assets/img/photo-venue-chateau.webp";
import styles from "./details.module.css";

export const metadata: Metadata = { title: "Details" };

const ICONS: Record<TimelineIcon, StaticImageData> = {
  swans: iconSwans,
  rings: iconRings,
  candelabra: iconCandelabra,
  cake: iconCake,
  camera: iconCamera,
  car: iconCar,
};

export default function DetailsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src={bgDetailsHero}
          alt=""
          fill
          sizes="100vw"
          className={styles.cover}
          loading="eager"
          fetchPriority="high"
        />
        <h1 className={`script ${styles.heroTitle}`}>The Details</h1>
      </section>

      <section className={styles.whenWhere}>
        <h2 className={`script ${styles.h2}`}>When &amp; Where</h2>
        <p className={styles.dateText}>{EVENT.dateLong}</p>
        <p className={styles.startTime}>From {TIMELINE[0].time}</p>
        <div className={styles.venueFrame}>
          <Image src={photoVenue} alt={VENUE.name} className={styles.venuePhoto} sizes="320px" />
          <Image src={frameOvalLeft} alt="" className={styles.venueOval} sizes="400px" />
          <Image src={bowGreen} alt="" className={styles.venueBow} sizes="320px" />
        </div>
        <p className={`caps ${styles.venueName}`}>{VENUE.name}</p>
        <p className={styles.address}>
          {VENUE.addressLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <div className={styles.actions}>
          <a className="pill pillSolid" href={VENUE.mapsUrl} target="_blank" rel="noopener noreferrer">
            Get Directions
          </a>
          <a className="pill" href={VENUE.websiteUrl} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </div>
        <p className={styles.note}>
          Kindly book your stay directly at a hotel nearby according to your convenience.
        </p>
      </section>

      <section className={styles.timeline}>
        <h2 className={`script ${styles.h2}`}>
          Our Timeline
        </h2>
        <ol className={styles.timelineList}>
          {TIMELINE.map((t) => (
            <li key={t.time} className={styles.timelineItem}>
              <Image
                src={ICONS[t.icon]}
                alt=""
                className={styles.timelineIcon}
                style={{ width: ICONS[t.icon].width * 0.85 }}
                sizes="260px"
              />
              <p className={`caps ${styles.time}`}>{t.time}</p>
              <p className={styles.timeLabel}>{t.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.other}>
        <h2 className={`script ${styles.h2}`}>Other Details</h2>
        <h3 className={`caps ${styles.subhead}`}>Dress Code</h3>
        <p className={styles.otherText}>
          Feel free to wear formal, Indo-Western, or whatever festive outfit you feel most
          comfortable in. No color restrictions!
        </p>
        <h3 className={`caps ${styles.subhead}`}>Children</h3>
        <p className={styles.otherText}>
          We would love to celebrate with your entire family—little ones are warmly invited to join
          us for the evening!
        </p>
        <h3 className={`caps ${styles.subhead}`}>Gifts</h3>
        <p className={styles.otherText}>Your presence is the greatest gift of all.</p>
        {LINKS.registry !== "#" && (
          <a className="pill" href={LINKS.registry} target="_blank" rel="noopener noreferrer">
            View our registry
          </a>
        )}
      </section>

      <section className={styles.closing}>
        <div className={styles.cameo}>
          <Image src={cameoSwans} alt="" sizes="450px" />
          <span className={`names ${styles.monogram}`}>{MONOGRAM}</span>
        </div>
        <Link href={ROUTES.rsvp} className={`pill ${styles.rsvp}`}>
          Kindly RSVP
        </Link>
        <p className={styles.questions}>For any questions, please reach out to us at</p>
        <p className={styles.phones}>
          {PHONES.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`}>
              {p.display}
            </a>
          ))}
        </p>
        <p className={`caps ${styles.invitedBy}`}>Cordially invited by:</p>
        <p className={`caps ${styles.hosts}`}>{HOSTS.map((h) => (<span key={h} className={styles.host}>{h}</span>))}</p>
        <p className={`caps ${styles.family}`}>{FAMILY}</p>
        <GoBack className={styles.goBack} />
      </section>
    </main>
  );
}
