/* ════════════════════════════════════════════════════════════════════
   BiG-DreamzZ AI Studio — Secure Notification Sender  (v2)
   --------------------------------------------------------------------
   This is the ONLY thing allowed to send push notifications.
   It reads your secret OneSignal REST API Key from a Netlify
   Environment Variable called  ONESIGNAL_API_KEY  — so the secret
   NEVER appears in your website code, GitHub, or the browser.

   It is called by your admin panel (admin.html) when you:
     • add a new video / client review / student review  → auto-send
     • type a custom message and press "Send"            → manual send

   ── WHAT CHANGED IN v2 (and why notifications were not arriving) ──
   1) Sends to the REAL "everyone" group: "Subscribed Users".
      (The old code used "Total Subscriptions", which is a dashboard
       number, not a real group — so it reached nobody.)
   2) Accepts the request as long as it comes from YOUR OWN site,
      no matter what web address your site is on. (The old code was
      locked to one exact URL and rejected everything else.)
   3) Uses OneSignal's CURRENT sending address + key format.
      New keys (os_v2_app_...) go to api.onesignal.com with "Key".
      Old keys still work the old way as a fallback.
   4) Adds a SELF-TEST: open the function's link in a browser
      (a normal GET visit) and it tells you, in plain words, whether
      your secret key is set and valid — without sending anything.
   ════════════════════════════════════════════════════════════════════ */

// Your OneSignal App ID is public and safe to keep here.
const ONESIGNAL_APP_ID = "3a6bdaaf-54fd-4b19-9142-190a5dee459f";

// The built-in "everyone who is subscribed" group. This name exists in
// every OneSignal app by default. Override only if you renamed it, by
// setting an env var ONESIGNAL_SEGMENT in Netlify.
const SEGMENT = process.env.ONESIGNAL_SEGMENT || "Subscribed Users";

// Optional extra web addresses you want to allow (besides your own site,
// which is always allowed automatically). Usually you can leave this empty.
const EXTRA_ALLOWED_ORIGINS = [
  "https://big-dreamzz-ai-studio.netlify.app"
];

exports.handler = async function (event) {
  // ───────────────────────────────────────────────────────────────
  // SELF-TEST: a normal browser visit (GET) reports the setup status.
  // It NEVER sends a notification and NEVER reveals your secret key.
  // ───────────────────────────────────────────────────────────────
  if (event.httpMethod === "GET") {
    return await healthCheck();
  }

  // 1) Real sends must be POST.
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  // 2) Only accept requests that come from your own website.
  //    "Your own site" = the same address this function is hosted on.
  //    This works no matter what your domain is.
  const headers = lower(event.headers || {});
  const host = headers["host"] || "";
  const origin = headers["origin"] || "";
  const referer = headers["referer"] || "";

  if (!isFromUs(host, origin, referer)) {
    return json(403, {
      error: "Forbidden — this request did not come from your own site."
    });
  }

  // 3) Make sure the secret key has been set up in Netlify.
  const apiKey = (process.env.ONESIGNAL_API_KEY || "").trim();
  if (!apiKey) {
    return json(500, {
      error: "Server not configured: the ONESIGNAL_API_KEY environment variable is missing in Netlify. Add it under Site settings → Environment variables, then redeploy."
    });
  }

  // 4) Read the message that was sent in.
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return json(400, { error: "Invalid request body" });
  }

  const title = (body.title || "BiG-DreamzZ AI Studio").toString().slice(0, 120);
  const message = (body.message || "").toString().slice(0, 400);
  if (!message.trim()) {
    return json(400, { error: "Message text is required" });
  }
  const url = (body.url || "https://big-dreamzz-ai-studio.netlify.app/").toString();

  // 5) Build the notification for OneSignal.
  const payload = {
    app_id: ONESIGNAL_APP_ID,
    target_channel: "push",
    included_segments: [SEGMENT],
    headings: { en: title },
    contents: { en: message },
    url: url
  };

  // 6) Send it, using the correct address + auth for the key you have.
  try {
    const route = routeFor(apiKey);
    const res = await fetch(route.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": route.scheme + " " + apiKey
      },
      body: JSON.stringify(payload)
    });

    let data = {};
    try { data = await res.json(); } catch (e) { /* ignore */ }

    if (!res.ok) {
      return json(res.status, { error: readError(data, res.status), details: data });
    }

    // recipients = 0 just means nobody has subscribed yet (not an error).
    return json(200, {
      ok: true,
      id: data.id || null,
      recipients: typeof data.recipients === "number" ? data.recipients : null
    });
  } catch (e) {
    return json(502, { error: "Could not reach OneSignal: " + e.message });
  }
};

/* ─────────────────────────── helpers ─────────────────────────── */

// New keys start with os_v2_  →  new address + "Key".
// Old/legacy keys             →  old address + "Basic".
function routeFor(apiKey) {
  if (apiKey.indexOf("os_v2_") === 0) {
    return { endpoint: "https://api.onesignal.com/notifications", scheme: "Key" };
  }
  return { endpoint: "https://onesignal.com/api/v1/notifications", scheme: "Basic" };
}

// Allow the request if it comes from the same site this function lives on,
// OR from one of the extra addresses you explicitly listed above.
function isFromUs(host, origin, referer) {
  // Same-site: the page's origin host matches the function's host.
  const oHost = hostOf(origin);
  const rHost = hostOf(referer);
  if (host && (oHost === host || rHost === host)) return true;

  // Explicit allow-list (handles odd hosting setups).
  const src = origin || referer || "";
  return EXTRA_ALLOWED_ORIGINS.some(function (o) {
    return src.indexOf(o) === 0;
  });
}

function hostOf(u) {
  try { return new URL(u).host; } catch (e) { return ""; }
}

function lower(obj) {
  const out = {};
  Object.keys(obj).forEach(function (k) { out[k.toLowerCase()] = obj[k]; });
  return out;
}

function readError(data, status) {
  if (data && data.errors) {
    return Array.isArray(data.errors) ? data.errors.join("; ") : String(data.errors);
  }
  if (data && data.error) return String(data.error);
  return "OneSignal returned HTTP " + status;
}

// Plain-English self-test for a browser visit. Pings OneSignal to confirm
// the key actually works, without sending any notification.
async function healthCheck() {
  const apiKey = (process.env.ONESIGNAL_API_KEY || "").trim();
  if (!apiKey) {
    return json(200, {
      self_test: "FAILED",
      reason: "Your secret key (ONESIGNAL_API_KEY) is NOT set in Netlify.",
      fix: "Netlify -> Site settings -> Environment variables -> add ONESIGNAL_API_KEY -> paste your OneSignal REST API key (the one starting with os_v2_app_) -> Save -> then Deploys -> Trigger deploy."
    });
  }

  const keyLooksNew = apiKey.indexOf("os_v2_") === 0;
  const scheme = keyLooksNew ? "Key" : "Basic";
  const appEndpoint = keyLooksNew
    ? "https://api.onesignal.com/apps/" + ONESIGNAL_APP_ID
    : "https://onesignal.com/api/v1/apps/" + ONESIGNAL_APP_ID;

  try {
    const res = await fetch(appEndpoint, {
      method: "GET",
      headers: { "Authorization": scheme + " " + apiKey }
    });
    let data = {};
    try { data = await res.json(); } catch (e) {}

    if (res.ok) {
      return json(200, {
        self_test: "PASSED",
        meaning: "Your secret key is set and OneSignal accepts it. Sending should work.",
        sending_to_group: SEGMENT,
        key_format: keyLooksNew ? "new (os_v2_app_)" : "legacy",
        app_name: data.name || "(unknown)"
      });
    }

    return json(200, {
      self_test: "FAILED",
      reason: "OneSignal rejected your key (HTTP " + res.status + ").",
      likely_cause: res.status === 401 || res.status === 403
        ? "The key value is wrong, or it's a key for a different app. Copy the REST API key for THIS app from OneSignal -> Settings -> Keys & IDs."
        : readError(data, res.status),
      key_format_detected: keyLooksNew ? "new (os_v2_app_)" : "legacy"
    });
  } catch (e) {
    return json(200, { self_test: "FAILED", reason: "Could not reach OneSignal: " + e.message });
  }
}

function json(statusCode, obj) {
  return {
    statusCode: statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj, null, 2)
  };
}
