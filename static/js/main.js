const $ = (selector) => document.querySelector(selector);
let session = null;
let game = null;

const api = async (path, body = {}) => {
  const payload = { ...body };
  const sessionId = payload.session_id;
  delete payload.session_id;

  const url = sessionId ? `${path}?session_id=${encodeURIComponent(sessionId)}` : path;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.detail || 'Action unavailable');
  }

  return response.json();
};

const spells = [
  ['fire-spark', 'Fire Spark', 'BASIC', '20 DMG'],
  ['acid-shot', 'Acid Shot', 'BASIC', '20 DMG'],
  ['carbon-punch', 'Carbon Punch', 'BASIC', '20 DMG'],
  ['resonance-burst', 'Resonance Burst', 'MED', '30 DMG'],
  ['nucleophile-strike', 'Nucleophile Strike', 'MED', '30 DMG'],
  ['chiral-slash', 'Chiral Slash', 'MED', '30 DMG'],
  ['mechanism-storm', 'Mechanism Storm', 'STRONG', '45 DMG'],
  ['stereochemical-rift', 'Stereochemical Rift', 'STRONG', '45 DMG'],
  ['spectral-obliteration', 'Spectral Obliteration', 'STRONG', '45 DMG'],
];

const avatarPalette = {
  body: { arc: '#29556b', scholar: '#66528a' },
  skin: { warm: '#ffd4b2', deep: '#8e563f', gold: '#d8a25e' },
  hair: { nebula: '#6c3d79', copper: '#b7653f', silver: '#b8c8d2' },
  outfit: { coat: '#29556b', hoodie: '#493b78', shirt: '#245e62' },
  accessory: { goggles: '#36e5d0', gloves: '#ff9f5a', backpack: '#a67cff' },
};

function updateAvatarPreview() {
  const figure = $('.avatar-preview .avatar-orb');
  if (!figure) return;

  const values = Object.fromEntries(
    ['body', 'skin', 'hair', 'outfit', 'accessory'].map((id) => [id, $('#' + id)?.value || ''])
  );

  figure.className = 'avatar-figure large';
  figure.dataset.body = values.body;
  figure.dataset.outfit = values.outfit;
  figure.innerHTML = '<div class="avatar-aura"></div><div class="avatar-body"></div><div class="avatar-head"><div class="avatar-hair"></div></div><div class="avatar-accessory"></div>';

  Object.entries(values).forEach(([part, value]) => {
    figure.style.setProperty(`--avatar-${part}`, avatarPalette[part]?.[value] || '#ffffff');
  });

  let label = $('#avatar-preview-label');
  if (!label) {
    label = document.createElement('span');
    label.id = 'avatar-preview-label';
    figure.parentElement.append(label);
  }

  label.textContent = `${values.body.toUpperCase()} // ${values.outfit.toUpperCase()} // ${values.accessory.toUpperCase()}`;
}

function ensureExplanationUi() {
  const brand = $('.brand');
  if (!brand) return;

  let button = $('#view-explanation');
  if (!button) {
    button = document.createElement('button');
    button.id = 'view-explanation';
    button.className = 'header-help';
    button.textContent = 'VIEW EXPLANATION';
    brand.parentElement.insertBefore(button, brand.nextSibling);
  }

  let modal = $('#explanation-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'explanation-modal';
    modal.className = 'hidden';
    modal.innerHTML = `
      <div class="modal-card">
        <button id="close-explanation" class="modal-close" aria-label="Close explanation">×</button>
        <div class="eyebrow">ORGO // CONCEPT REVIEW</div>
        <h2 id="explanation-title">WHY THIS ANSWER?</h2>
        <p id="explanation-question" class="modal-question"></p>
        <div class="modal-answer">
          <span class="hint">CORRECT ANSWER</span>
          <strong id="explanation-answer"></strong>
        </div>
        <p id="explanation-copy"></p>
        <button id="modal-done" class="primary">BACK TO BATTLE</button>
      </div>
    `;
    $('#app').append(modal);
    $('#close-explanation').onclick = closeExplanation;
    $('#modal-done').onclick = closeExplanation;
    modal.onclick = (event) => {
      if (event.target === modal) closeExplanation();
    };
  }

  button.onclick = () => {
    if (window.lastExplanation) showExplanation(window.lastExplanation);
  };
}

function closeExplanation() {
  $('#explanation-modal')?.classList.add('hidden');
}

function showExplanation(result) {
  window.lastExplanation = result;
  ensureExplanationUi();
  $('#explanation-question').textContent = result.question_prompt || 'Review the chemistry concept from the last trial.';
  $('#explanation-answer').textContent = result.correct_answer;
  $('#explanation-copy').textContent = result.explanation;
  $('#explanation-modal').classList.remove('hidden');
}

function render(s) {
  session = s;
  const chapterLabel = $('#chapter-label');
  if (chapterLabel) chapterLabel.textContent = `CHAPTER ${s.chapter} / ${s.chapter_name}`;

  const avatarPanel = $('#avatar-panel');
  if (avatarPanel) {
    avatarPanel.innerHTML = `<div class="avatar-card"><div class="avatar-orb"></div><div><div class="avatar-name">FIELD ALCHEMIST</div><div class="avatar-sub">${s.player.hp} / ${s.player.max_hp} HP</div></div></div>`;
  }

  const log = $('#log');
  if (log) log.innerHTML = s.log.map((message) => `<div class="log-line">${message}</div>`).join('');

  renderSpells(s);
  renderQuestion(s);
  drawScene(s);
}

function renderSpells(s) {
  const spellsContainer = $('#spells');
  if (!spellsContainer) return;

  spellsContainer.innerHTML = `<div class="control-panel"><div class="control-title">ARSENAL // SELECT A SPELL</div><div class="spell-grid">${spells.map(([id, name, type, damage]) => {
    const cooldown = s.cooldowns?.[id] || 0;
    return `<button class="spell" data-spell="${id}" ${cooldown ? 'disabled' : ''}><div class="spell-name">${name}</div><div class="spell-meta">${type} · ${cooldown ? cooldown + 's' : damage}</div></button>`;
  }).join('')}</div></div>`;

  document.querySelectorAll('[data-spell]').forEach((button) => {
    button.onclick = async () => {
      try {
        render(await api('/api/battle/select-spell', { session_id: session.session_id, spell_id: button.dataset.spell }));
      } catch (error) {
        alert(error.message);
      }
    };
  });
}

function renderQuestion(s) {
  const container = $('#question');
  if (!container) return;

  const q = s.question;
  container.innerHTML = `<div class="control-panel">${q ? `<div class="control-title">VOCABULARY TRIAL // ONE ATTEMPT</div><div class="question">${q.prompt}</div><div class="answers">${q.choices.map((answer, index) => `<button class="answer" data-answer="${answer}"><span class="hint">${'ABCD'[index]}</span><br>${answer}</button>`).join('')}</div>` : `<div class="control-title">BATTLE STATUS</div><div class="question">${s.boss.name} awaits your next spell.</div><div class="hint">Choose a spell above to reveal a chemistry trial.</div>`}</div>`;

  document.querySelectorAll('[data-answer]').forEach((button) => {
    button.onclick = async () => {
      try {
        const result = await api('/api/battle/answer', { session_id: session.session_id, answer: button.dataset.answer });
        render(result);
        showOutcome(result);
      } catch (error) {
        alert(error.message);
      }
    };
  });
}

function showOutcome(r) {
  const msg = r.defeated
    ? `VICTORY — ${r.boss.name} defeated.`
    : r.defeat
      ? 'DEFEAT — retry to regroup.'
      : r.correct
        ? `DIRECT HIT — ${r.damage} damage. ${r.boss_hit ? 'Counterattack!' : 'Boss missed!'}`
        : `SPELL FIZZLE — correct answer: ${r.correct_answer}`;

  if (!r.correct && !r.defeated) {
    window.lastExplanation = r;
    ensureExplanationUi();
    const headerButton = $('#view-explanation');
    if (headerButton) {
      headerButton.textContent = 'EXPLANATION';
      headerButton.classList.add('available');
    }
    showExplanation(r);
    setTimeout(() => alert(msg + ' Review the explanation and try again.'), 200);
    return;
  }

  setTimeout(() => {
    if (r.defeat) {
      if (confirm(msg + ' Retry?')) {
        api('/api/battle/retry', { session_id: session.session_id }).then(render);
      }
    } else if (r.defeated) {
      if (confirm(msg + ' Continue to next node?')) {
        api('/api/battle/next-turn', { session_id: session.session_id }).then((nextState) => {
          if (nextState.victory) alert('SPECTRAL CHAMPION — all chapters complete!');
          render(nextState);
        });
      }
    } else {
      alert(msg);
    }
  }, 200);
}

function startPhaser() {
  if (game) return;

  game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 900,
    height: 520,
    backgroundColor: '#0b1e2c',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload() {
        this.load.image('arena', '/static/assets/battle-arena.png');
      },
      create() {
        this.arena = this.add.image(this.scale.width / 2, this.scale.height / 2, 'arena').setOrigin(0.5);
        this.resizeArena();
        this.scale.on('resize', () => this.resizeArena());
      },
      resizeArena() {
        if (!this.arena) return;
        this.arena.setPosition(this.scale.width / 2, this.scale.height / 2);
        this.arena.setDisplaySize(this.scale.width, this.scale.height);
      },
    },
  });
}

function drawScene(s) {
  if (!game?.scene?.scenes?.[0]) return;

  const scene = game.scene.scenes[0];
  const width = scene.scale.width;
  const height = scene.scale.height;
  scene.children.list.filter((x) => x.getData?.('dynamic')).forEach((x) => x.destroy());

  const chapterColor = Phaser.Display.Color.HexStringToColor(s.chapter_color).color;
  const boss = scene.add.container(width * 0.72, height * 0.42).setData('dynamic', true);
  const glow = scene.add.circle(0, 0, Math.min(105, width * 0.16), chapterColor, 0.12).setStrokeStyle(3, chapterColor, 0.8);
  boss.add([
    glow,
    scene.add.ellipse(0, 20, 150, 190, 0x182a42).setStrokeStyle(4, chapterColor),
    scene.add.circle(0, -18, 28, 0x07111c).setStrokeStyle(4, 0xff9f5a),
    scene.add.text(0, 130, s.boss.name, { fontFamily: 'Space Grotesk', fontSize: '20px', color: '#eaf7f5' }).setOrigin(0.5),
    scene.add.text(0, 158, `BOSS HP ${s.boss.hp} / ${s.boss.max_hp}`, { fontFamily: 'DM Mono', fontSize: '12px', color: '#ff9f5a' }).setOrigin(0.5),
  ]);
  scene.tweens.add({ targets: glow, scale: 1.15, alpha: 0.3, duration: 1200, yoyo: true, repeat: -1 });

  const avatar = s.avatar || {};
  const avatarColor = (part, fallback) => Phaser.Display.Color.HexStringToColor(avatarPalette[part]?.[avatar[part]] || fallback).color;

  const player = scene.add.container(width * 0.23, height * 0.62).setData('dynamic', true);
  const aura = scene.add.circle(0, 0, 64, avatarColor('accessory', '#36e5d0'), 0.12);
  const body = scene.add.ellipse(0, 25, 80, 120, avatarColor('outfit', '#29556b'));
  const head = scene.add.circle(0, -45, 34, avatarColor('skin', '#ffd4b2'));
  const hair = scene.add.arc(0, -55, 30, 200, 340, false, avatarColor('hair', '#6c3d79'));
  const accessory = scene.add.rectangle(0, -45, 52, 6, avatarColor('accessory', '#36e5d0'), 0.85);
  player.add([
    aura,
    body,
    head,
    hair,
    accessory,
    scene.add.text(0, 110, `YOU ${s.player.hp} HP`, { fontFamily: 'DM Mono', fontSize: '12px', color: '#36e5d0' }).setOrigin(0.5),
  ]);
}

function bindDomEvents() {
  ['body', 'skin', 'hair', 'outfit', 'accessory'].forEach((id) => {
    const element = $('#' + id);
    if (element) element.addEventListener('change', updateAvatarPreview);
  });

  const startButton = $('#start');
  if (startButton) {
    startButton.addEventListener('click', async () => {
      session = await api('/api/game/new', {});
      $('#boot')?.classList.add('hidden');
      $('#avatar-creator')?.classList.remove('hidden');
      updateAvatarPreview();
    });
  }

  const acceptButton = $('#accept-avatar');
  if (acceptButton) {
    acceptButton.addEventListener('click', async () => {
      const avatar = Object.fromEntries(['body', 'skin', 'hair', 'outfit', 'accessory'].map((id) => [id, $('#' + id).value]));
      avatar.aura = 'teal';
      session = await api('/api/avatar/finalize', { session_id: session.session_id, ...avatar });
      $('#avatar-creator')?.classList.add('hidden');
      $('#game-shell')?.classList.remove('hidden');
      startPhaser();
      render(session);
    });
  }

  ensureExplanationUi();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindDomEvents);
} else {
  bindDomEvents();
}
