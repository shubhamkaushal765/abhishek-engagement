import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import GoBack from "@/components/GoBack";
import {
  EVENT,
  FAMILY,
  HOSTS,
  LINKS,
  MONOGRAM,
  PHONES,
  TIMELINE,
  VENUE,
  type TimelineIcon,
} from "@/lib/site";
import bgDetailsHero from "@/assets/img/bg-details-hero.webp";
import bgVelvet from "@/assets/img/bg-velvet.webp";
import bowGreen from "@/assets/img/bow-green.webp";
import cameoSwans from "@/assets/img/cameo-swans.webp";
import cardGifts from "@/assets/img/card-gifts.webp";
import frameOvalLeft from "@/assets/img/frame-oval-left.webp";
import iconCake from "@/assets/img/icon-cake.webp";
import iconCamera from "@/assets/img/icon-camera.webp";
import iconCandelabra from "@/assets/img/icon-candelabra.webp";
import iconCar from "@/assets/img/icon-car.webp";
import iconMapPin from "@/assets/img/icon-map-pin.webp";
import iconRings from "@/assets/img/icon-rings.webp";
import iconSwans from "@/assets/img/icon-swans.webp";
import illusBowtieGlove from "@/assets/img/illus-bowtie-glove.webp";
import illusKey from "@/assets/img/illus-key.webp";
import illusRocking from "@/assets/img/illus-rocking-horse.webp";
import illusRose from "@/assets/img/illus-rose.webp";
import photoBallroom from "@/assets/img/photo-gallery-ballroom.webp";
import photoEntry from "@/assets/img/photo-gallery-entry.webp";
import photoVenue from "@/assets/img/photo-venue-chateau.webp";
import ringPearl from "@/assets/img/ring-pearl.webp";
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

const SWATCHES = [
  { label: "Ivory", color: "var(--sand)" },
  { label: "Blush", color: "var(--blush)" },
  { label: "Burgundy", color: "var(--burgundy)" },
  { label: "Navy", color: "var(--navy)" },
  { label: "Black", color: "#000" },
];

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

      <section className={styles.dateSection}>
        <h2 className={`script ${styles.h2}`} style={{ fontSize: 46.67 }}>
          Date and Location
        </h2>
        <p className={`caps ${styles.label}`}>Date</p>
        <p className={styles.dateText}>{EVENT.dateLong}</p>
        <p className={`caps ${styles.label}`} style={{ marginTop: 28 }}>
          Ceremony
        </p>
        <p className={styles.ceremonyText}>{EVENT.ceremony}</p>
      </section>

      <div className={styles.venueFrame}>
        <Image src={photoVenue} alt="Venue" className={styles.venuePhoto} sizes="320px" />
        <Image src={frameOvalLeft} alt="" className={styles.venueOval} sizes="400px" />
        <Image src={bowGreen} alt="" className={styles.venueBow} sizes="320px" />
      </div>

      <section className={styles.timeline}>
        <h2 className={`script ${styles.h2}`} style={{ fontSize: 46.67 }}>
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

      <section className={styles.venueSection}>
        <h2 className={`script ${styles.h2}`} style={{ fontSize: 53.33 }}>
          Venue Location
        </h2>
        <p className={styles.venueIntro}>
          Please find the exact location of our engagement venue linked below to help you plan your
          travel. Kindly book your stay directly at a hotel nearby according to your convenience.
        </p>
        <Image src={illusKey} alt="" className={styles.key} sizes="584px" />
        <p className={`caps ${styles.venueName}`}>{VENUE.name}</p>
        <p className={styles.address}>
          {VENUE.addressLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <a className="pill" href={VENUE.websiteUrl} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
        <Image src={iconMapPin} alt="" className={styles.mapPin} sizes="119px" />
        <a className="pill" href={VENUE.mapsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryEntry}>
          <Image src={photoEntry} alt="The entry" sizes="(max-width: 700px) 100vw, 414px" />
        </div>
        <div className={styles.galleryBallroom}>
          <Image src={photoBallroom} alt="The ballroom" sizes="(max-width: 700px) 100vw, 733px" />
        </div>
      </section>

      <section className={styles.gifts}>
        <Image src={bgVelvet} alt="" fill sizes="100vw" className={styles.cover} />
        <div className={styles.card}>
          <Image src={cardGifts} alt="" sizes="548px" />
          <div className={styles.cardText}>
            <h2 className={`script ${styles.giftsTitle}`}>Gifts</h2>
            <p className={styles.giftsLine}>Your presence is the greatest gift of all.</p>
            {LINKS.registry !== "#" && (
              <>
                <p className={styles.giftsLine}>
                  If you wish to celebrate us further, our registry is linked below.
                </p>
                <div className="rule" />
                <a className={`caps ${styles.registry}`} href={LINKS.registry}>
                  View our registry
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles.other}>
        <h2 className={`script ${styles.h2}`} style={{ fontSize: 53.33 }}>
          Other Details
        </h2>
        <Image src={illusBowtieGlove} alt="" className={styles.bowtie} sizes="300px" />
        <h3 className={`caps ${styles.subhead}`}>Dress Code</h3>
        <p className={styles.otherText}>
          Feel free to wear formal, Indo-Western, or whatever festive outfit you feel most
          comfortable in. No color restrictions!
        </p>
        <ul className={styles.swatches}>
          {SWATCHES.map((s) => (
            <li key={s.label} className={styles.swatch} role="img" aria-label={s.label}>
              <span className={styles.swatchColor} style={{ background: s.color }} />
              <Image src={ringPearl} alt="" className={styles.swatchRing} sizes="60px" />
            </li>
          ))}
        </ul>
        <Image src={illusRose} alt="" className={styles.rose} sizes="160px" />
        <Image src={illusRocking} alt="" className={styles.horse} sizes="320px" />
        <h3 className={`caps ${styles.subhead}`}>Children</h3>
        <p className={styles.otherText}>
          We would love to celebrate with your entire family—little ones are warmly invited to join
          us for the evening!
        </p>
      </section>

      <section className={styles.closing}>
        <div className={styles.cameo}>
          <Image src={cameoSwans} alt="" sizes="450px" />
          <span className={`names ${styles.monogram}`}>{MONOGRAM}</span>
        </div>
        <p className={styles.questions}>For any questions, please reach out to us at</p>
        <p className={styles.phones}>
          {PHONES.map((p, i) => (
            <span key={p.tel}>
              {i > 0 ? ", " : ""}
              <a href={`tel:${p.tel}`}>{p.display}</a>
            </span>
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
