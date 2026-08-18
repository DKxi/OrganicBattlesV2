# Organic Battles V2 — High-Quality SVG Avatar Upgrade

> Codex-ready implementation prompt for upgrading the Organic Battles V2 avatar system.

You are a senior browser-game engineer, SVG illustrator, frontend animation engineer, and UI developer working on the existing **Organic Battles V2** codebase.

Your assignment is to significantly improve the game's player and boss avatars while preserving the existing Organic Battles gameplay, educational content, battle rules, screens, progression, chemistry theme, and application architecture.

Do **not** rewrite the game from scratch.

Start by inspecting the entire repository and understanding how the current application works.

The avatar upgrade must integrate directly into the existing Organic Battles V2 application.

---

## PRIMARY OBJECTIVE

Replace simplistic, low-resolution, static, or placeholder character artwork with a reusable **SVG-based animated avatar system** suitable for a polished browser RPG.

The target visual direction is:

**Prodigy-style educational RPG + fantasy chemistry + clean modern browser-game graphics.**

The initial characters to implement are:

1. Organic Apprentice
2. Reaction Mage
3. Carbonyl Dragon

These three characters establish the avatar architecture that should later support all players, bosses, spells, equipment, skins, and character levels.

The characters should look substantially better than avatars made from simple CSS circles and rectangles.

However, they should remain lightweight enough for browser gameplay.

---

## CRITICAL RULE: PRESERVE ORGANIC BATTLES V2

Before modifying anything, inspect:

- package configuration
- frontend framework
- Python backend if present
- routing
- battle engine
- player state
- boss state
- spell system
- question system
- chapter progression
- health calculations
- damage calculations
- animations already present
- CSS
- image assets
- sound assets
- responsive layouts
- existing API contracts

Do not break existing functionality.

The avatar upgrade should be implemented as an isolated presentation/component layer wherever possible.

Do not change educational questions or answers.

Do not change damage formulas unless absolutely required for integration.

Do not change boss statistics.

Do not change chapter progression.

Do not remove existing features.

Do not replace the current application architecture unnecessarily.

Use the existing frontend framework rather than introducing a new frontend framework just for avatars.

---

## TECHNOLOGY DIRECTION

Use:

**SVG = character artwork**

**CSS = animation, transitions, glow, movement and battle effects**

**JavaScript/TypeScript = character states and animation orchestration**

Use the application's existing framework for components.

For example:

If the existing frontend uses React, implement React components.

If it uses Next.js, follow the existing Next.js architecture.

If it uses another browser framework, implement the equivalent architecture within that framework.

Do not introduce a heavy game engine merely to display avatars.

Do not require users to install anything locally.

Everything must continue to run in a standard modern browser.

---

## DO NOT DRAW DETAILED CHARACTERS WITH PURE CSS

Do not attempt to construct these characters from dozens of CSS:

- circles
- rectangles
- border-radius shapes
- pseudo-elements

CSS should control animation and effects.

SVG should define character artwork.

The actual character should consist of vector paths and SVG groups.

---

## SVG CHARACTER ARCHITECTURE

Characters must be built from logical SVG groups.

Example:

```svg
<svg viewBox="0 0 400 500"
     class="game-avatar organic-apprentice">

  <g class="shadow">...</g>
  <g class="legs">...</g>
  <g class="body">...</g>
  <g class="coat">...</g>
  <g class="head">...</g>
  <g class="hair">...</g>
  <g class="eyes">...</g>
  <g class="glasses">...</g>
  <g class="left-arm">...</g>
  <g class="right-arm">...</g>
  <g class="flask">...</g>
  <g class="magic-effects">...</g>

</svg>
```

The exact groups will vary by character.

Use meaningful CSS class names.

Do not generate one enormous anonymous SVG path for the entire character if doing so prevents animation.

---

## CREATE AN AVATAR COMPONENT SYSTEM

Create a reusable avatar API.

A React-style example would be:

```jsx
<Avatar
    character="organic-apprentice"
    state="idle"
    size="large"
/>
```

Boss example:

```jsx
<Avatar
    character="carbonyl-dragon"
    state={bossState}
    size="boss"
/>
```

Support properties equivalent to:

```text
character
state
size
direction
className
level
variant
disabled
```

Do not add properties that provide no practical value.

---

## STANDARD CHARACTER STATES

The avatar engine should support these states:

```text
idle
enter
cast
attack
hit
critical-hit
miss
victory
defeated
level-up
```

Not every character needs a unique implementation immediately for every state, but the architecture must support them.

---

## STATE-DRIVEN ANIMATION

Do not scatter animation commands throughout game logic.

Battle logic should set semantic state.

Example:

```javascript
setPlayerState("cast");
```

The avatar component and CSS should determine how `"cast"` looks.

Likewise:

```javascript
setBossState("hit");
```

should trigger the boss hit animation.

Keep gameplay state separate from presentation animation.

---

## ORGANIC APPRENTICE

Create the first player avatar.

### Visual personality

- Young chemistry apprentice
- Friendly
- Curious
- Energetic
- Approachable
- Suitable for middle-school/high-school educational gameplay
- Not photorealistic
- Not childish preschool artwork
- Clean fantasy RPG character style

### Appearance

- messy dark green or dark brown hair
- round chemistry-style safety glasses
- white laboratory coat
- green shirt or vest
- dark pants
- sneakers or practical boots
- shoulder chemistry satchel
- glowing Erlenmeyer flask
- small chemistry accessories
- green magical reaction glow

Character silhouette must remain readable at approximately 180–300 pixels tall.

### Suggested SVG groups

```text
shadow
legs
shoes
torso
shirt
lab-coat
satchel
head
hair
eyes
glasses
left-arm
right-arm
flask
flask-liquid
flask-bubbles
magic-glow
```

### Idle behavior

Very subtle breathing.

Small flask bubbles.

Occasional tiny green magical particle.

Do not make the entire character bounce continuously.

### Cast behavior

Raise flask.

Flask glows.

Reaction bubbles increase.

Magic energy appears.

Spell projectile launches toward enemy.

### Victory behavior

Small celebratory flask raise.

---

## REACTION MAGE

Create the second major player/progression avatar.

### Visual personality

Powerful reaction specialist.

More advanced than Organic Apprentice.

Fantasy mage mixed with an organic chemistry scientist.

### Appearance

- dark purple/black robe
- purple trim
- chemistry symbols embroidered into clothing
- reagent bottles attached to belt
- glowing purple reaction energy
- optional chemistry staff or catalyst focus
- floating molecular structures
- confident stance

### Suggested SVG groups

```text
shadow
boots
legs
torso
robe
cloak
belt
reagent-bottles
head
hair
eyes
left-arm
right-arm
reaction-flame
molecule-ring
molecule-1
molecule-2
molecule-3
particles
```

### Idle behavior

Cloak moves slightly.

Reaction energy pulses.

Molecular symbols orbit extremely slowly.

### Cast behavior

Hand moves outward.

Reaction energy intensifies.

Molecular components converge.

Spell launches.

### Critical-hit behavior

Reaction effect becomes significantly larger for a short duration.

---

## CARBONYL DRAGON

Create the first high-quality boss implementation.

The dragon must visually communicate the chemistry concept of a **carbonyl group** without looking like a chemistry diagram pasted on top of a dragon.

### Appearance

- dark charcoal scales
- deep red wing membranes
- red/orange glowing eyes
- orange-red internal fire glow
- armored dragon silhouette
- subtle O=C chemistry motif
- carbonyl-inspired symbols incorporated into armor or wing patterns
- strong boss silhouette

Do not use recognizable copyrighted dragon characters.

Create an original Organic Battles design.

### Suggested SVG groups

```text
shadow
body
chest
neck
head
upper-jaw
lower-jaw
horns
eye
left-wing
right-wing
front-leg-left
front-leg-right
rear-legs
tail
tail-tip
carbonyl-markings
mouth-glow
fire
particles
```

### Idle behavior

Chest expands slightly.

Head moves subtly.

Wings move very slightly.

Tail has a slow minor motion.

Mouth occasionally glows.

### Attack behavior

Head pulls backward.

Jaw opens.

Mouth glow increases.

Fire/reaction energy launches toward player.

### Hit behavior

Quick controlled shake.

Very short highlight/flash.

Do not flash the entire screen.

### Defeated behavior

Dragon lowers toward ground.

Wings collapse slightly.

Glow fades.

---

## CHEMISTRY VISUAL LANGUAGE

Use real chemistry-inspired motifs where they improve character identity.

Examples include:

```text
benzene rings
hexagonal molecule structures
orbital-like energy
reaction arrows
reagent bottles
Erlenmeyer flasks
carbonyl O=C
electron-pair effects
molecular bond lines
catalyst symbols
```

Do not fill the screen with equations.

Chemistry should feel integrated into the fantasy world.

---

## SPELL PROJECTILES

Separate spell/projectile effects from the underlying avatar.

Create reusable effect components where appropriate.

Examples:

```text
reaction-orb
molecule-projectile
acid-splash
carbonyl-fire
benzene-shield
electron-burst
```

Characters initiate effects.

Effects should not require embedding hundreds of paths inside every avatar.

---

## CSS ANIMATION SYSTEM

Create a dedicated avatar stylesheet or equivalent CSS module structure.

Example:

```css
.avatar {
    position: relative;
    transform-origin: bottom center;
}

.avatar.idle .avatar-body {
    animation: avatar-breathe 2.8s ease-in-out infinite;
}

@keyframes avatar-breathe {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px);
    }
}
```

Attack example:

```css
.avatar.attack {
    animation: avatar-attack 0.55s ease-out;
}

@keyframes avatar-attack {
    0% {
        transform: translateX(0);
    }

    45% {
        transform: translateX(32px) scale(1.03);
    }

    100% {
        transform: translateX(0);
    }
}
```

Damage example:

```css
.avatar.hit {
    animation: avatar-hit 0.32s ease-in-out;
}

@keyframes avatar-hit {
    0%, 100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-8px);
    }

    50% {
        transform: translateX(7px);
    }

    75% {
        transform: translateX(-3px);
    }
}
```

These are patterns, not mandatory exact values.

Tune animations so they feel polished.

---

## INDIVIDUAL SVG PART ANIMATION

Whenever practical, animate individual SVG groups.

Example:

```css
.organic-apprentice.cast .right-arm {
    animation: apprentice-arm-cast 550ms ease-out;
    transform-box: fill-box;
    transform-origin: top center;
}
```

Flask:

```css
.organic-apprentice.cast .flask {
    animation: flask-cast-glow 700ms ease-out;
}
```

Reaction Mage:

```css
.reaction-mage.idle .molecule-ring {
    animation: molecule-orbit 10s linear infinite;
    transform-box: fill-box;
    transform-origin: center;
}
```

Dragon wings:

```css
.carbonyl-dragon.idle .left-wing,
.carbonyl-dragon.idle .right-wing {
    animation: dragon-wing-idle 4s ease-in-out infinite;
}
```

Keep movement subtle during idle states.

---

## ACCESSIBILITY

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable or substantially simplify continuous animation when reduced motion is requested.

All important game state must remain understandable without animation.

SVG characters should have appropriate accessible names or be marked decorative when textual character identification already exists.

---

## PERFORMANCE

Do not introduce excessive DOM complexity.

Avoid SVG filters that significantly degrade mobile performance.

Avoid hundreds of simultaneous animated particles.

Use CSS transforms and opacity whenever practical.

Avoid layout-triggering animation.

Use:

```text
transform
opacity
filter
```

carefully.

Target smooth animation on ordinary laptops, tablets, and modern phones.

---

## RESPONSIVE DESIGN

Characters must scale properly.

Do not hardcode them only for desktop.

Support approximately:

```text
small phone
large phone
tablet
laptop
desktop
```

SVG should scale without losing quality.

The battle screen must remain usable when player and boss avatars are displayed together.

Use `viewBox` properly.

---

## EXTERNAL SVG ASSET SOURCES

You may use the following open-license SVG assets as **reference components, icons, chemistry motifs, or starting material**.

Do not simply paste generic icons together and call them finished characters.

Adapt, redraw, combine, recolor, or create original SVG paths so the final Organic Battles avatars have a coherent visual style.

Before including any downloaded asset in the repository, verify the license shown on its source page and preserve required attribution information if applicable.

### Chemistry Laboratory — CC0

Source:

https://www.svgrepo.com/svg/293876/chemistry-laboratory

Potential use:

Organic Apprentice laboratory accessories or chemistry motifs.

### Beaker — chemistry SVG

Source:

https://www.svgrepo.com/svg/216391/beaker

Potential use:

Organic Apprentice flask or reagent accessory.

### Magic Wand — CC0

Source:

https://www.svgrepo.com/svg/470507/magic-wand

Potential use:

Reaction Mage staff/focus reference.

### Sea Dragon — CC0

Source:

https://www.svgrepo.com/svg/321334/sea-dragon

Potential use:

Reference silhouette/components for an ORIGINAL Carbonyl Dragon.

Do not simply use the source dragon unchanged.

Create a recognizable Organic Battles Carbonyl Dragon.

### Ember Shot — CC0

Source:

https://www.svgrepo.com/svg/320728/ember-shot

Potential use:

Carbonyl Dragon breath/fire effect.

### Periodic Table

Source:

https://www.svgrepo.com/svg/231613/periodic-table

Potential use:

Chemistry environment/UI decoration.

### Kenney Platformer Characters — CC0

Source:

https://kenney.nl/assets/platformer-characters

Potential use:

Study how modular lightweight game characters are organized.

Do not change Organic Battles into a platformer style.

### Kenney Game Assets

Source:

https://kenney.nl/assets

Potential use:

CC0-compatible supplementary interface/game artwork after confirming the license of the specific selected pack.

---

## LOCAL ASSET STORAGE

Do not hotlink runtime character artwork from third-party websites.

If an asset is legally usable, download it and store an appropriate optimized copy inside the project.

Use a structure similar to:

```text
assets/
  avatars/
    players/
      organic-apprentice/
        organic-apprentice.svg
      reaction-mage/
        reaction-mage.svg

    bosses/
      carbonyl-dragon/
        carbonyl-dragon.svg

  effects/
    reaction-orb.svg
    carbonyl-fire.svg
    molecule-burst.svg

  chemistry/
    flask.svg
    benzene-ring.svg
    reaction-arrow.svg

  licenses/
    ASSET_SOURCES.md
```

Adapt the path to the existing repository conventions.

---

## ASSET SOURCES DOCUMENT

Create:

```text
ASSET_SOURCES.md
```

Record:

```text
asset name
source URL
original author if listed
license
changes made
file in Organic Battles
```

Prefer CC0/public-domain assets whenever possible.

---

## ORIGINAL CHARACTER REQUIREMENT

The three primary characters should become recognizable Organic Battles intellectual property.

Do not ship:

- recognizable Pokémon characters
- recognizable Prodigy characters
- Disney characters
- Marvel characters
- Harry Potter characters
- copyrighted game characters
- traced copyrighted artwork

The target is only the general quality level of a polished educational RPG.

Design original characters.

---

## CHARACTER CONFIGURATION

Avoid hardcoding every character directly into the battle screen.

Create a character registry.

Example:

```javascript
export const CHARACTERS = {
    organicApprentice: {
        id: "organic-apprentice",
        name: "Organic Apprentice",
        type: "player",
        asset: "/assets/avatars/players/organic-apprentice/organic-apprentice.svg"
    },

    reactionMage: {
        id: "reaction-mage",
        name: "Reaction Mage",
        type: "player",
        asset: "/assets/avatars/players/reaction-mage/reaction-mage.svg"
    },

    carbonylDragon: {
        id: "carbonyl-dragon",
        name: "Carbonyl Dragon",
        type: "boss",
        asset: "/assets/avatars/bosses/carbonyl-dragon/carbonyl-dragon.svg"
    }
};
```

Adapt this to the actual codebase architecture.

---

## IMPORTANT SVG IMPLEMENTATION DETAIL

If an SVG must have independently animated internal elements, importing it only as:

```html
<img src="character.svg">
```

may prevent direct CSS access to internal SVG groups.

For animated characters, use one of the following approaches supported by the existing stack:

- inline SVG
- SVG React component
- compiled SVG component
- controlled SVG markup

Prefer a technique that allows selectors such as:

```css
.organic-apprentice .right-arm
.organic-apprentice .flask
.carbonyl-dragon .jaw
.carbonyl-dragon .fire
```

Do not sacrifice internal animation capability merely to use `<img>`.

---

## BATTLE INTEGRATION

Find the existing battle state/event logic.

Map existing events to avatar states rather than changing combat rules.

Conceptual flow:

```text
player selects spell
        ↓
question displayed
        ↓
player submits answer
        ↓
answer evaluated
        ↓
correct
        ↓
player avatar = cast
        ↓
spell effect
        ↓
boss avatar = hit
        ↓
existing damage logic executes
        ↓
HP UI updates
        ↓
avatars return to idle
```

Incorrect answer:

```text
answer incorrect
        ↓
player = miss
        ↓
spell fizzles
        ↓
existing boss counterattack logic continues
```

Boss attack:

```text
boss = attack
        ↓
boss animation
        ↓
effect animation
        ↓
player = hit OR miss
        ↓
existing game calculation remains authoritative
```

---

## ANIMATION EVENT MANAGEMENT

Avoid depending entirely on arbitrary long `setTimeout()` chains.

Where practical use:

```text
animationend
transitionend
Promise-based animation helpers
state-machine transitions
```

Short controlled timers are acceptable where appropriate.

Avoid race conditions caused by players clicking controls rapidly.

Disable spell controls during critical combat animation sequences if the existing game does not already prevent double submission.

---

## AVATAR STATE MACHINE

Implement a small predictable avatar state model.

Example:

```text
IDLE
CASTING
ATTACKING
HIT
VICTORY
DEFEATED
```

Do not allow impossible combinations such as:

```text
victory + defeated
attack + defeated
```

Do not add a large state-machine dependency unless the existing application already uses one.

---

## VISUAL EFFECTS

Use lightweight effects.

Examples:

### Organic Apprentice

```text
green bubbles
flask glow
reaction orb
small molecular particles
```

### Reaction Mage

```text
purple reaction flame
slow orbiting molecules
reaction-arrow flashes
catalyst burst
```

### Carbonyl Dragon

```text
orange/red mouth glow
carbonyl fire
smoke particles
O=C energy symbol
wing shadow
```

Effects should reinforce chemistry gameplay.

---

## CHARACTER SCALE

Design source SVGs at a logical `viewBox` such as:

```text
0 0 400 500
```

or another consistent proportion.

Do not rely on giant bitmap files for main avatar rendering.

Ensure:

```text
player approximately 220–320 CSS px
boss approximately 280–420 CSS px
```

depending on viewport.

Bosses may intentionally appear larger.

---

## DEPTH WITHOUT HEAVY GRAPHICS

Use subtle SVG techniques:

```text
gradients
small highlights
controlled shadows
layered shapes
stroke accents
limited glow
```

Avoid excessive SVG filters.

The artwork should feel richer than flat clip art without becoming computationally expensive.

---

## UI INTEGRATION

Do not redesign the entire battle screen.

Improve only the areas necessary to integrate the avatars cleanly.

Preserve existing:

```text
health bars
spell controls
question panels
chapter indicators
battle messaging
navigation
score/progression
```

The characters should visually enhance the current screen rather than replace the game interface.

---

## FILE ORGANIZATION

Create a maintainable structure compatible with the existing repository.

An example:

```text
src/
  components/
    avatars/
      Avatar.jsx
      AvatarStage.jsx
      OrganicApprentice.jsx
      ReactionMage.jsx
      CarbonylDragon.jsx
      avatarRegistry.js

    effects/
      SpellEffect.jsx
      ReactionOrb.jsx
      CarbonylFire.jsx

  styles/
    avatars.css
    avatar-effects.css

public/
  assets/
    avatars/
    effects/
    chemistry/
```

Do not force this exact structure if the repository already has a better established convention.

---

## NO DUPLICATED SVG CODE

If common components such as:

```text
glow
shadow
particles
reaction symbols
flasks
molecular rings
```

can reasonably be shared, create reusable SVG components.

Do not over-engineer trivial shapes.

---

## FALLBACK

If SVG animation fails to load, the player must still see a usable avatar.

Provide reasonable fallback behavior.

An avatar rendering problem must not prevent the user from answering chemistry questions or completing battles.

Gameplay is more important than animation.

---

## TESTS

Add appropriate tests consistent with the repository's existing test framework.

Test at minimum:

```text
Organic Apprentice renders
Reaction Mage renders
Carbonyl Dragon renders

avatar defaults to idle

changing state updates correct CSS/state class

battle event correctly triggers player cast

boss hit triggers correct state

defeated boss stays defeated

missing avatar has fallback behavior

avatar rendering does not change HP calculations

avatar rendering does not change question correctness logic
```

Do not replace existing tests.

Run the complete existing test suite after implementation.

---

## MANUAL VISUAL TESTING

Check:

```text
desktop browser
mobile width
player idle
player cast
boss idle
boss attack
boss hit
victory
defeat
rapid clicking
reduced-motion mode
```

Verify no clipping occurs.

Verify SVG components do not overlap question text.

---

## QUALITY TARGET

The resulting character experience should feel like:

```text
modern browser RPG
educational chemistry adventure
clean vector game art
animated but not distracting
colorful but professional
high resolution at any display scale
fast-loading
mobile-friendly
easy to extend
```

The characters should look substantially better than basic CSS avatars.

---

## EXTENSIBILITY

Build the system so later we can easily add:

```text
Organic Scholar
Synthesis Wizard
Master Chemist
Alkane Beast
Carbocation Golem
Stereochemistry Sorcerer
SN2 Ninja
Aromatic Titan
```

Adding a new avatar should primarily require:

```text
SVG/component
character configuration
character-specific animation CSS
```

It should NOT require rewriting the battle engine.

---

## IMPORTANT: DO NOT REDESIGN THE REST OF THE GAME

The goal of this task is:

**AVATAR SYSTEM V2**

not:

**ORGANIC BATTLES REWRITE**

Preserve existing:

```text
game theme
game mechanics
educational content
question flow
boss progression
spell behavior
difficulty
navigation
application architecture
```

unless a tiny change is technically necessary for avatar integration.

---

## IMPLEMENTATION ORDER

Perform the work in this order:

1. Inspect existing Organic Battles V2 architecture.
2. Identify current avatar/image rendering.
3. Identify battle event/state flow.
4. Design reusable Avatar API.
5. Build Organic Apprentice SVG/component.
6. Build Carbonyl Dragon SVG/component.
7. Build Reaction Mage SVG/component.
8. Build shared CSS animation system.
9. Connect existing battle events to semantic avatar states.
10. Add spell/effect components.
11. Implement responsive sizing.
12. Implement reduced-motion support.
13. Add asset source/license documentation.
14. Add/update tests.
15. Run lint/build/tests.
16. Fix regressions.
17. Visually inspect key battle states.
18. Document changes.

Do not stop after merely adding SVG files.

Complete the integration.

---

## FINAL VALIDATION

Before declaring the task complete verify:

```text
application builds successfully
application launches successfully
all existing functionality still works
questions still load
answers still evaluate correctly
spells still work
damage still works
boss counterattacks still work
HP behaves exactly as before
chapter progression still works
Organic Apprentice animates
Reaction Mage animates
Carbonyl Dragon animates
characters scale cleanly
mobile layout works
no required client installation
no broken external asset URLs
no runtime hotlink dependencies
no obvious copyrighted character copies
asset licenses documented
```

---

## FINAL CODEX RESPONSE

After implementation provide a concise implementation report containing:

```text
Files created
Files modified
Avatar architecture
Battle-event integration
Animations implemented
External assets used
Licenses
Tests run
Build result
Any known limitations
Recommended next avatars
```

Do not merely describe what should be changed.

**Inspect the repository, implement the changes, test them, and leave Organic Battles V2 in a working state.**
