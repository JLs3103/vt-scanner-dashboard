export const threatCategories = [
  { name: "Malware", value: 45, color: "#f43f5e" },
  { name: "C2", value: 25, color: "#e879f9" },
  { name: "Phishing", value: 20, color: "#facc15" },
  { name: "Benign", value: 10, color: "#2dd4bf" },
];

export const trafficCategories = [
  { name: "Malware", value: 45, color: "#f43f5e" },
  { name: "Botnet", value: 25, color: "#f97316" },
  { name: "Suspicious", value: 20, color: "#facc15" },
  { name: "Benign", value: 10, color: "#2dd4bf" },
];

export const vendorBars = [
  { name: "CrowdStrike", value: 68, color: "#f43f5e" },
  { name: "SentinelOne", value: 42, color: "#facc15" },
  { name: "Palo Alto", value: 15, color: "#2dd4bf" },
];

export type VendorStatus = "malicious" | "suspicious" | "clean";

export const vendorFeed = [
  {
    vendor: "CrowdStrike",
    family: "EvasiveWorm.A",
    firstSeen: "2026-09-10",
    lastSeen: "2026-09-18",
    detections: "1,248",
    confidence: "92%",
    status: "malicious" as VendorStatus,
  },
  {
    vendor: "SentinelOne",
    family: "StealthDropper.Z",
    firstSeen: "2026-08-22",
    lastSeen: "2026-09-17",
    detections: "652",
    confidence: "76%",
    status: "suspicious" as VendorStatus,
  },
  {
    vendor: "Palo Alto",
    family: "DropperLite",
    firstSeen: "2026-07-05",
    lastSeen: "2026-09-16",
    detections: "120",
    confidence: "55%",
    status: "clean" as VendorStatus,
  },
  {
    vendor: "Microsoft",
    family: "MailPhish.T",
    firstSeen: "2026-09-01",
    lastSeen: "2026-09-18",
    detections: "389",
    confidence: "81%",
    status: "malicious" as VendorStatus,
  },
];

export const timelineEvents = [
  {
    title: "Suspicious Outbound Connection to 198.51.100.22",
    body: "Detected by NetWatch sensor — connection attempted to port 4444, behavior consistent with remote command shell.",
    time: "2026-09-18 14:32 UTC",
    severity: "High" as const,
    icon: "alert",
  },
  {
    title: "Unusual TLS Certificate Observed",
    body: "Certificate CN mismatch for example-login.io, issued by Unknown CA and seen across multiple hosts.",
    time: "2026-09-16 09:10 UTC",
    severity: "Medium" as const,
    icon: "cert",
  },
  {
    title: "Malware Beaconing Pattern",
    body: "Repeated periodic connections every 15 minutes, correlates with known botnet signature.",
    time: "2026-09-13 22:41 UTC",
    severity: "Critical" as const,
    icon: "bug",
  },
  {
    title: "ASN Reputation Change",
    body: "ASN AS58367 flagged by multiple sources for increased spam and proxying activity over 30 days.",
    time: "2026-09-10 06:05 UTC",
    severity: "Medium" as const,
    icon: "network",
  },
];

export const observedIndicators = [
  {
    kind: "domain" as const,
    title: "paysecure-login.com",
    meta: "First seen: 2026-09-14 · 12 detections · Host header mismatch",
  },
  {
    kind: "url" as const,
    title: "http://198.51.100.22/malware/download",
    meta: "First seen: 2026-09-12 · 7 detections · URL flagged for hosting payload",
  },
  {
    kind: "cert" as const,
    title: "CN=tracker.example.net (self-signed)",
    meta: "Seen on 3 hosts · Issuer: Unknown CA · Expiry: 2027-02-01",
  },
  {
    kind: "domain" as const,
    title: "cdn-static-assets.io",
    meta: "First seen: 2026-08-30 · 2 detections · Possible typosquat",
  },
  {
    kind: "url" as const,
    title: "http://198.51.100.22/manifest.json",
    meta: "First seen: 2026-09-11 · 1 detection · Linked to downloader script",
  },
];

export const hashes = [
  {
    algo: "SHA256",
    value: "9f2b4a6c3d5e8b7a9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
    type: "SHA256 · Observed in payload download · First seen 2026-09-12",
    status: "malicious" as VendorStatus,
  },
  {
    algo: "MD5",
    value: "d41d8cd98f00b204e9800998ecf8427e",
    type: "Type: MD5 · Matched in sandbox · First seen 2026-09-13",
    status: "clean" as VendorStatus,
  },
  {
    algo: "SHA1",
    value: "2fd4e1c67a2d28fced849ee1bb76e7391b932eb1",
    type: "Type: SHA1 · Related to inbound C2 artifacts · First seen 2026-09-15",
    status: "suspicious" as VendorStatus,
  },
];

export const vendorVerdicts = [
  {
    name: "NetWatch",
    body: "Detected multiple outbound connections with signature matching NW-Beacon v2.",
    last: "2026-09-18",
    status: "malicious" as VendorStatus,
  },
  {
    name: "CertWatch",
    body: "Detected self-signed certificate reuse across multiple domains associated with this IP.",
    last: "2026-09-16",
    status: "suspicious" as VendorStatus,
  },
  {
    name: "ThreatLens",
    body: "High correlation with known botnet C2 patterns; multiple independent telemetry signals.",
    last: "2026-09-13",
    status: "malicious" as VendorStatus,
  },
  {
    name: "GeoIntel",
    body: "Geolocation indicates hosting in a mixed-traffic datacenter with prior abuse reports.",
    last: "2026-09-10",
    status: "clean" as VendorStatus,
  },
];

export const integrations = [
  { name: "VirusTotal", desc: "Used for live IoC reputation lookups", status: "connected", last: "Sep 13, 2026 03:44", tags: ["Credentials"] },
  { name: "Shadow", desc: "Internal table receiving data", status: "disconnected", last: "Sep 12, 2026 2:11", tags: ["Credentials"] },
  { name: "Cortex", desc: "SIEM with SOAR workflows", status: "connected", last: "Sep 13, 2026 09:03", tags: ["Credentials"] },
  { name: "Slack Connector", desc: "Push operational alerts to SOM", status: "connected", last: "Sep 12, 2026 18:14", tags: ["Credentials"] },
];

export const alertRules = [
  { name: "High volume of clicks", meta: "Trigger on 500+ clicks/24h", severity: "High", enabled: true },
  { name: "New IP seen in watchlist", meta: "Trigger on first seen for intelligence lists", severity: "Medium", enabled: true },
  { name: "Credential stuffing spike", meta: "Detect unusual login sequences", severity: "Critical", enabled: true },
  { name: "SIEM ingestion failure", meta: "Alert on failed SIEM push", severity: "High", enabled: false },
];

export const activityFeed = [
  { time: "2026-09-18 14:32 UTC", text: "[vt-scan] Initiating test connection to VirusTotal API v3" },
  { time: "2026-09-18 14:32 UTC", text: "[vt-scan] Authenticated using API key ending in · 4A02" },
  { time: "2026-09-18 14:32 UTC", text: "[vt-scan] Querying sample report for known malicious hash" },
  { time: "2026-09-18 14:32 UTC", text: "[vt-scan] Response received — 12 IOC matches" },
  { time: "2026-09-18 14:32 UTC", text: "[vt-scan] Test finished successfully" },
];

export const historyPoints = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 9 },
  { day: "Thu", value: 22 },
  { day: "Fri", value: 16 },
  { day: "Sat", value: 11 },
  { day: "Sun", value: 14 },
];
