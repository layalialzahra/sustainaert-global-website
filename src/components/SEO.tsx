import { Helmet } from 'react-helmet-async';

    interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    noIndex?: boolean;
    schemaJson?: string;
    datePublished?: string;
    dateModified?: string;
    }

    const BASE_URL = 'https://sustainacertglobal.com';
    const DEFAULT_OG_IMAGE = `${BASE_URL}/landscape-shot-green-hills-val-d-orcia-tuscany-italy-gloomy-sky.webp`;

    export default function SEO({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    noIndex = false,
    schemaJson,
    datePublished,
    dateModified,
    }: SEOProps) {
    const fullTitle =
      title === 'Sustainacert' || title === 'Global Standards. Trusted Certification'
        ? 'Sustainacert — ISO & Sustainability Certification Body | Dubai'
        : `${title} | Sustainacert`;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
    const image = ogImage || DEFAULT_OG_IMAGE;

    return (
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={`${title} | Sustainacert`} />
        <meta property="og:site_name" content="Sustainacert" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={`${title} | Sustainacert`} />

        {datePublished && <meta property="article:published_time" content={datePublished} />}
        {dateModified && <meta property="article:modified_time" content={dateModified} />}

        {schemaJson && (
          <script type="application/ld+json">{schemaJson}</script>
        )}
      </Helmet>
    );
    }
    