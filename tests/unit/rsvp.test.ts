import { afterEach, describe, it, expect, vi } from "vitest";
import { buildRsvpBody, isFormConfigured, submitRsvp, type RsvpAnswers } from "../../src/lib/rsvp";
import { GOOGLE_FORM, type GoogleFormConfig } from "../../src/lib/site";

const CONFIGURED: GoogleFormConfig = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdReal123/formResponse",
  entries: {
    name: "entry.111",
    contact: "entry.222",
    email: "entry.333",
    attending: "entry.444",
    message: "entry.555",
  },
  attendingLabels: GOOGLE_FORM.attendingLabels,
};

const PLACEHOLDER: GoogleFormConfig = {
  actionUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
  entries: { name: "entry.XXXX_NAME", contact: "entry.XXXX_CONTACT", email: "entry.XXXX_EMAIL", attending: "entry.XXXX_ATTENDING", message: "entry.XXXX_MESSAGE" },
  attendingLabels: GOOGLE_FORM.attendingLabels,
};

const ANSWERS: RsvpAnswers = {
  name: "  Asha Rao ",
  contact: " 9999999999  ",
  email: " asha@example.com ",
  attending: "yes",
  message: "  Congratulations!  ",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("isFormConfigured", () => {
  it("is false for the placeholder config", () => {
    expect(isFormConfigured(PLACEHOLDER)).toBe(false);
  });

  it("is true for a real-looking url and entry ids", () => {
    expect(isFormConfigured(CONFIGURED)).toBe(true);
  });

  it("is false when one entry is still a placeholder", () => {
    const form = { ...CONFIGURED, entries: { ...CONFIGURED.entries, email: "entry.XXXX_EMAIL" } };
    expect(isFormConfigured(form)).toBe(false);
  });
});

describe("site RSVP config", () => {
  it("is configured with plain field names for the Apps Script", () => {
    expect(isFormConfigured(GOOGLE_FORM)).toBe(true);
    expect(GOOGLE_FORM.actionUrl).toMatch(/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/);
    expect(Object.values(GOOGLE_FORM.entries).sort()).toEqual(["attending", "contact", "email", "message", "name"]);
  });
});

describe("buildRsvpBody", () => {
  it("uses exactly the five configured entry ids", () => {
    const body = buildRsvpBody(ANSWERS, CONFIGURED);
    expect([...body.keys()].sort()).toEqual(Object.values(CONFIGURED.entries).sort());
  });

  it("maps attending to the configured labels", () => {
    const yes = buildRsvpBody({ ...ANSWERS, attending: "yes" }, CONFIGURED);
    const no = buildRsvpBody({ ...ANSWERS, attending: "no" }, CONFIGURED);
    expect(yes.get("entry.444")).toBe("Accepts with pleasure");
    expect(no.get("entry.444")).toBe("Regretfully declines");
  });

  it("trims every value", () => {
    const body = buildRsvpBody(ANSWERS, CONFIGURED);
    expect(body.get("entry.111")).toBe("Asha Rao");
    expect(body.get("entry.222")).toBe("9999999999");
    expect(body.get("entry.333")).toBe("asha@example.com");
    expect(body.get("entry.555")).toBe("Congratulations!");
  });

  it("keeps an empty message as an empty string", () => {
    const body = buildRsvpBody({ ...ANSWERS, message: "   " }, CONFIGURED);
    expect(body.get("entry.555")).toBe("");
  });
});

describe("submitRsvp", () => {
  it("skips and warns when the form is a placeholder", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn();
    const result = await submitRsvp(ANSWERS, PLACEHOLDER, fetchMock as unknown as typeof fetch);
    expect(result).toBe("skipped");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });

  it("posts no-cors form data when configured", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null));
    const result = await submitRsvp(ANSWERS, CONFIGURED, fetchMock as unknown as typeof fetch);
    expect(result).toBe("sent");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(CONFIGURED.actionUrl);
    expect(init).toMatchObject({ method: "POST", mode: "no-cors" });
    expect(init.body).toBeInstanceOf(URLSearchParams);
  });

  it("propagates a fetch rejection", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    await expect(submitRsvp(ANSWERS, CONFIGURED, fetchMock as unknown as typeof fetch)).rejects.toThrow("network down");
  });
});
