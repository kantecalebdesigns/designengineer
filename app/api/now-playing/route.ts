export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type Artist = { name: string };
type SpotifyItem = {
  name: string;
  artists: Artist[];
  external_urls?: { spotify?: string };
};
type SpotifyNowPlaying = {
  is_playing: boolean;
  item: SpotifyItem | null;
};
type SpotifyRecentlyPlayed = {
  items: { track: SpotifyItem }[];
};

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

function trackPayload(item: SpotifyItem, isPlaying: boolean) {
  return {
    isPlaying,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    songUrl: item.external_urls?.spotify ?? null,
  };
}

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return Response.json({ isPlaying: false });
  }

  const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (nowRes.ok && nowRes.status !== 204) {
    const data = (await nowRes.json()) as SpotifyNowPlaying;
    if (data?.item) {
      return Response.json(trackPayload(data.item, data.is_playing), {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      });
    }
  }

  const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (recentRes.ok) {
    const data = (await recentRes.json()) as SpotifyRecentlyPlayed;
    const track = data?.items?.[0]?.track;
    if (track) {
      return Response.json(trackPayload(track, false), {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      });
    }
  }

  return Response.json({ isPlaying: false });
}
