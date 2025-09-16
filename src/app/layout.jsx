import "./globals.css";

// SEO Metadata
export const metadata = {
  title: {
    default: 'CureLogics - Digital Solutions Agency | Web Development & Design',
    template: '%s | CureLogics'
  },
  description: 'CureLogics is a leading digital solutions agency specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with our innovative solutions.',
  keywords: [
    'digital agency',
    'web development',
    'mobile app development',
    'UI UX design',
    'digital marketing',
    'software development',
    'CureLogics',
    'technology solutions'
  ],
  authors: [{ name: 'CureLogics Team' }],
  creator: 'CureLogics',
  publisher: 'CureLogics',
  metadataBase: new URL('https://curelogics.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://curelogics.com', // Replace with your actual domain
    siteName: 'CureLogics',
    title: 'CureLogics - Digital Solutions Agency',
    description: 'Transform your business with our innovative digital solutions. Expert web development, mobile apps, and digital marketing services.',
    images: [
      {
        url: '/images/og-image.jpg', // Add this image to your public/images folder
        width: 1200,
        height: 630,
        alt: 'CureLogics - Digital Solutions Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CureLogics - Digital Solutions Agency',
    description: 'Transform your business with our innovative digital solutions.',
    images: ['/images/twitter-image.jpg'], // Add this image to your public/images folder
    creator: '@curelogics', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
};

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CureLogics",
  "description": "Leading digital solutions agency specializing in web development, mobile apps, and digital marketing.",
  "url": "https://curelogics.com", // Replace with your actual domain
  "logo": "https://curelogics.com/images/fulllogo.png", // Replace with your actual domain
  "image": "https://curelogics.com/images/og-image.jpg", // Replace with your actual domain
  "telephone": "+1-XXX-XXX-XXXX", // Replace with your actual phone
  "email": "info@curelogics.com", // Replace with your actual email
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address", // Replace with actual address
    "addressLocality": "Your City",
    "addressRegion": "Your State",
    "postalCode": "Your ZIP",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.facebook.com/curelogics", // Replace with actual social links
    "https://www.twitter.com/curelogics",
    "https://www.linkedin.com/company/curelogics",
    "https://www.instagram.com/curelogics"
  ],
  "foundingDate": "2024", // Replace with actual founding date
  "numberOfEmployees": "10-50",
  "industry": "Software Development",
  "services": [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "Software Consulting"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/fulllogo.png"
          as="image"
          type="image/png"
        />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        
        {/* Performance Hints */}
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
      </head>
      
      <body className="antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        {/* Google Tag Manager (noscript) - Replace with your GTM ID */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        
        {/* Main Application */}
        <div id="root">
          {children}
        </div>
        
        {/* Google Tag Manager - Replace with your GTM ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </body>
    </html>
  );
}