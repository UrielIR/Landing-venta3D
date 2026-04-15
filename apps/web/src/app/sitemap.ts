import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://teloimprimo.cl';
  
  const routes = [
    '',
    '/tienda',
    '/contacto',
    '/privacidad',
    '/cookies',
    '/terminos',
    '/accesibilidad',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
