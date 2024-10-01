export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SaintStream",
  shortName: "SS",
  description: "Official Site: SaintStream",
  navItems: [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Discover",
      link: "/discover",
    },
    {
      name: "Movie Release",
      link: "/release",
    },
    {
      name: "Forum",
      link: "/forum",
    },
  ],
  links: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://www.twitter.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  },
  logo: {
    url: "/logo.png",
    alt: "SaintStream Red Logo",
  },
  communication: {
    address: "Kimara Temboni, Dar es Salaam 22220",
    email: "business@saintstream.com",
    phone: "(255) 712 288 231",
    pobox: "P.O.Box 222, Dar Es Salaam",
    website: "https://www.saintstream.com",
  },
};
