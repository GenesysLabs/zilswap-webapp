import { NavigationOptions } from "./types";

const navigationConfig: NavigationOptions[] = [{
  pages: [{
    title: "Swap",
    href: "/swap",
  }, {
    title: "Pool",
    href: "/pool",
  }, {
    title: "About",
    href: "https://docs.zilswap.org/#/?id=introduction",
    external: true,
  }, {
    title: "Documentation",
    href: "https://docs.zilswap.org/#/smart-contract",
    external: true,
  }, {
    title: "API",
    href: "https://github.com/Switcheo/zilswap-sdk",
    external: true,
  }],
}];

export default navigationConfig;
