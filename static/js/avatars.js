import { apprentice as polishedApprentice, mage as polishedMage, dragon as polishedDragon } from './avatar-art.js';

const AVATAR_STATES = new Set(['idle', 'enter', 'cast', 'attack', 'hit', 'critical-hit', 'miss', 'victory', 'defeated', 'level-up']);

export const DEFAULT_AVATAR_CONFIG = {
  baseCharacter: 'organic-apprentice',
  skinTone: 'medium',
  hair: { style: 'messy-short', color: 'dark-green' },
  glasses: 'round-green',
  coat: 'classic-white',
  shirt: 'forest-green',
  pants: 'dark-green',
  shoes: 'green-sneakers',
  satchel: 'chemist-brown',
  flask: 'green-reaction',
  accessory: 'benzene-pin',
  accentColor: 'emerald',
};

export const PLAYER_AVATAR_OPTIONS = {
  skinTones: ['light', 'light-medium', 'medium', 'medium-deep', 'deep'],
  hairStyles: ['messy-short', 'side-swept', 'spiky', 'curly', 'medium-layered'],
  hairColors: ['black', 'dark-green', 'brown', 'dark-purple', 'blue-black'],
  glasses: ['none', 'round-black', 'round-green', 'rectangular-black', 'thin-silver'],
  coats: ['classic-white', 'green-trim', 'blue-trim', 'advanced-chemist', 'reaction-coat'],
  shirts: ['forest-green', 'navy', 'black', 'purple', 'white'],
  pants: ['dark-green', 'charcoal', 'navy', 'black'],
  shoes: ['green-sneakers', 'black-sneakers', 'chemist-boots', 'reaction-boots'],
  satchels: ['chemist-brown', 'dark-lab-bag', 'reaction-pouch', 'advanced-alchemist-pack'],
  flasks: ['green-reaction', 'blue-catalyst', 'purple-reagent', 'orange-energy'],
  accessories: ['benzene-pin', 'periodic-table-badge', 'molecule-brooch', 'reaction-arrow-pin', 'chemist-gloves', 'wrist-device'],
  accents: ['emerald', 'azure', 'violet', 'amber', 'crimson'],
};

export function normalizeAvatarConfig(config = {}) {
  const merged = {
    ...DEFAULT_AVATAR_CONFIG,
    ...config,
    hair: { ...DEFAULT_AVATAR_CONFIG.hair, ...(config.hair || {}) },
  };
  const valid = (key, value, fallback) => PLAYER_AVATAR_OPTIONS[key]?.includes(value) ? value : fallback;
  merged.skinTone = valid('skinTones', merged.skinTone, DEFAULT_AVATAR_CONFIG.skinTone);
  merged.hair.style = valid('hairStyles', merged.hair.style, DEFAULT_AVATAR_CONFIG.hair.style);
  merged.hair.color = valid('hairColors', merged.hair.color, DEFAULT_AVATAR_CONFIG.hair.color);
  merged.glasses = valid('glasses', merged.glasses, DEFAULT_AVATAR_CONFIG.glasses);
  merged.coat = valid('coats', merged.coat, DEFAULT_AVATAR_CONFIG.coat);
  merged.shirt = valid('shirts', merged.shirt, DEFAULT_AVATAR_CONFIG.shirt);
  merged.pants = valid('pants', merged.pants, DEFAULT_AVATAR_CONFIG.pants);
  merged.shoes = valid('shoes', merged.shoes, DEFAULT_AVATAR_CONFIG.shoes);
  merged.satchel = valid('satchels', merged.satchel, DEFAULT_AVATAR_CONFIG.satchel);
  merged.flask = valid('flasks', merged.flask, DEFAULT_AVATAR_CONFIG.flask);
  merged.accessory = valid('accessories', merged.accessory, DEFAULT_AVATAR_CONFIG.accessory);
  merged.accentColor = valid('accents', merged.accentColor, DEFAULT_AVATAR_CONFIG.accentColor);
  merged.baseCharacter = 'organic-apprentice';
  return merged;
}

export const CHARACTERS = {
  'organic-apprentice': { name: 'Organic Apprentice', type: 'player', asset: '/static/assets/avatars/organic-apprentice.png' },
  'reaction-mage': { name: 'Reaction Mage', type: 'player', asset: '/static/assets/avatars/reaction-mage.png' },
  'carbonyl-dragon': { name: 'Carbonyl Dragon', type: 'boss', asset: '/static/assets/avatars/carbonyl-dragon.png' },
};

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

function apprentice() {
  return `<svg viewBox="0 0 400 500" role="img" aria-label="Organic Apprentice" class="avatar-svg">
    <defs><linearGradient id="coat" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7fff8"/><stop offset="1" stop-color="#b8d9d0"/></linearGradient><linearGradient id="flask" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b8fff1"/><stop offset="1" stop-color="#22cfae"/></linearGradient></defs>
    <g class="shadow"><ellipse cx="200" cy="466" rx="112" ry="18" fill="#06131d" opacity=".7"/></g>
    <g class="legs"><path d="M151 365v73h39l10-73zm61 0 9 73h39v-73z" fill="#182b40" stroke="#081723" stroke-width="7"/><path d="M139 432h57l-8 27h-70q-4-17 21-27zm70 0h56q22 8 29 27h-82z" fill="#43a59d" stroke="#081723" stroke-width="7"/></g>
    <g class="torso"><path d="M128 205q72-35 144 0l30 167q-102 37-204 0z" fill="url(#coat)" stroke="#112b3a" stroke-width="8"/><path d="M170 211h60l-10 118h-40z" fill="#24766d"/><path d="m173 215 27 35 27-35" fill="none" stroke="#9cfff0" stroke-width="6"/></g>
    <g class="satchel"><path d="m99 244q-44 45-24 137l57-14-18-132z" fill="#a86a42" stroke="#372839" stroke-width="8"/><path d="m82 285 51-13" stroke="#f4ba69" stroke-width="8"/></g>
    <g class="head"><path d="M137 120q3-70 64-76 65 7 65 79v62q-11 54-65 55-55-2-64-55z" fill="#f1b788" stroke="#112b3a" stroke-width="8"/><path d="M137 127q-8-82 68-91 70 15 66 91l-30-36-20 23-32-23-25 29z" fill="#203d35" stroke="#112b3a" stroke-width="8"/><path d="M169 167q30 18 60 0" fill="none" stroke="#7b3e46" stroke-width="6" stroke-linecap="round"/><circle cx="174" cy="150" r="5" fill="#112b3a"/><circle cx="226" cy="150" r="5" fill="#112b3a"/></g>
    <g class="glasses" fill="none" stroke="#39e6d0" stroke-width="7"><circle cx="173" cy="148" r="24"/><circle cx="227" cy="148" r="24"/><path d="M197 148h6m-57-2-18-8m96 8 18-8"/></g>
    <g class="left-arm"><path d="m138 226-46 91q-8 21 13 28 17 6 27-14l46-76z" fill="url(#coat)" stroke="#112b3a" stroke-width="8"/></g>
    <g class="right-arm"><path d="m260 226 55 83q11 21-9 32-16 8-29-12l-51-72z" fill="url(#coat)" stroke="#112b3a" stroke-width="8"/></g>
    <g class="flask"><path d="M282 293h25v34l31 61q9 21-12 29h-64q-21-8-12-29l32-61z" fill="#d8fff7" fill-opacity=".85" stroke="#42e5cc" stroke-width="7"/><path class="flask-liquid" d="m261 374h67l10 22q3 10-12 14h-64q-15-4-11-14z" fill="url(#flask)"/><path class="flask-bubbles" d="M277 368q8-12 16 0m10-13q7-12 14 0" fill="none" stroke="#eaffff" stroke-width="5" stroke-linecap="round"/></g>
    <g class="magic-glow"><circle cx="296" cy="390" r="65" fill="none" stroke="#36e5d0" stroke-width="3" opacity=".35"/><circle cx="326" cy="334" r="6" fill="#a8fff1"/><circle cx="245" cy="300" r="5" fill="#36e5d0"/></g>
  </svg>`;
}

function mage() {
  return `<svg viewBox="0 0 400 500" role="img" aria-label="Reaction Mage" class="avatar-svg"><defs><linearGradient id="robe" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#30234f"/><stop offset="1" stop-color="#100e29"/></linearGradient></defs><g class="shadow"><ellipse cx="200" cy="466" rx="120" ry="17" fill="#06131d" opacity=".75"/></g><g class="legs"><path d="m145 425-25 37h78l-5-37zm82 0-5 37h78l-25-37z" fill="#17132c" stroke="#0b0b1b" stroke-width="8"/></g><g class="robe"><path d="M145 210q55-37 110 0l70 221q-125 37-250 0z" fill="url(#robe)" stroke="#a67cff" stroke-width="8"/><path d="M150 274h100M138 348h124" stroke="#d8bbff" stroke-width="5" opacity=".8"/><path d="M180 236l20 20 20-20v76h-40z" fill="#7d49bd"/></g><g class="head"><path d="M145 105q8-65 55-65t55 65v82q-11 45-55 45t-55-45z" fill="#d99b78" stroke="#0f1023" stroke-width="8"/><path d="M142 113q-1-80 61-85 66 11 56 88l-32-46-22 25-28-19-28 38z" fill="#19142f" stroke="#0f1023" stroke-width="8"/><path d="M176 166q24 13 48 0" fill="none" stroke="#743c65" stroke-width="6"/><circle cx="173" cy="145" r="5"/><circle cx="227" cy="145" r="5"/></g><g class="left-arm"><path d="m148 235-67 63q-13 15 2 28 14 11 30-3l74-55z" fill="#30234f" stroke="#a67cff" stroke-width="8"/></g><g class="right-arm"><path d="m252 235 59 23 33-71" fill="none" stroke="#30234f" stroke-width="31" stroke-linecap="round"/><path d="M344 185V80" stroke="#d8bbff" stroke-width="8"/><path d="m323 102 21-34 21 34" fill="none" stroke="#a67cff" stroke-width="7"/></g><g class="belt"><path d="M137 303h126" stroke="#d8bbff" stroke-width="10"/><circle cx="200" cy="303" r="13" fill="#ffb85c"/></g><g class="reaction-flame"><path d="M200 225q-28 27 0 54 28-27 0-54z" fill="#db65ff" stroke="#f3c5ff" stroke-width="4"/><circle cx="200" cy="250" r="55" fill="none" stroke="#a67cff" stroke-width="3" opacity=".5"/></g><g class="molecule-ring" fill="none" stroke="#d8bbff" stroke-width="4"><path d="m80 130 25-15 25 15v30l-25 15-25-15zM270 102l22-13 22 13v26l-22 13-22-13z"/><path d="M130 145h140M105 160l95 90m95-120-95 120"/></g><g class="particles" fill="#f3c5ff"><circle cx="74" cy="245" r="6"/><circle cx="316" cy="314" r="5"/><circle cx="290" cy="55" r="4"/></g></svg>`;
}

function dragon() {
  return `<svg viewBox="0 0 520 500" role="img" aria-label="Carbonyl Dragon" class="avatar-svg"><defs><linearGradient id="scale" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#34404d"/><stop offset="1" stop-color="#111824"/></linearGradient><radialGradient id="fire"><stop stop-color="#fff4a6"/><stop offset=".45" stop-color="#ff9f43"/><stop offset="1" stop-color="#e74235" stop-opacity="0"/></radialGradient></defs><g class="shadow"><ellipse cx="270" cy="463" rx="190" ry="22" fill="#050a12" opacity=".8"/></g><g class="left-wing"><path d="M184 210 35 62 68 238 18 315l178-53z" fill="#6e223a" stroke="#101522" stroke-width="11"/><path d="m63 104 99 135M53 276l112-25" stroke="#df604c" stroke-width="5" opacity=".75"/></g><g class="right-wing"><path d="M328 205 484 54l-35 184 53 77-181-51z" fill="#6e223a" stroke="#101522" stroke-width="11"/><path d="m458 96-103 141m112 38-118-24" stroke="#df604c" stroke-width="5" opacity=".75"/></g><g class="body"><path d="M163 216q47-54 132-6l62 172q-91 57-202 0z" fill="url(#scale)" stroke="#101522" stroke-width="11"/><path d="M212 228q52-25 92 2l18 119q-52 27-104 0z" fill="#4f2637" opacity=".9"/><path d="M222 257h73M216 292h87M223 327h73" stroke="#db7d55" stroke-width="6" opacity=".7"/></g><g class="neck"><path d="M188 226q-25-70 25-128h95q51 58 20 128z" fill="url(#scale)" stroke="#101522" stroke-width="11"/></g><g class="head"><path d="M171 97q11-66 83-72 80 10 94 72v84q-20 48-94 52-74-4-83-52z" fill="url(#scale)" stroke="#101522" stroke-width="11"/><path d="m180 100-38-55 62 28m118 27 40-55-66 28" fill="#273441" stroke="#101522" stroke-width="11"/><path class="upper-jaw" d="m185 156q71-28 145 0l-30 45h-88z" fill="#202936" stroke="#101522" stroke-width="8"/><path class="lower-jaw" d="m211 197h95l-25 28h-47z" fill="#131a26" stroke="#101522" stroke-width="8"/><circle cx="215" cy="124" r="11" fill="#ff5543"/><circle cx="304" cy="124" r="11" fill="#ff5543"/></g><g class="front-legs"><path d="m184 315-49 103q-9 23 15 29 19 4 28-18l55-91m108-23 50 103q9 23-15 29-19 4-28-18l-55-91" fill="none" stroke="#273441" stroke-width="35" stroke-linecap="round"/></g><g class="tail"><path d="M340 360q104 38 137 1 25-28 20 43-31 55-168 19" fill="none" stroke="#202936" stroke-width="35" stroke-linecap="round"/></g><g class="carbonyl-markings" fill="none" stroke="#ffb45b" stroke-width="6"><circle cx="241" cy="287" r="24"/><circle cx="296" cy="287" r="24"/><path d="M265 287h7M241 263v-17m55 17v-17"/><text x="225" y="295" fill="#ffcf7c" stroke="none" font-size="18" font-family="monospace">O=C</text></g><g class="mouth-glow"><ellipse cx="257" cy="195" rx="45" ry="22" fill="url(#fire)"/></g><g class="fire"><path d="M255 198q-30 56 14 98 46-39 8-97z" fill="#ff6a3d" stroke="#ffc36b" stroke-width="5"/></g></svg>`;
}

const artwork = { 'organic-apprentice': polishedApprentice, 'reaction-mage': polishedMage, 'carbonyl-dragon': polishedDragon };

function apprenticeVariantLayers(config) {
  return `<g class="hair-variant hair-side-swept" fill="#193d2d" stroke="#102d35" stroke-width="7"><path d="M105 102Q83 52 121 26l42 8q36-20 62 17l-30 6-24 26-28-18z" stroke-linejoin="round"/><path d="M113 57q23-22 47-14m14-10q27 1 44 21" fill="none" stroke="#3b7250" stroke-width="6" stroke-linecap="round"/></g><g class="hair-variant hair-spiky" fill="#193d2d" stroke="#102d35" stroke-width="7"><path d="M104 105 91 45l32 16 9-37 25 28 28-35 10 37 34-18-18 70-30-32-23 22-27-18z" stroke-linejoin="round"/></g><g class="hair-variant hair-curly" fill="#193d2d" stroke="#102d35" stroke-width="7"><path d="M105 105q-28-40 11-69 9-27 35-13 29-22 43 9 36-3 40 35l-25 31-18-28-24 20-24-20-20 35z" stroke-linejoin="round"/><path d="M120 53q12-20 27-12m17-9q20-8 28 13m7 1q18-2 22 15" fill="none" stroke="#3b7250" stroke-width="6" stroke-linecap="round"/></g><g class="hair-variant hair-medium-layered" fill="#193d2d" stroke="#102d35" stroke-width="7"><path d="M105 104q-15-48 19-72 31-22 63-3 34 21 22 75l-31-31-25 19-28-18z" stroke-linejoin="round"/><path d="M119 49q20-20 40-13m12-8q25 2 35 21" fill="none" stroke="#3b7250" stroke-width="6" stroke-linecap="round"/></g><g class="accessory-layer"><path class="accessory-benzene-pin" d="m191 215 8-5 8 5v9l-8 5-8-5z" fill="none" stroke="#67e7bf" stroke-width="3"/><path class="accessory-periodic-table-badge" d="M190 209h18v18h-18z" fill="#4aa6d4" stroke="#dffcff" stroke-width="3"/><path class="accessory-molecule-brooch" d="m190 218 7-7 8 7-8 8z" fill="none" stroke="#d8a6ff" stroke-width="3"/><path class="accessory-reaction-arrow-pin" d="M188 221h20m-6-6 6 6-6 6" fill="none" stroke="#ffb65c" stroke-width="3"/><path class="accessory-chemist-gloves" d="m190 210 8 6-3 13-8-5z" fill="#c9f5e7" stroke="#102d35" stroke-width="3"/><path class="accessory-wrist-device" d="M238 276h17v13h-17z" fill="#5b6cff" stroke="#d4d9ff" stroke-width="3"/></g>`;
}

export function Avatar({ character = 'organic-apprentice', state = 'idle', size = 'large', direction = 'right', className = '', label = '', config = null } = {}) {
  const safeCharacter = CHARACTERS[character] ? character : 'organic-apprentice';
  const safeState = AVATAR_STATES.has(state) ? state : 'idle';
  const safeConfig = normalizeAvatarConfig(config || {});
  const node = document.createElement('div');
  node.className = `avatar ${safeCharacter} avatar-${size} state-${safeState} skin-${safeConfig.skinTone} hair-style-${safeConfig.hair.style} hair-color-${safeConfig.hair.color} glasses-${safeConfig.glasses} coat-${safeConfig.coat} shirt-${safeConfig.shirt} pants-${safeConfig.pants} shoes-${safeConfig.shoes} satchel-${safeConfig.satchel} flask-${safeConfig.flask} accessory-${safeConfig.accessory} accent-${safeConfig.accentColor} ${direction === 'left' ? 'face-left' : ''} ${className}`.trim();
  node.dataset.character = safeCharacter;
  node.dataset.state = safeState;
  node.dataset.avatarConfig = JSON.stringify(safeConfig);
  node.setAttribute('aria-label', label || CHARACTERS[safeCharacter].name);
  node.innerHTML = `<div class="avatar-art-frame"><img class="avatar-art" src="${CHARACTERS[safeCharacter].asset}" alt="${CHARACTERS[safeCharacter].name}" decoding="async" draggable="false"><span class="avatar-fallback" aria-hidden="true">${CHARACTERS[safeCharacter].name}</span></div><div class="avatar-effects" aria-hidden="true"><span class="effect-aura"></span><span class="effect-spark spark-one"></span><span class="effect-spark spark-two"></span><span class="effect-accessory">${safeConfig.accessory === 'benzene-pin' ? '⌬' : safeConfig.accessory === 'periodic-table-badge' ? 'C' : safeConfig.accessory === 'molecule-brooch' ? '⌘' : safeConfig.accessory === 'reaction-arrow-pin' ? '↗' : safeConfig.accessory === 'chemist-gloves' ? '✦' : '◈'}</span></div>`;
  const image = node.querySelector('.avatar-art');
  image.addEventListener('error', () => {
    if (image.dataset.fallback) return;
    image.dataset.fallback = 'true';
    image.src = CHARACTERS['organic-apprentice'].asset;
    node.classList.add('avatar-asset-fallback');
  });
  return node;
}

export function setAvatarState(node, state) {
  if (!node) return;
  const next = AVATAR_STATES.has(state) ? state : 'idle';
  node.className = node.className.replace(/state-[\w-]+/, `state-${next}`);
  node.dataset.state = next;
}

export function createAvatarStage() {
  const stage = document.createElement('div');
  stage.className = 'avatar-stage';
  stage.setAttribute('aria-label', 'Battle avatars');
  return stage;
}
