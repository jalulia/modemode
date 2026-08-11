/* MODE MODE — shared page menu (bottom-left, anchored). Used by project.html and
   about.html. Collapsed: a small INDEX pill. Expanded: the homepage index — every
   project + About + the field map. mount({current}) where current is a project slug
   or 'about'. Populates from a built-in roster instantly, then refreshes live from
   Supabase (names / colours / any projects added or removed) — best-effort, read-only. */
(function(){
  const ROSTER=[
    {code:'P-05',slug:'65porter',name:'65 PORTER',core:[136,212,32]},
    {code:'P-06',slug:'selected-arcade',name:'SELECTED ARCADE',core:[249,249,11]},
    {code:'P-02',slug:'massive',name:'MASSIVE',core:[30,111,224]},
    {code:'P-03',slug:'gif',name:'GIF',core:[0,167,255]},
    {code:'P-04',slug:'nightmare-kart',name:'NIGHTMARE KART',core:[196,0,33]},
    {code:'P-01',slug:'eyeknow-manor',name:'EYEKNOW MANOR',core:[215,3,89]}
  ];
  const SB={ url:'https://vjvjparfulrtsxdslrpg.supabase.co',
    anon:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdmpwYXJmdWxydHN4ZHNscnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2ODM1ODIsImV4cCI6MjA5ODI1OTU4Mn0._A1WCuNyCtnJ2Y3U4iqWjvWQe2ANTA6i-sYfuhhcFq4' };
  let current=null, list=ROSTER.slice(), open=false, root=null, panel=null;
  const rgb=a=>Array.isArray(a)?'rgb('+a.map(n=>Math.round(+n||0)).join(',')+')':'#9a9a94';
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function style(){ if(document.getElementById('mmm-style'))return; const st=document.createElement('style'); st.id='mmm-style';
    st.textContent=
     '.mmm{position:fixed;left:16px;bottom:16px;z-index:70;font-family:var(--text,ui-monospace,monospace);}'
    +'.mmm-btn{display:inline-flex;align-items:center;gap:9px;background:var(--panel,#fff);border:1px solid var(--hair,rgba(18,16,12,.17));border-radius:7px;padding:8px 13px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--grey,#7E7D75);cursor:pointer;box-shadow:0 3px 16px rgba(18,16,12,.11);transition:color .15s;}'
    +'.mmm-btn:hover{color:var(--ink,#15140F);}'
    +'.mmm-btn .dot{width:7px;height:7px;border-radius:50%;background:var(--accent,#C40021);flex:none;}'
    +'.mmm-btn .car{margin-left:2px;transition:transform .2s;font-size:8px;color:var(--grey-2,#B6B5AD);}'
    +'.mmm.open .mmm-btn .car{transform:rotate(180deg);}'
    +'.mmm-panel{position:absolute;left:0;bottom:calc(100% + 9px);width:250px;max-height:70vh;overflow-y:auto;background:var(--panel,#fff);border:1px solid var(--hair,rgba(18,16,12,.17));border-radius:9px;padding:7px;box-shadow:0 16px 44px rgba(18,16,12,.20);opacity:0;transform:translateY(8px) scale(.99);transform-origin:left bottom;pointer-events:none;transition:opacity .2s,transform .2s;}'
    +'.mmm.open .mmm-panel{opacity:1;transform:none;pointer-events:auto;}'
    +'.mmm-h{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--grey-2,#B6B5AD);padding:6px 8px 9px;}'
    +'.mmm-row{display:flex;align-items:center;gap:10px;padding:7px 8px;border-radius:6px;cursor:pointer;color:var(--ink,#15140F);border:1px solid transparent;transition:background .14s,border-color .14s;}'
    +'.mmm-row:hover{background:rgba(18,16,12,.055);}'
    +'.mmm-row.cur{border-color:var(--hair,rgba(18,16,12,.17));background:rgba(18,16,12,.035);cursor:default;}'
    +'.mmm-dot{width:8px;height:8px;border-radius:50%;flex:none;}'
    +'.mmm-code{font-size:9px;letter-spacing:.12em;color:var(--grey,#7E7D75);min-width:30px;}'
    +'.mmm-name{font-size:11.5px;letter-spacing:.02em;}'
    +'.mmm-sep{height:1px;background:var(--hair-2,rgba(18,16,12,.08));margin:6px 5px;}'
    +'.mmm-alt{display:flex;align-items:center;gap:10px;padding:7px 8px;border-radius:6px;cursor:pointer;color:var(--grey,#7E7D75);font-size:10px;letter-spacing:.16em;text-transform:uppercase;transition:color .14s,background .14s;}'
    +'.mmm-alt:hover{color:var(--ink,#15140F);background:rgba(18,16,12,.055);}'
    +'.mmm-alt.cur{color:var(--accent,#C40021);cursor:default;}'
    +'.mmm-alt svg{display:block;opacity:.7;}';
    document.head.appendChild(st); }

  function go(url){ location.href=url; }
  function renderList(){ if(!panel)return;
    const rows=list.map(p=>{ const cur=current&&current===p.slug;
      return '<div class="mmm-row'+(cur?' cur':'')+'" data-slug="'+esc(p.slug)+'">'
        +'<span class="mmm-dot" style="background:'+rgb(p.core)+'"></span>'
        +'<span class="mmm-code">'+esc(p.code||'')+'</span>'
        +'<span class="mmm-name">'+esc(p.name||'')+'</span></div>'; }).join('');
    panel.innerHTML='<div class="mmm-h">Index / '+String(list.length).padStart(2,'0')+'</div>'+rows
      +'<div class="mmm-sep"></div>'
      +'<div class="mmm-alt'+(current==='about'?' cur':'')+'" data-nav="about">About the studio</div>'
      +'<div class="mmm-alt" data-nav="home"><svg viewBox="0 0 22 12" width="18" height="10" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="square"><path d="M20 6 H0 M5.5 0.5 L0 6 L5.5 11.5"/></svg>Field map</div>';
    panel.querySelectorAll('.mmm-row').forEach(r=>{ const s=r.getAttribute('data-slug');
      if(s!==current) r.addEventListener('click',()=>go('project.html?p='+encodeURIComponent(s))); });
    panel.querySelectorAll('.mmm-alt').forEach(a=>{ const n=a.getAttribute('data-nav');
      if(n==='about'&&current!=='about') a.addEventListener('click',()=>go('about.html'));
      if(n==='home') a.addEventListener('click',()=>go('index.html')); });
  }
  function setOpen(o){ open=o; if(root) root.classList.toggle('open',o); }
  function build(){ if(root)return; style();
    root=document.createElement('div'); root.className='mmm'; root.setAttribute('contenteditable','false');
    const btn=document.createElement('button'); btn.className='mmm-btn'; btn.setAttribute('aria-label','Open index');
    btn.innerHTML='<span class="dot"></span>Index<span class="car">▲</span>';
    panel=document.createElement('div'); panel.className='mmm-panel';
    root.appendChild(panel); root.appendChild(btn); document.body.appendChild(root);
    btn.addEventListener('click',e=>{ e.stopPropagation(); setOpen(!open); });
    document.addEventListener('click',e=>{ if(open && !root.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&open) setOpen(false); });
  }
  async function refresh(){
    try{ const r=await fetch(SB.url+'/rest/v1/projects?select=slug,data',
        { headers:{apikey:SB.anon,Authorization:'Bearer '+SB.anon}, cache:'no-cache' });
      if(!r.ok)return; const rows=await r.json();
      const by={}; rows.forEach(row=>{ const d=row&&row.data; if(!d||!d.code)return;
        if(String(d.code).toUpperCase()==='ABOUT'||d.code==='P-07')return;
        by[d.code]={ code:d.code, slug:row.slug||d.slug, name:d.name||d.code,
          core:(d.colors&&d.colors.core)||[150,150,150] }; });
      if(!Object.keys(by).length)return;
      const seen={}, merged=[];
      ROSTER.forEach(p=>{ if(by[p.code]){ merged.push(by[p.code]); seen[p.code]=1; } else { merged.push(p); seen[p.code]=1; } });
      Object.keys(by).forEach(code=>{ if(!seen[code]) merged.push(by[code]); });
      list=merged; renderList();
    }catch(e){ /* offline → built-in roster stands */ }
  }
  window.MMMenu={ mount(opts){ opts=opts||{}; current=opts.current||null; build(); renderList(); refresh(); },
                  open(){ setOpen(true); }, close(){ setOpen(false); } };
})();
