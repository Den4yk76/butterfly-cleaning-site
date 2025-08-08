export function localBusinessJsonLd(params: {
  name: string;
  telephone: string;
  url: string;
  areaServed: string[];
  sameAs?: string[];
  slogan?: string;
  priceRange?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: params.name,
    telephone: params.telephone,
    url: params.url,
    areaServed: params.areaServed,
    sameAs: params.sameAs,
    slogan: params.slogan,
    priceRange: params.priceRange,
    image: params.image,
  };
}

export function serviceJsonLd(params: {
  serviceType: string;
  areaServed?: string;
  providerName: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: params.serviceType,
    areaServed: params.areaServed,
    provider: { '@type': 'LocalBusiness', name: params.providerName },
    description: params.description,
  };
}

export function faqJsonLd(params: { qa: { q: string; a: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: params.qa.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
  };
}


