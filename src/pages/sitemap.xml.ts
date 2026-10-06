import type { APIRoute } from 'astro';
import {allRoutes,site} from '../data/site';
export const GET:APIRoute=()=>new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes.map(r=>`<url><loc>${site.domain}${r}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});
