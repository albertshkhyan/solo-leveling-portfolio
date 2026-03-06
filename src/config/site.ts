import cvPdf from '@/assets/cv/Albert_Shkhyan_Resume.pdf';

/**
 * Site-wide configuration for contact info and social links.
 * Replace placeholder values with real URLs before deployment.
 */
export const siteConfig = {
  contact: {
    email: 'alikshkhyan@gmai.com',
    phone: '+37441979360',
    location: 'Yerevan, Armenia',
  },
  cta: {
    cvUrl: cvPdf,
    hireMeHref: '#contact',
  },
  social: [
    { name: 'GitHub', href: 'https://github.com/albertshkhyan', isExternal: true },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/albert-shkhyan-a7b200199/', isExternal: true },
    { name: 'Email', href: 'mailto:alikshkhyan@gmai.com', isExternal: false },
  ],
} as const;
