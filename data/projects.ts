export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  hero: string;
  heroAspect?: string;
  heroVideo?: string;
  cardImage?: string;
  cardVideo?: string;
  overview?: string;
  problem: string;
  research?: string;
  solution: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "codey",
    title: "Codey",
    category: "Kids App",
    year: "2025",
    description:
      "A coding app built from the ground up for children aged 3–6 — where play teaches logic, and pre-readers can navigate on their own.",
    tech: ["Figma", "Prototyping", "User Research"],
    hero: "/screens/codey/Onboarding%20Codey.webp",
    heroAspect: "2048 / 1869",
    cardImage: "/screens/codey/codey%20mockup%20main%20page.png",
    problem:
      "Most coding apps for young children aren't actually built for young children. Tools like Scratch and Tynker introduce too much complexity too soon — overwhelming kids aged 3–6 who are still learning to read, let alone parse logic blocks. The result: kids lose interest fast, and parents give up.",
    research:
      "I ran a competitor analysis across the leading kids' coding platforms, looking at onboarding flows, lesson structure, visual language, and reward systems. The pattern was clear — these apps were designed for older kids (7+) and retrofitted for younger ones. Nothing felt genuinely built for a 3–6 year-old's attention span, motor skills, or comprehension level.",
    solution:
      "I designed Codey around a Duolingo-style learning model — bite-sized lessons, instant feedback, streaks, and a clear sense of progression. Each \"level\" teaches a single concept through play, not instruction. The interface is touch-friendly, icon-led, and stripped of any text-heavy elements so pre-readers can navigate independently. The result is an app that feels like a game first and a lesson second — exactly how kids that age actually learn.",
    images: [
      "/screens/codey/Codey%20Design%20Portfolio.webp",
      "/screens/codey/Codey%201.webp",
      "/screens/codey/Codey%20Design%20Portfolio%20%281%29.webp",
    ],
  },
  {
    slug: "servease",
    title: "Servease",
    category: "On-Demand Service Booking App",
    year: "2025",
    description:
      "An on-demand booking app that connects users with trusted local service providers — plumbers, electricians, stylists — in just three steps.",
    tech: ["Figma", "Prototyping", "User Research"],
    hero: "/screens/Servease/Home%20Design%20Portfolio.webp",
    heroAspect: "2048 / 1937",
    cardImage: "/screens/Servease/Servease%20Design%20Portfolio%20%281%29.webp",
    problem:
      "Finding reliable service providers — plumbers, electricians, stylists — still relies on word-of-mouth or offline hustle. It's slow, inconsistent, and out of step with how digital-first users expect to get things done.",
    research:
      "I studied how ride-hailing apps like InDrive solved a similar matching problem — connecting users to nearby providers in real time with minimal friction. The takeaway: people don't want a directory, they want a match. The booking experience needed to collapse into a few clear steps, with enough live feedback to build trust before money or time was committed.",
    solution:
      "I designed Servease around a three-step flow: Request → Match → Confirm. Users describe what they need through a flexible request form and see nearby available providers instantly. A live matching screen with real-time status updates removes the anxiety of \"did this actually go through?\" On the back end, I designed an admin dashboard for approving providers, managing categories, and tracking requests. Stakeholders greenlit the product for development after the first review — citing the flow's clarity and visual polish.",
    images: [
      "/screens/Servease/Home%20Design%20Portfolio.webp",
      "/screens/Servease/Cat%20Design%20Portfolio.webp",
      "/screens/Servease/Admin%20Dashboard%20-%20Design%20Portfolio.webp",
      "/screens/Servease/Dispute%20Resolution%20-%20Design%20Portfolio.webp",
    ],
  },
  {
    slug: "wallify",
    title: "Wallify",
    category: "Wallpaper App · Exploration",
    year: "2025",
    description:
      "A small exploration into a calm, minimal wallpaper app — where the visuals take the spotlight and the interface gets out of the way.",
    tech: ["Figma", "Prototyping", "UI Exploration"],
    hero: "/screens/Wallify/Wallify%20Home%20Page%20Design%20Portfolio.webp",
    heroAspect: "1749 / 1413",
    cardImage: "/screens/Wallify/Wallify%20Background.webp",
    overview:
      "Wallify was a personal exploration into designing a calm, minimal wallpaper experience. Most wallpaper apps drown users in endless scrolling and cluttered menus, burying the very thing people came for — the visuals. I wanted to flip that: an app where the wallpapers take the spotlight, and the interface gets out of the way. The result is a clean, intuitive browsing experience that feels less like searching and more like discovering.",
    problem:
      "Most wallpaper apps drown users in endless scrolling and cluttered menus, burying the very thing people came for — the visuals.",
    solution:
      "A clean, intuitive browsing experience where wallpapers take the spotlight and the interface gets out of the way — discovery over search.",
    images: [
      "/screens/Wallify/Wallify%20Home%20Page%20Design%20Portfolio.webp",
      "/screens/Wallify/Wallpaper%20from%20Design%20Portfolio.webp",
      "/screens/Wallify/Favourite%20Wallpaper%20from%20Design%20Portfolio.webp",
      "/screens/Wallify/Favourite%20Wallpaper%20from%20Design%20Portfolio%20%281%29.webp",
    ],
  },
  {
    slug: "plug",
    title: "Plug",
    category: "Recommendation App",
    year: "2025",
    description:
      "A dedicated space for friend-to-friend recommendations across movies, music, and shows — where the things your people swear by don't get lost in the chat.",
    tech: ["Figma", "Prototyping", "User Research"],
    hero: "/screens/Plug/recoomendation%20app%20video.mp4",
    heroVideo: "/screens/Plug/recoomendation%20app%20video.mp4",
    cardVideo: "/screens/Plug/recoomendation%20app%20video.mp4",
    problem:
      "Recommendations between friends already happen constantly — but they live in fragmented places. A movie tip buried in a WhatsApp chat. A song name screenshotted and forgotten. A show someone swore by months ago, lost to the scroll. There's no single place to send, save, and act on the things the people you actually trust are recommending.",
    research:
      "I looked at how recommendations move between friends today — group chats, story replies, screenshots, voice notes — and where they break down. The pattern was clear: the sharing part isn't broken, the holding onto it part is. Existing platforms like Letterboxd and Goodreads solve cataloging but not the social handoff. Messaging apps solve the handoff but lose everything in the noise.",
    solution:
      "I designed Plug as a dedicated space for friend-to-friend recommendations across movies, music, and shows. Friends send each other recs directly into a personal queue — no scrolling back through chats to find what someone mentioned weeks ago. Each item shows who sent it, when, and a quick note on why. The interface keeps the social signal front and center: you're not browsing a catalog, you're working through what your people think is worth your time.",
    images: [],
  },
];
