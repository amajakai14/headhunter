import { useRouter } from "next/router";
import en from "../data/translation/en";
import th from "../data/translation/th";

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "th" ? th : en;
  return { locale, t };
};
