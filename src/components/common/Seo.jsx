import { Helmet } from "react-helmet-async";

const Seo = ({ title, description, path = "", image }) => {
  const fullTitle = `${title} | Insi Tours`;
  const url = `https://insitours.com${path}`;
  const ogImage = image || "https://insitours.com/assets/og-default.jpg";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph — controls how links look when shared on WhatsApp, Facebook, etc. */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default Seo;