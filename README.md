# Graphite Luxury — Cinematic Developer Portfolio

A bespoke, production-grade personal developer portfolio built with the **Graphite Luxury** visual identity: obsidian-black backgrounds (`#080808`), brushed graphite surfaces, metallic silver accents (`#BFC2C7`), dramatic lighting, high-contrast grotesque typography, and disciplined motion.

---

## ✦ Core Features & Architecture

1. **Arcane Orb Navigation (New Interactive Artifact)**:
   - **Visual Design**: Dark obsidian sphere with a luminous icy-blue/white energy core (`#E0F2FE`), surrounded by three metallic silver gimbal rings rotating along oblique axes.
   - **Tactile Drag Interaction**: Click and drag (or swipe on touchscreens) to rotate the armillary rings.
   - **Rotation Mapping**: Four cardinal destinations spaced at $90^\circ$ ($\pi/2$ radians):
     - `00°` (0 rad) ➔ **PROJECTS** (`#work` / `#projects`)
     - `90°` ($\pi/2$ rad) ➔ **ABOUT** (`#about`)
     - `180°` ($\pi$ rad) ➔ **SKILLS** (`#skills`)
     - `270°` ($3\pi/2$ rad) ➔ **CONTACT** (`#contact`)
   - **Spring Snapping**: When released, the orb calculates the nearest quadrant and smoothly interpolates to the target angle, settling with an automatic scroll transition to the aligned section.
   - **Direct Quadrant & Keyboard Access**: Arrow keys rotate quadrants; Enter/Space confirms; direct buttons (`01 // PROJECTS`, etc.) provide immediate click/tap navigation.

2. **Personal Portrait Integration**:
   - Location: Located in `/public/images/profile.jpg`.
   - **Visual Treatment**: 3D interactive tilt, specular light glint, corner registration crosshairs (`+`), and custom monochrome/silver grading (`filter: grayscale(100%) contrast(1.15) brightness(0.92)`).
   - **Tasteful Fallback**: If the asset is missing, an architectural placeholder with the monogram `TR` and replacement instructions gracefully appears.

3. **"ENTER THE UNKNOWN ↗" & Magical Alternate World**:
   - **Portal Transition**: Expanding gravitational stardust singularity canvas.
   - **Cosmic Sanctuaries**: 2.5D interactive realm with 280+ stars, floating islands, luminous pathways, and the Celestial Codex modal detailing verified projects and academic standing.
   - **Return to Reality**: Visible button in header and <kbd>ESC</kbd> shortcut return smoothly to the portfolio.

4. **Cinematic 4-Phase Intro Sequence**:
   - Darkness ➔ Metallic Reveal (Procedural WebGL Möbius) ➔ Typography ➔ Smooth aperture dissolve.
   - Skip button with <kbd>ESC</kbd> shortcut, session memory, and replay trigger.

5. **Selected Work, About, Skills, and Contact**:
   - Alternating asymmetric project showcases with architectural telemetry SVGs.
   - Academic standing at Rathinam Technical Campus (9.0 CGPA) with three engineering pillars.
   - Capabilities matrix across four technical disciplines.
   - One-click copy email tool and direct transmission formulation form.

---

## ✦ Getting Started

```bash
# Navigate to the project directory
cd /Users/raju/.gemini/antigravity/scratch/graphite-luxury-portfolio

# Start development server
npm run dev

# Run production build
npm run build
```

**Local Host URL**: [http://localhost:5173/](http://localhost:5173/)  
**Network URL**: [http://192.0.0.2:5173/](http://192.0.0.2:5173/)
