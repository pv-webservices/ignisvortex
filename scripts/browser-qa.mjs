import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.env.QA_BASE_URL||'http://localhost:4321';
const routes=[...fs.readFileSync('dist/sitemap.xml','utf8').matchAll(/<loc>https:\/\/www\.ignis-vortex\.com([^<]*)<\/loc>/g)].map(m=>m[1]);
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
async function revealAll(){
 for(const element of await page.locator('.reveal').all()){
  await element.scrollIntoViewIfNeeded();
  await page.waitForFunction(el=>el.classList.contains('in'),await element.elementHandle(),{timeout:5000});
 }
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all(Array.from(document.images).map(i=>i.decode().catch(()=>{})));scrollTo({top:0,behavior:'instant'});});
 await page.waitForTimeout(700);
}
const focusOnly=process.env.QA_FOCUS==='interactions';
const report=focusOnly?JSON.parse(fs.readFileSync('output/playwright/browser-verification.json','utf8')):{routes:routes.length,widths:[320,375,430,768,1024,1280,1440,1920],layoutChecks:0,overflow:[],imageFailures:[],consoleErrors:[],accessibility:[],interactions:{}};
report.interactions={};
page.on('pageerror',e=>report.consoleErrors.push(e.message));
page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text())});
for(const width of focusOnly?[]:report.widths){
 await page.setViewportSize({width,height:900});
 for(const route of routes){
  const res=await page.goto(base+route,{waitUntil:'load'});if(res.status()!==200)throw Error(`${route} returned ${res.status()}`);await page.evaluate(()=>document.fonts.ready);
  const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:Array.from(document.querySelectorAll('main *')).filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1)}).map(e=>({tag:e.tagName,class:e.className})).slice(0,5)}));
  report.layoutChecks++;if(state.scroll>width+1)report.overflow.push({route,width,...state});
  if(width===1440||width===375){
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all(Array.from(document.images).map(i=>i.decode().catch(()=>{})));});
   const broken=await page.evaluate(()=>Array.from(document.images).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));if(broken.length)report.imageFailures.push({route,width,broken});
  }
  if(width===1440){
   await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
   const axe=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   if(axe.violations.length)report.accessibility.push({route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  }
 }
 console.log(`Checked ${routes.length} pages at ${width}px`);
 fs.writeFileSync('output/playwright/browser-verification.json',JSON.stringify(report,null,2));
}
// Mobile dialog: focus stays inside, Escape restores the trigger.
await page.setViewportSize({width:375,height:900});await page.goto(base+'/');await page.getByRole('button',{name:'Open navigation'}).click();
report.interactions.mobileMenu=await page.locator('#mobile-menu').evaluate(d=>d.open);
for(let i=0;i<18;i++){await page.keyboard.press('Tab');const inside=await page.evaluate(()=>!!document.activeElement?.closest('#mobile-menu'));if(!inside)throw Error('Mobile menu focus escaped');}
await page.keyboard.press('Escape');report.interactions.menuEscape=await page.locator('.menu-toggle').evaluate(b=>b===document.activeElement&&b.getAttribute('aria-expanded')==='false');
// Desktop dropdown remains keyboard accessible.
await page.setViewportSize({width:1440,height:900});await page.goto(base+'/');await page.locator('.main-nav .nav-item').filter({has:page.getByRole('link',{name:'Services',exact:true})}).locator(':scope > a').focus();
report.interactions.keyboardDropdown=await page.getByRole('link',{name:'Fire Protection Engineering',exact:true}).first().isVisible();
// One frame for :focus-within styles to apply (synthetic keystrokes can otherwise land inside the same frame).
await page.waitForTimeout(50);await page.keyboard.press('Tab');report.interactions.dropdownTab=await page.evaluate(()=>document.activeElement?.closest('.mega')!==null);
// Native FAQ keyboard activation.
await page.goto(base+'/services/code-consulting/');const faq=page.locator('.faq-list summary').first();await faq.focus();await page.keyboard.press('Enter');report.interactions.faqKeyboard=await page.locator('.faq-list details').first().evaluate(d=>d.open);
// Draft form: invalid form stays invalid; valid data creates a visible draft, no network submit.
await page.goto(base+'/request-review/?service=Fire%20Protection%20Engineering');report.interactions.servicePrefill=await page.locator('#service').inputValue()==='Fire Protection Engineering';await page.getByRole('button',{name:'Prepare Email Enquiry'}).click();report.interactions.invalidForm=await page.locator('#name').evaluate(i=>!i.validity.valid)&&await page.locator('#draft-panel').isHidden();
await page.locator('#name').fill('Synthetic QA');await page.locator('#company').fill('QA Example');await page.locator('#email').fill('qa@example.com');await page.locator('#country').fill('India');await page.locator('#projectType').selectOption('Commercial');await page.locator('#message').fill('Synthetic project brief for local browser verification only.');await page.getByRole('button',{name:'Prepare Email Enquiry'}).click();report.interactions.emailDraft=await page.locator('#draft-panel').isVisible()&&(await page.locator('#open-email').getAttribute('href')).startsWith('mailto:waseem@ignisplanreview.com?');report.interactions.noFalseDelivery=(await page.locator('#form-status').textContent()).includes('nothing has been sent');
await page.locator('#message').fill('Updated synthetic project brief, used only for local verification.');report.interactions.draftInvalidation=await page.locator('#draft-panel').isHidden();await page.getByRole('button',{name:'Prepare Email Enquiry'}).click();report.interactions.updatedDraft=(await page.locator('#draft-text').inputValue()).includes('Updated synthetic project brief');
// Product/course CTA prefill.
for(const [interest,selected] of [['Product: Fire Alarm Systems','Product Enquiry'],['Training: CFPS','Training']]){await page.goto(base+'/contact/?service='+encodeURIComponent(interest));if(await page.locator('#service').inputValue()!==selected)throw Error('Enquiry prefill failed');}
report.interactions.categoryPrefill=true;
for(const route of ['contact','request-review']){await page.goto(base+'/'+route+'/');await page.getByRole('link',{name:'Go to the Enquiry Form',exact:true}).click();if(!page.url().endsWith('#enquiry-form'))throw Error('Form hero CTA failed');}
report.interactions.formHeroCTA=true;
// Videos are deferred, then load and play on intent.
await page.goto(base+'/resources/');report.interactions.videosDeferred=await page.locator('video source[src]').count()===0;
report.interactions.videos=[];
for(const id of ['fire-model','evacuation-model']){await page.locator(`[data-video-target="${id}"]`).click();await page.waitForFunction(id=>{const v=document.getElementById(id);return v.readyState>=2||v.error;},id,{timeout:20000});const state=await page.locator('#'+id).evaluate(v=>({id:v.id,ready:v.readyState,error:v.error?.message||null,duration:v.duration,playing:!v.paused}));report.interactions.videos.push(state);await page.locator('#'+id).evaluate(v=>v.pause());}
// Reduced motion, no JS, 404 and final screenshots.
await page.goto(base+'/');report.interactions.reducedMotion=await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches&&document.querySelectorAll('.reveal:not(.in)').length===0);
await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();await revealAll();report.interactions.scrollReveal=await page.locator('.reveal:not(.in)').count()===0;
await page.screenshot({path:'output/playwright/home-desktop.png',fullPage:true});
await page.setViewportSize({width:375,height:900});await page.reload();await revealAll();await page.screenshot({path:'output/playwright/home-mobile.png',fullPage:true});await page.screenshot({path:'output/playwright/home-mobile-viewport.png'});
await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/request-review/');await page.screenshot({path:'output/playwright/request-review-desktop.png',fullPage:true});await page.goto(base+'/services/fire-protection-engineering/');await page.screenshot({path:'output/playwright/service-desktop.png',fullPage:true});
const missing=await page.goto(base+'/not-a-real-route/');report.interactions.custom404=missing.status()===404&&(await page.locator('h1').textContent()).includes('back on plan');
const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});const plain=await noJS.newPage();await plain.goto(base+'/');report.interactions.noJSContent=await plain.locator('h1').isVisible()&&await plain.locator('.explorer-row').count()===9;await noJS.close();
await browser.close();
report.consoleErrors=[...new Set(report.consoleErrors)].filter(x=>!x.includes('404 (Not Found)'));
fs.writeFileSync('output/playwright/browser-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
const failed=report.overflow.length||report.imageFailures.length||report.consoleErrors.length||report.accessibility.length||Object.values(report.interactions).some(v=>v===false)||report.interactions.videos.some(v=>v.error||!v.playing);if(failed)process.exitCode=1;
