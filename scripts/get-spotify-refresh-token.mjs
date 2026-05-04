// One-time helper: exchange a Spotify authorization code for a refresh token.
//
// Usage:
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy \
//     node scripts/get-spotify-refresh-token.mjs <auth_code> [redirect_uri]
//
// The redirect_uri MUST match exactly what is configured in the Spotify app
// dashboard. Default is http://127.0.0.1:3000/callback.

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const code = process.argv[2];
const redirectUri = process.argv[3] || "http://127.0.0.1:3000/callback";

if (!clientId || !clientSecret || !code) {
  console.error(
    "Usage: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-refresh-token.mjs <auth_code> [redirect_uri]",
  );
  process.exit(1);
}

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const res = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${auth}`,
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  }),
});

if (!res.ok) {
  console.error("Spotify error:", res.status, await res.text());
  process.exit(1);
}

const json = await res.json();
console.log("\nAdd this to .env.local:\n");
console.log(`SPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n`);
