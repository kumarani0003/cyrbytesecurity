'use strict';
(() => {
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const menu=$('#navigation'),toggle=$('.menu-toggle'),header=$('.header');
  function closeMenu(returnFocus=false){if(!menu||!toggle)return;menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');if(returnFocus)toggle.focus();}
  if(menu&&toggle){toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');if(open)menu.querySelector('a')?.focus();});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu(true)});document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu()});}
  function updateHeader(){header?.classList.toggle('scrolled',window.scrollY>30)}
  window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  $$('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  const videos=$$('video');const visible=new Set();
  function loadVideo(video){video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');});if(!video.currentSrc)video.load();}
  function playVisible(){videos.forEach(video=>{if(visible.has(video)&&!document.hidden&&!reduce.matches){loadVideo(video);video.play().catch(()=>{});}else video.pause();});}
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target)});playVisible();},{threshold:.08});videos.forEach(video=>observer.observe(video));}else{videos.forEach(video=>visible.add(video));playVisible();}
  document.addEventListener('visibilitychange',playVisible);reduce.addEventListener('change',playVisible);
  const brief=$('#brief-dialog'),form=$('#brief-form');
  if(!brief||!form)return;
  $$('[data-open-brief]').forEach(button=>button.addEventListener('click',()=>brief.showModal()));
  brief.querySelector('.dialog-close')?.addEventListener('click',()=>brief.close());
  brief.addEventListener('click',event=>{if(event.target!==brief)return;const rect=brief.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)brief.close();});
  function invalidateDraft(){$('#draft-tools').hidden=true;$('#send-email').removeAttribute('href');$('#email-draft').value='';$('#brief-status').textContent='';}
  form.addEventListener('input',invalidateDraft);form.addEventListener('change',invalidateDraft);
  form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject='Cyrbyte Security enquiry: '+data.get('service');const body=['CYRBYTE SECURITY | ENQUIRY','', 'Name: '+data.get('name'),'Organization: '+(data.get('company')||'Not specified'),'Website: '+(data.get('website')||'Not specified'),'Email: '+data.get('email'),'Area of interest: '+data.get('service'),'Priority: '+data.get('priority'),'','Brief:',data.get('message')].join('\n');$('#email-draft').value=body;$('#send-email').href='mailto:info@cyrbyte.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);$('#draft-tools').hidden=false;$('#brief-status').textContent='Your email draft is ready below. Review it before opening your email app.';$('#draft-tools').scrollIntoView({block:'nearest',behavior:reduce.matches?'instant':'smooth'});});
  $('#copy-email')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#email-draft').value);$('#brief-status').textContent='Brief copied. Paste it into your email app.';}catch{$('#email-draft').focus();$('#email-draft').select();$('#brief-status').textContent='Select and copy the brief below.';}});
})();
