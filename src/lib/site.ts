export const ROUTES = { home: "/", invitation: "/invitation/", rsvp: "/rsvp/", details: "/details/" } as const;
export const COUPLE = "Sweta & Abhishek";
export const MONOGRAM = "S&A";
export const EVENT = {
  startIso: "2026-12-10T00:00:00+05:30",
  dateDots: "10.12.2026",
  dateLong: "December 10, 2026",
  ceremony: "12:00 PM at Tree Garden And Resort Varanasi Ring Rd, Sandaha, Varanasi",
} as const;
export const VENUE = {
  name: "Tree Garden And Resort",
  addressLines: ["Varanasi Ring Rd, Sandaha, Varanasi,", "Uttar Pradesh 221112"],
  websiteUrl: "https://www.instagram.com/treegardenandresorts/",
  mapsUrl: "https://maps.app.goo.gl/yWxRc3qE6MAApozw9?g_st=ic",
} as const;
export type TimelineIcon = "swans" | "rings" | "candelabra" | "cake" | "camera" | "car";
export type TimelineItem = { time: string; label: string; icon: TimelineIcon };
export const TIMELINE: TimelineItem[] = [
  { time: "12:00 PM", label: "Guest Arrival", icon: "swans" },
  { time: "1:00 PM", label: "Cheka & Tilak", icon: "rings" },
  { time: "2:30 PM", label: "High Tea & Food", icon: "candelabra" },
  { time: "4:00 PM", label: "Ring Ceremony", icon: "rings" },
  { time: "5:00 PM", label: "Cake Cutting", icon: "cake" },
  { time: "5:45 PM", label: "Photos", icon: "camera" },
  { time: "8:00 PM", label: "Farewell", icon: "car" },
];
export const PHONES = [ { display: "+91- 6203173217", tel: "+916203173217" }, { display: "9973502484", tel: "+919973502484" } ] as const;
export const HOSTS = ["Ganga Prasad Gupta", "Rajesh Gupta"] as const;
export const FAMILY = "Gupta Family";
export const LINKS = { registry: "#" } as const;
export type RsvpField = "name" | "contact" | "email" | "attending" | "message";
export type GoogleFormConfig = {
  actionUrl: string;
  entries: Record<RsvpField, string>;
  attendingLabels: { yes: string; no: string };
};
export const GOOGLE_FORM: GoogleFormConfig = {
  // Google Apps Script web app bound to the RSVP Google Sheet (doPost reads these field names).
  actionUrl: "https://script.google.com/macros/s/AKfycbxe5SjF36v1_rJn1wZM0aQRQkWESqAhIGLCQFrcAEkW5HsOU-55V33-Rm8XDpwS2uS4Sg/exec",
  entries: { name: "name", contact: "contact", email: "email", attending: "attending", message: "message" },
  attendingLabels: { yes: "Accepts with pleasure", no: "Regretfully declines" },
};
