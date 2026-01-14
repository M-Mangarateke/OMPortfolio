# Portfolio Assets

This folder contains all visual assets and effects for your portfolio website.

## What's Included

### ✨ CSS Chrome Text Effects
**Location**: `css-effects/`

I've created CSS-based liquid chrome text effects that recreate the metallic text look from your PDF, but better:
- Fully scalable (sharp at any size)
- Editable (change text anytime)
- Animated (subtle shine effect)
- Responsive (works on all devices)
- Better for SEO and performance

**How to use:**
1. Open `css-effects/chrome-text-demo.html` in a browser to see all effects
2. Link the CSS: `<link rel="stylesheet" href="assets/css-effects/chrome-text.css">`
3. Apply classes: `<h1 class="chrome-text">YOUR TEXT</h1>`

**Available effects:**
- `.chrome-text` - Basic liquid chrome with animation
- `.chrome-text-3d` - 3D metallic effect with depth
- `.chrome-text-pink` - Pink/pastel chrome variant
- `.chrome-text-blue` - Blue/pastel chrome variant
- `.embossed-text` - Raised/embossed effect
- `.glossy-text` - Glossy plastic effect

---

### 🎨 Decorative SVG Elements
**Location**: `images/decorations/`

Pre-made SVG decorations matching your PDF aesthetic:
- `shell-1.svg` - Rounded shell with ridges (pastel purple/pink)
- `shell-2.svg` - Spiral shell design (pink gradient)
- `starfish.svg` - 5-pointed starfish (orange/coral gradient)

**Why SVG?**
- Infinitely scalable
- Small file size
- Can change colors with CSS
- Transparent backgrounds
- Crisp on retina displays

**How to use:**
```html
<img src="assets/images/decorations/starfish.svg" alt="" class="decoration">
```

Or as background:
```css
.starfish-decor {
    background-image: url('assets/images/decorations/starfish.svg');
    background-size: contain;
}
```

---

### 📁 Organized Folders

```
assets/
├── css-effects/
│   ├── chrome-text.css           ← Chrome text styles
│   └── chrome-text-demo.html     ← Live demo of effects
│
├── images/
│   ├── backgrounds/              ← Put background images here
│   ├── decorations/              ← Shell, starfish SVGs
│   │   ├── shell-1.svg
│   │   ├── shell-2.svg
│   │   └── starfish.svg
│   ├── portfolio/                ← Your work/portfolio images
│   └── profile/                  ← Your profile photo
│
├── ASSET_EXTRACTION_GUIDE.md     ← Detailed extraction guide
└── README.md                     ← This file
```

---

## Quick Start

### 1. View the Chrome Text Demo
```bash
# Open this file in your browser:
assets/css-effects/chrome-text-demo.html
```

### 2. Extract Your Images from PDF
Read the detailed guide:
```bash
assets/ASSET_EXTRACTION_GUIDE.md
```

Or use these quick methods:
- **Online**: Upload PDF to iLovePDF.com
- **Adobe Acrobat**: Tools → Export PDF → Images
- **Screenshot**: Windows (Win+Shift+S) or Mac (Cmd+Shift+4)

### 3. Organize Your Files
- Profile photo → `images/profile/profile.jpg`
- Portfolio work → `images/portfolio/work-1.jpg`, `work-2.jpg`, etc.
- Any backgrounds → `images/backgrounds/`

---

## Using the Assets in Your Portfolio

### Update HTML to Use Chrome Text Effects

**Current (placeholder):**
```html
<h1 class="main-title">ORENEILE MACHITJE</h1>
```

**With chrome effect:**
```html
<link rel="stylesheet" href="assets/css-effects/chrome-text.css">
<h1 class="chrome-text">ORENEILE MACHITJE</h1>
```

### Update HTML with SVG Decorations

**Replace shell decorations:**
```html
<!-- Before -->
<div class="shell-decor shell-1"></div>

<!-- After -->
<img src="assets/images/decorations/shell-1.svg" alt="" class="shell-decor shell-1">
```

Or update CSS:
```css
.shell-decor {
    background-image: url('../assets/images/decorations/shell-1.svg');
    background-size: contain;
    background-repeat: no-repeat;
}
```

### Add Your Profile Photo

```html
<div class="profile-image">
    <img src="assets/images/profile/profile.jpg" alt="Oreneile Machitje">
</div>
```

### Add Portfolio Images

```html
<div class="polaroid">
    <img src="assets/images/portfolio/work-1.jpg" alt="Project Name" class="polaroid-image">
</div>
```

---

## Optimization Tips

### Before Adding Images:
1. **Resize** to appropriate web dimensions
   - Profile: 800x800px
   - Portfolio: 1200px max width
   - Decorations: Use SVGs (already optimized)

2. **Compress** using online tools
   - TinyPNG.com - Reduces file size 50-70%
   - Squoosh.app - Google's compression tool

3. **Choose right format**
   - Photos → JPG (smaller size)
   - Graphics/logos → PNG or SVG
   - Decorations → SVG (scalable)

---

## Checklist

- [ ] View chrome text demo (`chrome-text-demo.html`)
- [ ] Read extraction guide (`ASSET_EXTRACTION_GUIDE.md`)
- [ ] Extract profile photo from PDF
- [ ] Extract portfolio images from PDF
- [ ] Optimize images for web
- [ ] Save images to appropriate folders
- [ ] Update HTML to use chrome CSS effects
- [ ] Update HTML image paths
- [ ] Test website with new assets

---

## Why I Created These

**The Problem:**
You can't easily extract rendered visual elements (like liquid chrome text) from a PDF. PDFs contain final rendered output, not editable source files.

**The Solution:**
1. **CSS Chrome Effects** - Better than images because they're:
   - Scalable
   - Editable
   - Smaller file size
   - Better for SEO
   - More professional

2. **SVG Decorations** - Pre-made decorative elements that match your aesthetic

3. **Organized Folders** - Clear structure for your extracted images

4. **Comprehensive Guide** - Multiple methods to extract what you need

---

## Next Steps

1. **Open the demo**: `chrome-text-demo.html` - See all chrome effects live
2. **Read the guide**: `ASSET_EXTRACTION_GUIDE.md` - Learn extraction methods
3. **Extract your images**: Use method that works best for you
4. **Update your portfolio**: Replace placeholders with real content

---

## Need More Help?

- Check `ASSET_EXTRACTION_GUIDE.md` for detailed instructions
- All CSS effects have examples in `chrome-text-demo.html`
- SVG decorations are ready to use as-is
- Folder structure is set up for easy organization

**Remember**: CSS chrome effects are better than extracted images in almost every way. Try them first!
