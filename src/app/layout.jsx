import "./globals.css";
import "./invite.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { EVENT } from "@/constants/event";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const pageTitle = `${EVENT.organization} ${EVENT.title} | ${EVENT.church}`;
const pageDescription = `${EVENT.dateRangeShort}, ${EVENT.venue.name}. ${EVENT.message}`;
const socialImage = siteUrl ? `${siteUrl}${EVENT.assets.posterFront}` : undefined;

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: pageTitle,
    description: pageDescription,
    ...(siteUrl ? { url: "/" } : {}),
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              width: 1054,
              height: 1492,
              alt: `${EVENT.organization} ${EVENT.title} 초대 엽서`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#143e2e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 바로가기
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
