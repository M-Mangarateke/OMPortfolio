# Phase 4: Section Transitions - Testing Guide

## What Was Implemented

### Signature Liquid Wipe Overlay Transition

Phase 4 implements a consistent, subtle transition effect that plays when each section enters the viewport. The system automatically adapts based on device capability and user preferences.

### Three Transition Modes

#### 1. **Desktop: SVG Mask Liquid Wipe**
- Uses an animated SVG path that sweeps down like a liquid curtain
- Liquid chrome gradient (matching the site's aesthetic)
- Subtle gaussian blur for organic feel
- Smooth easing with custom timing

#### 2. **Mobile: Color Wash Fallback**
- Lightweight CSS gradient sweep (left to right)
- No heavy SVG rendering
- Optimized for mobile performance
- Same liquid chrome color palette

#### 3. **Reduced Motion: Simple Fade**
- Quick, gentle opacity fade
- No movement or complex animations
- Respects accessibility preferences
- Ultra-fast timing (instant duration)

## How to Test

### Desktop Testing (SVG Mask Mode)

1. **Open in Desktop Browser** (Chrome, Firefox, Edge, Safari)
   - Ensure window width is > 768px

2. **Complete Intro Sequence**
   - Click "Enter" on the intro overlay
   - Wait for transition to complete

3. **Scroll Through Sections**
   - Slowly scroll down the page
   - As each section enters view (About, Skills, Work, Showreel, Education, Contact), watch for:
     - Brief liquid wipe effect sweeping down
     - Chrome-like gradient color
     - Smooth, organic motion
     - Effect completes in ~0.8 seconds

4. **Check Console**
   - Should see: `🌊 Section Transitions Initialized`
   - Should see: `Mode: SVG Mask`

5. **Verify One-Time Trigger**
   - Scroll down past a section
   - Scroll back up and down again
   - Transition should only play ONCE per section (no repeats)

6. **Check All Sections**
   - About: ✓ Transition plays
   - Skills: ✓ Transition plays
   - Work: ✓ Transition plays
   - Showreel: ✓ Transition plays
   - Education: ✓ Transition plays
   - Contact: ✓ Transition plays
   - Hero (#home): ✗ No transition (skipped)

### Mobile Testing (Color Wash Fallback)

1. **Open on Mobile Device or Emulate**
   - Real device: iPhone, Android phone, tablet
   - DevTools: Toggle device toolbar, select mobile device
   - Or: Resize browser window to < 768px width

2. **Scroll Through Sections**
   - Watch for horizontal sweep effect (left to right)
   - Should be smooth gradient wash, not SVG animation
   - Lighter weight than desktop version

3. **Check Console**
   - Should see: `Mode: Color Wash Fallback`

4. **Verify Performance**
   - Scrolling should remain smooth
   - No jank or frame drops
   - Transitions should feel lightweight

### Reduced Motion Testing

1. **Enable Reduced Motion**
   - **Windows**: Settings → Accessibility → Visual effects → Animation effects OFF
   - **Mac**: System Preferences → Accessibility → Display → Reduce motion ON
   - **DevTools**: Rendering panel → Emulate CSS media feature prefers-reduced-motion: reduce
   - **iOS**: Settings → Accessibility → Motion → Reduce Motion ON
   - **Android**: Settings → Accessibility → Remove animations

2. **Reload Page and Scroll**
   - Transitions should be quick, subtle fades
   - No sweeping motion
   - Very brief (0.2s) opacity changes only

3. **Check Console**
   - Verify reduced motion is detected in motion-config.js

### Edge Cases

1. **Fast Scrolling**
   - Rapidly scroll through multiple sections
   - Transitions should queue/skip gracefully
   - No visual glitches or overlapping effects

2. **Navigation Clicks**
   - Click nav links to jump between sections
   - Sections already revealed should not transition again
   - New sections entering view should still transition

3. **Browser Refresh**
   - Refresh page while scrolled down
   - Sections should properly track as revealed
   - No duplicate transitions

## Expected Visual Behavior

### Desktop (SVG Mask)
```
Section enters viewport
↓
SVG liquid curtain sweeps down from top to bottom
↓ (0.8 seconds)
Curtain completes, section fully visible
```

### Mobile (Color Wash)
```
Section enters viewport
↓
Gradient wash sweeps left to right
↓ (0.6 seconds, 2 passes)
Wash completes, section fully visible
```

### Reduced Motion
```
Section enters viewport
↓
Quick fade (30% opacity)
↓ (0.2 seconds)
Fade out, section visible
```

## Expected Console Messages

```
🎬 GSAP Motion System Initialized
Reduced Motion: Disabled

✨ Phase 1 Reveal Animations Initialized
🧭 Navigation System Initialized
🧭 Navigation Setup Complete
🌊 Section Transitions Initialized
Mode: SVG Mask (or "Color Wash Fallback" on mobile)
```

## Technical Details

### Transition Timing
- **Desktop SVG**: 0.8s duration
- **Mobile Color Wash**: 0.6s per sweep (2 sweeps)
- **Reduced Motion**: 0.2s fade in + 0.2s fade out

### Trigger Point
- Sections trigger when their top edge reaches 85% from viewport top
- Uses ScrollTrigger `start: 'top 85%'`
- Each section triggers only once (`once: true`)

### Mobile Detection
User agent check OR viewport width < 768px automatically enables color wash fallback

### Performance Considerations
- SVG mask uses `preserveAspectRatio="none"` for efficient scaling
- Gaussian blur limited to `stdDeviation="2"` (subtle)
- Color wash uses pure CSS gradients (GPU accelerated)
- Overlay is `pointer-events: none` to not block interactions
- Overlay set to `display: none` when not active (removed from render tree)

## Troubleshooting

### Transitions Not Appearing
- Check console for initialization message
- Verify ScrollTrigger is working (Phase 1 reveals should work)
- Check if sections have proper IDs
- Ensure section-transitions.js is loaded after GSAP and ScrollTrigger

### Transitions Too Fast/Slow
- Adjust `motionConfig.durations.slow` in motion-config.js
- Desktop uses `motionConfig.durations.slow` (default 0.8s)
- Mobile uses `motionConfig.durations.normal` (default 0.6s)

### SVG Not Rendering
- Check browser console for SVG errors
- Verify browser supports inline SVG
- Should automatically fall back to color wash if issues occur

### Performance Issues on Mobile
- Color wash fallback should be active automatically
- If still laggy, check if other animations are conflicting
- Verify device isn't overloaded with other processes

### Transitions Replaying
- Should only play once per section
- Check `revealedSections` Set is working
- Clear cache and reload if needed

## Files Modified/Created

- **[section-transitions.js](../../section-transitions.js)** - New Phase 4 logic
- **[index.html:371-372](../../index.html#L371-L372)** - Added script reference
- **[docs/motion/PHASE4_TESTING.md](PHASE4_TESTING.md)** - This testing guide

## Integration with Other Phases

- **Phase 1**: Section content reveals still work independently
- **Phase 2**: Intro overlay completes before any section transitions
- **Phase 3**: Nav highlighting works alongside transitions
- **Works with all phases**: Transitions respect reduced motion globally

## Next Steps

After Phase 4 is validated:
- **Phase 5**: Parallax effects on decorative blobs and droplets
- **Phase 6**: Section-specific interactions and moments

## Known Behaviors

1. **Hero Section Skipped**: The intro sequence (Phase 2) already handles hero reveal, so Phase 4 skips `#home`

2. **One-Time Only**: Each section transition plays once per page load. This is intentional to avoid repetitive animations.

3. **Overlay Z-Index**: Fixed at `z-index: 9999` to appear above all content except intro overlay (10000)

4. **Mobile Auto-Detection**: Checks user agent AND viewport width to determine mobile fallback

5. **SVG Liquid Shape**: Uses a wavy path with quadratic curves to create organic liquid movement
