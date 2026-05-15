(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();let E="",y=null,m={};function H(t,e){y=e,m=t,window.addEventListener("hashchange",$),$()}function p(t){t!==E&&(window.location.hash=t)}function $(){const t=window.location.hash.slice(1)||"home",[e,...n]=t.split("/"),a={};n.length>0&&(a.id=n.join("/")),E=t,y&&y(e,a);let i;m[e]?i=m[e]:m["chapter/:id"]&&e==="chapter"&&(i=m["chapter/:id"]),i?i(a):(console.warn(`Route not found: ${t}`),p("home"))}const k="nypd_theme";function x(){const t=localStorage.getItem(k),e=window.matchMedia("(prefers-color-scheme: dark)").matches;(t==="dark"||!t&&e)&&document.documentElement.classList.add("dark");const n=document.getElementById("theme-toggle");n&&n.addEventListener("click",B)}function B(){const t=document.documentElement.classList.toggle("dark");localStorage.setItem(k,t?"dark":"light")}const A="nypd_font_scale",L=.8,I=1.4,S=.1;function F(){const t=localStorage.getItem(A);let e=t?parseFloat(t):1;e=Math.max(L,Math.min(I,e)),C(e);const n=document.getElementById("font-decrease"),a=document.getElementById("font-increase");n&&n.addEventListener("click",()=>T(-S)),a&&a.addEventListener("click",()=>T(S))}function C(t){document.documentElement.style.setProperty("--font-scale",t.toString()),localStorage.setItem(A,t.toString())}function T(t){const e=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-scale"))||1,n=Math.max(L,Math.min(I,e+t));C(n)}const q="nypd_progress";function h(){const t=localStorage.getItem(q);if(t)try{return JSON.parse(t)}catch{}return{chapters:[],streak:0,totalStudyTimeSeconds:0}}function N(t){localStorage.setItem(q,JSON.stringify(t))}function P(t){return h().chapters.find(n=>n.chapterId===t)}function z(t){const e=h();let n=e.chapters.find(a=>a.chapterId===t);n?(n.status="completed",n.completedAt=new Date().toISOString()):(n={chapterId:t,status:"completed",questionsAnswered:0,timeSpentSeconds:0,completedAt:new Date().toISOString()},e.chapters.push(n)),N(e)}function _(){return h().streak}function O(){return h().totalStudyTimeSeconds}function Q(){return h().chapters.filter(e=>e.status==="completed").length}function Y(t){U(t),j(),R()}function U(t){const e=document.getElementById("nav-chapters");if(!e)return;const n=`
    <div class="nav-section-title">Chapters</div>
    ${t.map(a=>{var s;const i=P(a.id),o=(i==null?void 0:i.status)==="completed",c=((s=a.questions)==null?void 0:s.length)||0;return`
        <div class="nav-item" data-chapter="${a.id}">
          <span class="ch-check ${o?"done":""}">${o?"✓":"○"}</span>
          <span class="nav-num">${a.sectionNum}</span>
          <span class="nav-title">${a.title}</span>
          <span class="q-badge">${c}q</span>
        </div>
      `}).join("")}
  `;e.innerHTML=n,e.querySelectorAll(".nav-item").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-chapter");i&&(p(`chapter/${i}`),z(i),M(i))})})}function j(){const t=document.getElementById("nav-tools");if(!t)return;const e=[{id:"home",label:"Home",icon:"🏠"},{id:"cheatsheet",label:"Cheat Sheet",icon:"📋"},{id:"sergeant",label:"Sergeant Focus",icon:"👮"},{id:"flashcards",label:"Flashcards",icon:"🃏"},{id:"quiz",label:"Quick Quiz",icon:"⚡"},{id:"exam",label:"Practice Exam",icon:"📝"},{id:"weak",label:"Weak Areas",icon:"📊"}];t.innerHTML=`
    <div class="nav-section-title">Tools</div>
    ${e.map(n=>`
      <div class="nav-item" data-tool="${n.id}">
        <span class="nav-num">${n.icon}</span>
        <span class="nav-title">${n.label}</span>
      </div>
    `).join("")}
  `,t.querySelectorAll(".nav-item").forEach(n=>{n.addEventListener("click",()=>{const a=n.getAttribute("data-tool");a&&(p(a),M(a))})})}function M(t){document.querySelectorAll(".nav-item").forEach(e=>{const n=e.getAttribute("data-chapter"),a=e.getAttribute("data-tool");n===t||a===t?e.classList.add("active"):e.classList.remove("active")})}function R(){const t=document.getElementById("menu-toggle"),e=document.getElementById("sidebar");t&&e&&(t.addEventListener("click",()=>{e.classList.toggle("open")}),document.addEventListener("click",n=>{if(window.innerWidth<=768){const a=e.contains(n.target),i=t.contains(n.target);!a&&!i&&e.classList.remove("open")}}))}function K(){const t=document.getElementById("breadcrumbs");t&&t.addEventListener("click",e=>{const n=e.target;if(n.tagName==="SPAN"){const a=n.getAttribute("data-route");a&&p(a)}})}function l(t){const e=document.getElementById("breadcrumbs");e&&(e.innerHTML=t.map((n,a)=>n.route?`<span data-route="${n.route}">${n.label}</span>`:`<span>${n.label}</span>`).join(" / "))}function W(){l([{label:"Home"}]);const t=document.getElementById("content");if(!t)return;const e=_(),n=O(),a=Q(),i=28,o=Math.floor(n/3600),c=Math.floor(n%3600/60);t.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">🔥 ${e}</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">📚 ${a}/${i}</div>
        <div class="stat-label">Chapters Done</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">⏱️ ${o}h ${c}m</div>
        <div class="stat-label">Study Time</div>
      </div>
    </div>

    <h2>Quick Actions</h2>
    <div class="card" style="cursor: pointer;" data-navigate="quiz">
      <div class="card-header">⚡ Quick Quiz</div>
      <div class="card-body">10 random questions for fast practice</div>
    </div>

    <div class="card" style="cursor: pointer;" data-navigate="exam">
      <div class="card-header">📝 Practice Exam</div>
      <div class="card-body">Full 140-question timed exam</div>
    </div>

    <div class="card" style="cursor: pointer;" data-navigate="weak">
      <div class="card-header">📊 Weak Areas</div>
      <div class="card-body">Review chapters where you scored lowest</div>
    </div>

    <h2>Recent Activity</h2>
    <p style="opacity: 0.6; font-style: italic;">Start studying to see your activity here.</p>
  `,t.querySelectorAll(".card[data-navigate]").forEach(s=>{s.addEventListener("click",()=>{const d=s.getAttribute("data-navigate");d&&(window.location.hash=d)})})}function b(t){if(!t)return"";let e=t;return e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e=e.replace(/^### (.*$)/gim,"<h3>$1</h3>"),e=e.replace(/^## (.*$)/gim,"<h2>$1</h2>"),e=e.replace(/^# (.*$)/gim,"<h1>$1</h1>"),e=e.replace(/\*\*(.*?)\*\*/gim,"<strong>$1</strong>"),e=e.replace(/\*(.*?)\*/gim,"<em>$1</em>"),e=e.replace(/```([\s\S]*?)```/gim,"<pre><code>$1</code></pre>"),e=e.replace(/`(.*?)`/gim,"<code>$1</code>"),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/gim,'<a href="$2">$1</a>'),e=e.replace(/!\[([^\]]+)\]\(([^)]+)\)/gim,'<img src="$2" alt="$1" style="max-width: 100%;">'),e=e.replace(/^&gt; \*\*(Exam Alert):\*\* (.*$)/gim,'<div class="callout callout-exam"><div class="callout-title">$1</div><p>$2</p></div>'),e=e.replace(/^&gt; \*\*(Memory Aid):\*\* (.*$)/gim,'<div class="callout callout-memory"><div class="callout-title">$1</div><p>$2</p></div>'),e=e.replace(/^&gt; \*\*(Prior Test):\*\* (.*$)/gim,'<div class="callout callout-prior"><div class="callout-title">$1</div><p>$2</p></div>'),e=e.replace(/^&gt; \*\*(PG Conflict):\*\* (.*$)/gim,'<div class="callout callout-conflict"><div class="callout-title">$1</div><p>$2</p></div>'),e=e.replace(/^&gt; \*\*(See Also):\*\* (.*$)/gim,'<div class="callout callout-seealso"><div class="callout-title">$1</div><p>$2</p></div>'),e=e.replace(/^&gt; \*\*(Sergeant Focus):\*\* (.*$)/gim,'<div class="callout callout-sergeant"><div class="callout-title">$1</div><p>$2</p></div>'),e=e.replace(/^&gt; (.*$)/gim,"<blockquote>$1</blockquote>"),e=e.replace(/^\|(.+)\|/gim,"<tr><td>$1</td></tr>"),e=e.replace(/<tr><td>(.+)<\/td><\/tr>/gim,(n,a)=>`<tr>${a.split("|").map(o=>`<td>${o.trim()}</td>`).join("")}</tr>`),e=e.replace(/<tr>/gim,"<table><tr>"),e=e.replace(/<\/tr>/gim,"</tr></table>"),e=e.replace(/^- (.*$)/gim,"<li>$1</li>"),e=e.replace(/(<li>.*<\/li>)/gim,"<ul>$1</ul>"),e=e.replace(/\n\n/gim,"</p><p>"),e="<p>"+e+"</p>",e=e.replace(/<p><\/p>/gim,""),e=e.replace(/<p>(<h[123]>)/gim,"$1"),e=e.replace(/(<\/h[123]>)<\/p>/gim,"$1"),e=e.replace(/<p>(<ul>)/gim,"$1"),e=e.replace(/(<\/ul>)<\/p>/gim,"$1"),e=e.replace(/<p>(<table>)/gim,"$1"),e=e.replace(/(<\/table>)<\/p>/gim,"$1"),e=e.replace(/<p>(<pre>)/gim,"$1"),e=e.replace(/(<\/pre>)<\/p>/gim,"$1"),e=e.replace(/<p>(<div class="callout)/gim,"$1"),e=e.replace(/(<\/div>)<\/p>/gim,"$1"),e=e.replace(/&lt;details&gt;/gim,"<details>"),e=e.replace(/&lt;\/details&gt;/gim,"</details>"),e=e.replace(/&lt;summary&gt;(.*?)&lt;\/summary&gt;/gim,"<summary>$1</summary>"),e}let u="study";function D(t){const e=t==null?void 0:t.id;if(!e||!r.data){window.location.hash="home";return}const n=r.data.chapters.find(o=>o.id===e);if(!n){window.location.hash="home";return}l([{label:"Home",route:"home"},{label:`${n.sectionNum} — ${n.title}`}]);const a=document.getElementById("content");if(!a)return;a.innerHTML=`
    <h1>${n.sectionNum} — ${n.title}</h1>

    <div class="tab-bar">
      <div class="tab ${u==="study"?"active":""}" data-tab="study">Study</div>
      <div class="tab ${u==="quiz"?"active":""}" data-tab="quiz">Quiz</div>
      <div class="tab ${u==="terms"?"active":""}" data-tab="terms">Key Terms</div>
    </div>

    <div id="chapter-body" style="margin-top: 1.5rem;"></div>
  `,a.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{u=o.getAttribute("data-tab")||"study",D(t)})});const i=document.getElementById("chapter-body");if(i)switch(u){case"study":J(n,i);break;case"quiz":G(n,i);break;case"terms":V(n,i);break}}function J(t,e){e.innerHTML=b(t.readme);const n=t.sections.map(a=>b(a.content)).join('<hr style="margin: 2rem 0; border: none; border-top: var(--rule);">');e.innerHTML+=n}function G(t,e){if(!t.questions||t.questions.length===0){e.innerHTML="<p>No practice questions available for this chapter.</p>";return}e.innerHTML=`
    <h2>Chapter Quiz</h2>
    <p style="opacity: 0.6; margin-bottom: 1rem;">${t.questions.length} questions</p>
    <div id="quiz-container"></div>
  `;const n=document.getElementById("quiz-container");n&&(n.innerHTML="<p>Quiz functionality coming soon...</p>")}function V(t,e){e.innerHTML=`
    <h2>Key Terms</h2>
    ${b(t.keyTerms||"_No key terms for this chapter._")}
  `}function X(){l([{label:"Home",route:"home"},{label:"Quick Quiz"}]);const t=document.getElementById("content");t&&(t.innerHTML=`
    <h1>Quick Quiz</h1>
    <p>10 random questions for fast practice drill.</p>
    <div id="quiz-container">
      <p>Quiz functionality coming soon...</p>
    </div>
  `)}function Z(){l([{label:"Home",route:"home"},{label:"Practice Exam"}]);const t=document.getElementById("content");t&&(t.innerHTML=`
    <h1>Practice Exam</h1>
    <p>Full 140-question timed exam simulating test conditions.</p>
    <div id="exam-container">
      <p>Exam functionality coming soon...</p>
    </div>
  `)}function ee(){l([{label:"Home",route:"home"},{label:"Flashcards"}]);const t=document.getElementById("content");if(!t)return;t.innerHTML=`
    <h1>Flashcards</h1>
    <p>Leitner-style flashcards for spaced repetition learning.</p>
    <div class="flashcard">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="flashcard-label">Key Term</div>
          <div class="flashcard-text">Category I Vehicle</div>
        </div>
        <div class="flashcard-back">
          <div class="flashcard-label">Definition</div>
          <div class="flashcard-text">A vehicle owned or leased by the NYPD.</div>
        </div>
      </div>
    </div>
    <p style="text-align: center; opacity: 0.6; margin-top: 1rem;">Tap card to flip</p>
  `;const e=t.querySelector(".flashcard");e&&e.addEventListener("click",()=>{e.classList.toggle("flipped")})}function te(){l([{label:"Home",route:"home"},{label:"Cheat Sheet"}]);const t=document.getElementById("content");t&&(t.innerHTML=`
    <h1>Cheat Sheet</h1>
    <p>Quick reference for Sergeant Focus topics.</p>
    <div id="cheatsheet-container">
      <p>Cheat sheet content coming soon...</p>
    </div>
  `)}function ne(){l([{label:"Home",route:"home"},{label:"Sergeant Focus"}]);const t=document.getElementById("content");t&&(t.innerHTML=`
    <h1>Sergeant Focus</h1>
    <p>Supervisor-specific responsibilities across all chapters.</p>
    <div id="sergeant-container">
      <p>Sergeant Focus content coming soon...</p>
    </div>
  `)}function ae(){l([{label:"Home",route:"home"},{label:"Weak Areas"}]);const t=document.getElementById("content");t&&(t.innerHTML=`
    <h1>Weak Areas</h1>
    <p>Review chapters where you scored lowest.</p>
    <div id="weak-areas-container">
      <p>Weak areas analysis coming soon...</p>
    </div>
  `)}const ie={home:W,"chapter/:id":D,quiz:X,exam:Z,flashcards:ee,cheatsheet:te,sergeant:ne,weak:ae},r={currentRoute:"home",currentChapter:null,data:null};async function w(){if(console.log("Initializing NYPD Sergeant Study Guide..."),console.log("window.STUDY_DATA exists:",typeof window.STUDY_DATA<"u"),console.log("window.STUDY_DATA value:",window.STUDY_DATA),typeof window.STUDY_DATA<"u"&&window.STUDY_DATA&&window.STUDY_DATA.chapters)r.data=window.STUDY_DATA,console.log(`Loaded ${r.data.chapters.length} chapters from global`);else try{console.log("Fetching data.js...");const n=await(await fetch("/data.js")).text();console.log("data.js fetched, length:",n.length);const a="window.STUDY_DATA = ",i=n.indexOf(a);if(i===-1)throw new Error("Could not find window.STUDY_DATA prefix");let o=n.substring(i+a.length).trim(),c=0,s=!1,d=!1,v=-1;for(let g=0;g<o.length;g++){const f=o[g];if(d){d=!1;continue}if(f==="\\"){d=!0;continue}if(f==='"'&&!d){s=!s;continue}if(!s&&(f==="{"&&c++,f==="}"&&(c--,c===0))){v=g+1;break}}if(v===-1)throw new Error("Could not find matching closing brace");o=o.substring(0,v),console.log("JSON string length:",o.length),console.log("First 50 chars:",o.substring(0,50)),console.log("Last 50 chars:",o.substring(o.length-50)),r.data=JSON.parse(o),console.log(`Loaded ${r.data.chapters.length} chapters from fetch`)}catch(e){console.error("Failed to load study data:",e),document.getElementById("content").innerHTML=`<div class="error" style="padding:20px;color:red;">Failed to load study data: ${e}. Please refresh.</div>`;return}x(),F(),Y(r.data.chapters),K(),H(ie,(e,n)=>{r.currentRoute=e,r.currentChapter=(n==null?void 0:n.id)||null}),oe();const t=window.location.hash.slice(1)||"home";p(t),console.log("App initialized successfully")}function oe(){document.addEventListener("keydown",t=>{if((t.ctrlKey||t.metaKey)&&t.key==="k"){t.preventDefault();return}if(t.target.tagName!=="INPUT"&&/^[1-4]$/.test(t.key)){const e=new CustomEvent("quiz-keypress",{detail:{key:t.key}});document.dispatchEvent(e)}if(t.target.tagName!=="INPUT"&&(t.key==="n"||t.key==="p")){const e=new CustomEvent("nav-keypress",{detail:{key:t.key}});document.dispatchEvent(e)}})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w();
