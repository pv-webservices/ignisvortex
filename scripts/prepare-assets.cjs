const sharp = require('sharp');
const photos = {
 engineering:'1504307651254-35680f356dfd',
 plans:'1503387762-592deb58ef4e',
 structure:'1541888946425-d81bb19240f5',
 industrial:'1513828583688-c52646db42da',
 highrise:'1486406146926-c627a92ad1ab'
};
(async()=>{
 for(const [name,id] of Object.entries(photos)) {
  const response=await fetch(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=85`);
  if(!response.ok) throw Error(`${name}: ${response.status}`);
  const data=Buffer.from(await response.arrayBuffer());
  await sharp(data).resize({width:1400,withoutEnlargement:true}).webp({quality:82}).toFile(`public/assets/${name}.webp`);
  await sharp(data).resize({width:720,withoutEnlargement:true}).webp({quality:78}).toFile(`public/assets/${name}-small.webp`);
  console.log(name, (await sharp(data).metadata()).width);
 }
 // Logo variants: see scripts/prepare-logo.cjs. AI imagery: see scripts/images/.
 // A contact sheet for visual review; source images are unchanged.
 const thumbs=await Promise.all(Object.keys(photos).map(async(name)=>({input:await sharp(`public/assets/${name}.webp`).resize(400,260,{fit:'cover'}).toBuffer(),left:Object.keys(photos).indexOf(name)%3*400,top:Math.floor(Object.keys(photos).indexOf(name)/3)*260})));
 await sharp({create:{width:1200,height:520,channels:3,background:'#fff'}}).composite(thumbs).png().toFile('output/playwright/asset-review.png');
})().catch(e=>{console.error(e);process.exit(1)});
