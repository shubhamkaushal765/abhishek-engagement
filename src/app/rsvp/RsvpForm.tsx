"use client";

import { useState, type FormEvent } from "react";
import { GOOGLE_FORM } from "@/lib/site";
import { submitRsvp } from "@/lib/rsvp";
import styles from "./rsvp.module.css";

type Status = "idle" | "sending" | "done" | "error";

export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = (k: string) => String(data.get(k) ?? "");
    const choice = text("attending") === "no" ? "no" : "yes";
    setAttending(choice);
    setStatus("sending");
    try {
      await submitRsvp(
        {
          name: text("name"),
          contact: text("contact"),
          email: text("email"),
          attending: choice,
          message: text("message"),
        },
        GOOGLE_FORM,
      );
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={styles.done} role="status">
        <h1 className={styles.title}>Thank you!</h1>
        <p className={styles.doneText}>
          {attending === "yes"
            ? "We can’t wait to celebrate with you."
            : "You will be missed. Thank you for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1 className={styles.title}>RSVP</h1>

      <div className={styles.field}>
        <label htmlFor="rsvp-name" className={styles.label}>Your Full Name</label>
        <input id="rsvp-name" name="name" type="text" required autoComplete="name" className={styles.input} />
      </div>
      <div className={styles.field}>
        <label htmlFor="rsvp-contact" className={styles.label}>Contact</label>
        <input id="rsvp-contact" name="contact" type="tel" autoComplete="tel" className={styles.input} />
      </div>
      <div className={styles.field}>
        <label htmlFor="rsvp-email" className={styles.label}>Email Address</label>
        <input id="rsvp-email" name="email" type="email" autoComplete="email" className={styles.input} />
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.label}>Will you be joining us for the Engagement Ceremony?</legend>
        <label className={styles.choice}>
          <input type="radio" name="attending" value="yes" required className={styles.radio} />
          <span>Accepts with pleasure</span>
        </label>
        <label className={styles.choice}>
          <input type="radio" name="attending" value="no" required className={styles.radio} />
          <span>Regretfully declines</span>
        </label>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="rsvp-message" className={styles.label}>Leave a sweet message or wish for the couple.</label>
        <textarea id="rsvp-message" name="message" rows={3} className={`${styles.input} ${styles.textarea}`} />
      </div>

      {status === "error" && (
        <p className={styles.error} role="alert">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={status === "sending"} className={styles.submit}>
        {status === "sending" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
