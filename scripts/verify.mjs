import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const root=path.resolve('dist');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(root), html=files.filter(f=>f.endsWith('.html')),errors=[],titles=new Set(),descriptions=new Set();
let links=0,images=0,schemas=0;
const exists=url=>{const decoded=decodeURIComponent(url.split(/[?#]/)[0]);const target=path.join(root,decoded);return fs.existsSync(target)||fs.existsSync(path.join(target,'index.html'));};
for(const file of html){
 const $=load(fs.readFileSync(file,'utf8')),route='/'+path.relative(root,file).replaceAll('\\','/').replace(/index\.html$/,'');
 const title=$('title').text(),description=$('meta[name="description"]').attr('content');
 if(!title||titles.has(title))errors.push(`Missing/duplicate title: ${route}`);titles.add(title);
 if(!description||descriptions.has(description))errors.push(`Missing/duplicate description: ${route}`);descriptions.add(description);
 if($('h1').length!==1)errors.push(`Expected one H1: ${route}`);
 if(!$('link[rel="canonical"]').attr('href')?.startsWith('https://www.ignis-vortex.com/'))errors.push(`Canonical: ${route}`);
 $('a[href]').each((_,el)=>{const url=$(el).attr('href');if(url.startsWith('/')){links++;if(!exists(url))errors.push(`Broken link ${url} on ${route}`);}if(url==='#'||url==='')errors.push(`Empty link on ${route}`);if(url.startsWith('#')&&!$(url).length)errors.push(`Missing anchor ${url} on ${route}`);});
 $('img').each((_,el)=>{images++;const src=$(el).attr('src');if(!src||!exists(src))errors.push(`Image ${src} on ${route}`);if($(el).attr('alt')===undefined)errors.push(`Missing alt: ${route}`);if(!$(el).attr('width')||!$(el).attr('height'))errors.push(`Missing image dimensions: ${route}`);});
 $('script[type="application/ld+json"]').each((_,el)=>{schemas++;try{JSON.parse($(el).text())}catch{errors.push(`Invalid schema: ${route}`)}});
 const text=$('body').text();if(/lorem ipsum|7087115155|OPTIMUS ENVIROPRO|RYSA Infratech|Nat Smith|Northwest Registered/i.test(text))errors.push(`Unapproved content on ${route}`);
}
const forbidden=files.filter(f=>/\.docx$|\.pdf$|office address|llc certificate|engineering-hero\.png/i.test(f));if(forbidden.length)errors.push(`Source files published: ${forbidden.map(f=>path.basename(f)).join(', ')}`);
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');const sitemapRoutes=[...sitemap.matchAll(/<loc>https:\/\/www\.ignis-vortex\.com([^<]*)<\/loc>/g)].map(m=>m[1]);for(const r of sitemapRoutes)if(!exists(r))errors.push(`Broken sitemap route ${r}`);
if(sitemapRoutes.length!==html.length-1)errors.push('Sitemap page count mismatch');
const report={pages:html.length-1,custom404:true,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,internalLinks:links,imageReferences:images,schemaObjects:schemas,sitemapEntries:sitemapRoutes.length,sourceFilesExcluded:!forbidden.length,errors};
fs.mkdirSync('output/playwright',{recursive:true});fs.writeFileSync('output/playwright/static-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
