/* ════════════════════════════════════════════════════════════════════
   BiG-DreamzZ AI Studio — Secure Notification Sender
   --------------------------------------------------------------------
   This is the ONLY thing allowed to send push notifications.
   It reads your secret OneSignal REST API Key from a Netlify
   Environment Variable called  ONESIGNAL_API_KEY  — so the secret
   NEVER appears in your website code, GitHub, or the browser.

   It is called by your admin panel (admin.html) when you:
     • add a new video / client review / student review  → auto-send
     • type a custom message and press "Send"            → manual send

   Requests are only accepted when they come from your own site.
   ════════════════════════════════════════════════════════════════════ */

// Your OneSignal App ID is public and safe to keep here.
const ONESIGNAL_APP_ID = "3a6bdaaf-54fd-4b19-9142-190a5dee459f";

// Only your own site is allowed to use this sender.
const ALLOWED_ORIGINS = [
  "https://big-dreamzz-ai-studio.netlify.app"
];

// The "everyone" group. New OneSignal accounts call it "Total Subscriptions".
// If yours is named differently, set an env var ONESIGNAL_SEGMENT instead.
const SEGMENT = process.env.ONESIGNAL_SEGMENT || "Total Subscriptions";

exports.handler = async function (event) {
  // 1) Only accept POST requests
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  // 2) Only accept requests coming from your own website
  const headers = event.headers || {};
  const origin = headers.origin || headers.Origin || "";
  const referer = headers.referer || headers.Referer || "";
  const fromUs = ALLOWED_ORIGINS.some(function (o) {
    return origin === o || referer.indexOf(o) === 0;
  });
  if (!fromUs) {
    return json(403, { error: "Forbidden — request did not come from your site." });
  }

  // 3) Make sure the secret key has been set up in Netlify
  const apiKey = process.env.ONESIGNAL_API_KEY;
  if (!apiKey) {
    return json(500, {
      error: "Server not configured: the ONESIGNAL_API_KEY environment variable is missing in Netlify."
    });
  }

  // 4) Read the message that was sent in
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

  // 5) Build the notification for OneSignal
  const payload = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: [SEGMENT],
    headings: { en: title },
    contents: { en: message },
    url: url
  };

  // New keys (os_v2_app_...) use the "Key" scheme; older legacy keys use "Basic".
  const scheme = apiKey.indexOf("os_v2_") === 0 ? "Key" : "Basic";

  // 6) Send it
  try {
    const res = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": scheme + " " + apiKey
      },
      body: JSON.stringify(payload)
    });

    let data = {};
    try { data = await res.json(); } catch (e) { /* ignore */ }

    if (!res.ok) {
      const errMsg =
        (data.errors && (Array.isArray(data.errors) ? data.errors[0] : data.errors)) ||
        data.error ||
        ("OneSignal returned HTTP " + res.status);
      return json(res.status, { error: String(errMsg), details: data });
    }

    // recipients = 0 just means nobody has subscribed yet (not an error)
    return json(200, {
      ok: true,
      id: data.id || null,
      recipients: typeof data.recipients === "number" ? data.recipients : null
    });
  } catch (e) {
    return json(502, { error: "Could not reach OneSignal: " + e.message });
  }
};

function json(statusCode, obj) {
  return {
    statusCode: statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  };
}
