/* ════════════════════════════════════════════════════════════════
   notify-admin.js   —   Netlify Function
   ----------------------------------------------------------------
   PURPOSE:
   When a visitor submits a lead form on your website (a client
   inquiry or an application), this sends a push notification to
   ONLY YOUR phone — the device tagged "role = admin" — so you can
   follow up even when you are NOT on the admin panel.

   It does NOT notify your visitors. It is a private alert to you.

   It reuses the SAME secret you already set in Netlify:
       Environment variable:  ONESIGNAL_API_KEY
   So there is nothing new to configure here.

   File location in your repo:
       netlify/functions/notify-admin.js
   It becomes available at:
       /.netlify/functions/notify-admin
   ════════════════════════════════════════════════════════════════ */

const ONESIGNAL_APP_ID = "3a6bdaaf-54fd-4b19-9142-190a5dee459f";

// Where you land when you TAP the alert. Change in Netlify with the
// optional env var ADMIN_PANEL_URL if your admin page lives elsewhere.
const ADMIN_PANEL_URL =
  (process.env.ADMIN_PANEL_URL || "https://big-dreamzz-ai-studio.netlify.app/admin.html").trim();

exports.handler = async function (event) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Browser pre-flight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Use POST" }, cors);
  }

  const apiKey = (process.env.ONESIGNAL_API_KEY || "").trim();
  if (!apiKey) {
    // Never break the visitor's form — just report quietly.
    return json(200, {
      ok: false,
      reason: "ONESIGNAL_API_KEY is not set in Netlify, so the admin alert could not be sent."
    }, cors);
  }

  // Read the lead details the form sent us.
  let type = "lead";
  let name = "";
  try {
    const b = JSON.parse(event.body || "{}");
    if (b.type) type = String(b.type).slice(0, 60);
    if (b.name) name = String(b.name).slice(0, 80);
  } catch (e) { /* keep defaults */ }

  const title = "📥 New " + type;
  const message = (name ? name : "Someone") +
    " just submitted the " + type + " form. Tap to follow up.";

  const route = routeFor(apiKey);

  const payload = {
    app_id: ONESIGNAL_APP_ID,
    // ── Target ONLY your device (the one tagged role=admin) ──
    filters: [{ field: "tag", key: "role", relation: "=", value: "admin" }],
    headings: { en: title },
    contents: { en: message },
    url: ADMIN_PANEL_URL
  };

  try {
    const res = await fetch(route.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": route.scheme + " " + apiKey
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || (data && data.errors)) {
      return json(200, {
        ok: false,
        detail: (data && data.errors) ? data.errors : ("HTTP " + res.status),
        hint: "If this says 'no recipients', open your admin panel once so this device gets tagged as admin."
      }, cors);
    }

    return json(200, {
      ok: true,
      recipients: data.recipients || 0,
      id: data.id || null
    }, cors);

  } catch (err) {
    return json(200, { ok: false, detail: String(err) }, cors);
  }
};

/* New keys (os_v2_app_...) -> api.onesignal.com with "Key".
   Older keys              -> onesignal.com/api/v1 with "Basic". */
function routeFor(apiKey) {
  if (apiKey.indexOf("os_v2_") === 0) {
    return { endpoint: "https://api.onesignal.com/notifications", scheme: "Key" };
  }
  return { endpoint: "https://onesignal.com/api/v1/notifications", scheme: "Basic" };
}

function json(statusCode, obj, cors) {
  return {
    statusCode: statusCode,
    headers: Object.assign({ "Content-Type": "application/json" }, cors || {}),
    body: JSON.stringify(obj)
  };
}
