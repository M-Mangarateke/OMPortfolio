/**
 * Intro Overlay - Phase 2 (Redesigned)
 * Liquid chrome intro screen with Enter button and smooth transitions
 */

let introReadyToEnter = false;

const HERO_ANIMATION_ASSETS = [
  'assets/images/backgrounds/HeroBackground.png',
  'assets/images/hero/HeroLiquidDesignTopLeft.svg',
  'assets/images/hero/HeroLiquidDesignBottomRight.svg',
  'assets/images/hero/herofilmstrip.png',
  'assets/images/hero/herobutton.png',
  'assets/images/liquidchrometext/HeroNameO.svg',
  'assets/images/liquidchrometext/HeroNameR.svg',
  'assets/images/liquidchrometext/HeroNameE.svg',
  'assets/images/liquidchrometext/HeroNameN.svg',
  'assets/images/liquidchrometext/HeroNameI.svg',
  'assets/images/liquidchrometext/HeroNameL.svg',
  'assets/images/liquidchrometext/HeroSurnameM.svg',
  'assets/images/liquidchrometext/HeroSurnameA.svg',
  'assets/images/liquidchrometext/HeroSurnameC.svg',
  'assets/images/liquidchrometext/HeroSurnameH.svg',
  'assets/images/liquidchrometext/HeroSurnameI.svg',
  'assets/images/liquidchrometext/HeroSurnameT.svg',
  'assets/images/liquidchrometext/HeroSurnameJ.svg',
  'assets/images/liquidchrometext/HeroSurnameE.svg'
];

// Wait for DOM and motionConfig to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Skip entire intro flow if reduced motion is enabled
  if (motionConfig.reducedMotion) {
    window.introOverlayActive = false;
    window.heroAssetsReady = true;
    console.log('%c⏭️ Intro overlay skipped (reduced motion)', 'color: #ff6b6b;');
    // Trigger hero animations immediately since intro is skipped
    if (window.triggerHeroAnimations) {
      setTimeout(() => {
        window.triggerHeroAnimations();
      }, 500);
    }
    return;
  }

  initIntroOverlay();
});

/**
 * Initialize the intro overlay system
 */
function initIntroOverlay() {
  window.introOverlayActive = true;
  window.heroAssetsReady = false;
  introReadyToEnter = false;
  // Lock scroll immediately
  lockScroll();

  // Hide the original content
  hideOriginalContent();

  // Create and inject the liquid chrome intro
  createLiquidChromeIntro();

  // Setup the enter button
  setupEnterButton();

  // Preload hero assets and enable enter when ready
  startIntroLoading();

  console.log('%c🎬 Liquid Chrome Intro Initialized', 'color: #88ce02; font-weight: bold;');
}

/**
 * Hide the original navbar and all sections
 */
function hideOriginalContent() {
  const navbar = document.querySelector('.navbar');
  const allSections = document.querySelectorAll('section');

  if (navbar) {
    navbar.style.visibility = 'hidden';
  }

  allSections.forEach(section => {
    section.style.visibility = 'hidden';
  });
}

/**
 * Restore visibility of original content
 */
function restoreOriginalContent() {
  const navbar = document.querySelector('.navbar');
  const allSections = document.querySelectorAll('section');

  if (navbar) {
    navbar.style.visibility = '';
  }

  allSections.forEach(section => {
    section.style.visibility = '';
  });
}

/**
 * Lock vertical scrolling
 */
function lockScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = '0';
}

/**
 * Unlock vertical scrolling
 */
function unlockScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
}

/**
 * Create the liquid chrome intro screen with WebGL
 */
function createLiquidChromeIntro() {
  const intro = document.createElement('div');
  intro.id = 'liquid-chrome-intro';
  intro.innerHTML = `
    <canvas id="liquid-chrome-canvas" class="liquid-chrome-background"></canvas>

    <div class="intro-content">
      <img src="assets/images/intro/IntroText.svg" alt="Intro" class="intro-text">
      <img src="assets/images/intro/IntroEnterButton.svg" alt="Enter" class="intro-explore-btn" role="button" tabindex="0" aria-label="Enter">
      <div class="intro-loading">
        <div class="intro-loading-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="intro-loading-progress"></div>
        </div>
      </div>
      <img src="assets/images/intro/IntroStickyNote.svg" alt="Sticky Note" class="intro-sticky-note">
    </div>

    <!-- Liquid Chrome Wash Overlay -->
    <div class="liquid-wash-overlay"></div>
  `;

  document.body.appendChild(intro);
  injectLiquidChromeStyles();
  initWebGLLiquidChrome();
}

/**
 * Setup the intro explore button click handler
 */
function setupEnterButton() {
  // Use setTimeout to ensure DOM is ready
  setTimeout(() => {
    const enterButton = document.querySelector('.intro-explore-btn');

    if (enterButton) {
      console.log('%c🔘 Intro explore button found, attaching event listener', 'color: #88ce02;');
      console.log('Button element:', enterButton);
      console.log('Button computed style z-index:', window.getComputedStyle(enterButton).zIndex);
      console.log('Button computed style pointer-events:', window.getComputedStyle(enterButton).pointerEvents);

      // Multiple event listeners to ensure it works
      enterButton.addEventListener('click', handleButtonClick);
      enterButton.addEventListener('touchstart', handleButtonClick);
      enterButton.addEventListener('keydown', handleButtonClick);

      // Make absolutely sure it's clickable
      enterButton.style.cursor = 'pointer';
      enterButton.style.pointerEvents = 'auto';
      enterButton.style.zIndex = '10001';
      setEnterButtonEnabled(enterButton, introReadyToEnter);

      // Add visual feedback
      enterButton.addEventListener('mouseenter', () => {
        console.log('Mouse entered button');
      });
    } else {
      console.error('❌ Intro explore button not found in DOM');
    }
  }, 100);
}

function setEnterButtonEnabled(enterButton, enabled) {
  if (!enterButton) return;
  enterButton.classList.toggle('is-disabled', !enabled);
  enterButton.setAttribute('aria-disabled', enabled ? 'false' : 'true');
  enterButton.setAttribute('tabindex', enabled ? '0' : '-1');
  enterButton.dataset.enabled = enabled ? 'true' : 'false';
  enterButton.style.pointerEvents = enabled ? 'auto' : 'none';
}

function updateIntroLoadingProgress(track, progressEl, ratio) {
  if (!track || !progressEl) return;
  const clamped = Math.max(0, Math.min(1, ratio));
  const percent = Math.round(clamped * 100);
  progressEl.style.width = `${percent}%`;
  track.setAttribute('aria-valuenow', String(percent));
}

function preloadImages(assets, onProgress) {
  const uniqueAssets = Array.from(new Set(assets)).filter(Boolean);
  if (uniqueAssets.length === 0) {
    if (onProgress) onProgress(1);
    return Promise.resolve();
  }

  let loaded = 0;
  return new Promise(resolve => {
    uniqueAssets.forEach(src => {
      const img = new Image();
      const done = () => {
        loaded += 1;
        if (onProgress) onProgress(loaded / uniqueAssets.length);
        if (loaded === uniqueAssets.length) resolve();
      };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });
  });
}

function getHeroAssetsToPreload() {
  return HERO_ANIMATION_ASSETS.slice();
}

function startIntroLoading() {
  const enterButton = document.querySelector('.intro-explore-btn');
  const loadingWrap = document.querySelector('.intro-loading');
  const loadingTrack = document.querySelector('.intro-loading-track');
  const loadingProgress = document.querySelector('.intro-loading-progress');

  if (!enterButton || !loadingWrap || !loadingTrack || !loadingProgress) {
    introReadyToEnter = true;
    window.heroAssetsReady = true;
    setEnterButtonEnabled(enterButton, true);
    return;
  }

  introReadyToEnter = false;
  window.heroAssetsReady = false;
  loadingWrap.classList.remove('is-complete');
  setEnterButtonEnabled(enterButton, false);
  updateIntroLoadingProgress(loadingTrack, loadingProgress, 0);

  preloadImages(getHeroAssetsToPreload(), (ratio) => {
    updateIntroLoadingProgress(loadingTrack, loadingProgress, ratio);
  }).then(() => {
    introReadyToEnter = true;
    window.heroAssetsReady = true;
    updateIntroLoadingProgress(loadingTrack, loadingProgress, 1);
    loadingWrap.classList.add('is-complete');
    setEnterButtonEnabled(enterButton, true);
  });
}

function handleButtonClick(e) {
  if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') {
    return;
  }
  if (!introReadyToEnter) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  console.log('%c🔘 INTRO EXPLORE CLICKED!', 'color: #51cf66; font-weight: bold; font-size: 20px;');
  startLiquidTransition();
}

/**
 * Start the liquid chrome transition sequence
 */
function startLiquidTransition() {
  console.log('%c▶️ Starting liquid chrome transition', 'color: #88ce02;');

  const intro = document.getElementById('liquid-chrome-intro');
  const liquidWash = document.querySelector('.liquid-wash-overlay');
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('#home.hero');

  // Create GSAP timeline
  const tl = gsap.timeline({
    onComplete: () => {
      cleanup();
    }
  });

  // Step 1: Fade out intro content
  tl.to('.intro-content', {
    opacity: 0,
    duration: motionConfig.durations.fast,
    ease: 'power2.inOut'
  });

  // Step 2: Liquid chrome wash sweeps across screen
  tl.fromTo(liquidWash,
    {
      x: '-100%',
      display: 'block'
    },
    {
      x: '0%',
      duration: motionConfig.durations.verySlow,
      ease: motionConfig.easings.liquid
    },
    '-=0.2'
  );

  // Step 3: Make hero and navbar visible (off-screen right)
  tl.call(() => {
    if (navbar) navbar.style.visibility = 'visible';
    if (heroSection) {
      heroSection.style.visibility = 'visible';
      gsap.set(heroSection, { x: '100%' });
    }
    if (navbar) {
      gsap.set(navbar, { x: '100%' });
    }
  });

  // Step 4: Slide hero in from right to left
  tl.to([navbar, heroSection],
    {
      x: '0%',
      duration: motionConfig.durations.verySlow,
      ease: motionConfig.easings.liquid
    },
    '-=0.6'
  );

  // Step 5: Liquid wash sweeps out to the right
  tl.to(liquidWash,
    {
      x: '100%',
      duration: motionConfig.durations.slow,
      ease: motionConfig.easings.liquid
    },
    '-=0.8'
  );

  // Step 6: Fade out the intro overlay
  tl.to(intro,
    {
      opacity: 0,
      duration: motionConfig.durations.normal,
      ease: 'power2.out'
    },
    '-=0.4'
  );
}

/**
 * Initialize WebGL Liquid Chrome effect (raw WebGL)
 */
let liquidChromeAnimationId = null;
let liquidChromeState = null;
let liquidChromePointerHandler = null;
let liquidChromePointerLeaveHandler = null;
let liquidChromeResizeHandler = null;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('WebGL shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('WebGL program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

function initWebGLLiquidChrome() {
  const canvas = document.getElementById('liquid-chrome-canvas');
  if (!canvas) {
    console.error('Liquid chrome canvas not found');
    return;
  }

  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance'
  }) || canvas.getContext('experimental-webgl');

  if (!gl) {
    console.error('WebGL not supported, using CSS fallback');
    useCSSFallback();
    return;
  }

  const vertexSource = `
    attribute vec2 aPosition;
    attribute vec2 aUv;
    varying vec2 vUv;
    void main() {
      vUv = aUv;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = vec2(
        dot(p, vec2(127.1, 311.7)),
        dot(p, vec2(269.5, 183.3))
      );
      return fract(sin(p.x + p.y) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv;
      vec2 p = uv * 2.0 - 1.0;
      float aspect = uResolution.x / uResolution.y;
      p.x *= aspect;

      float t = uTime * 0.35;

      vec2 flow = vec2(
        fbm(p * 1.2 + vec2(0.0, t)),
        fbm(p * 1.2 + vec2(t, 0.0))
      );
      flow = (flow - 0.5) * 0.7;

      vec2 warped = p + flow;
      float warpNoise = fbm(warped * 2.2 - t);
      warped += (warpNoise - 0.5) * 0.3;

      vec2 mouse = uMouse * 2.0 - 1.0;
      mouse.x *= aspect;
      vec2 toMouse = warped - mouse;
      float mouseDist = length(toMouse);
      float mouseInfluence = smoothstep(0.9, 0.0, mouseDist);
      vec2 swirl = vec2(-toMouse.y, toMouse.x) * mouseInfluence * 0.5;
      warped += swirl;

      float ridgeBase = fbm(warped * 3.5 + t * 0.7);
      float ridges = 1.0 - abs(ridgeBase * 2.0 - 1.0);
      ridges = pow(ridges, 2.2);

      float bands = sin((warped.x * 1.1 + warped.y * 0.8) * 9.0 + t * 2.0);
      bands = smoothstep(0.2, 1.0, bands);

      float streaks = max(ridges, bands * 0.35);

      float large = fbm(warped * 0.8 - t * 0.2);
      float body = smoothstep(0.2, 0.8, large);

      float height = fbm(warped * 2.0 + t * 0.2);
      vec2 grad = vec2(
        fbm(warped * 2.0 + vec2(0.01, 0.0) + t * 0.2) - height,
        fbm(warped * 2.0 + vec2(0.0, 0.01) + t * 0.2) - height
      );
      vec3 normal = normalize(vec3(-grad * 4.0, 1.0));
      vec3 lightDir = normalize(vec3(0.25, 0.35, 1.0));
      float diff = clamp(dot(normal, lightDir), 0.0, 1.0);
      float spec = pow(clamp(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 24.0);

      float intensity = streaks * 0.7 + body * 0.25 + mouseInfluence * 0.35 + spec * 0.5;

      vec3 base = vec3(0.14, 0.14, 0.15);
      vec3 chrome = vec3(0.78, 0.79, 0.8);
      vec3 color = mix(base, chrome, clamp(intensity, 0.0, 1.0));
      color += diff * vec3(0.05, 0.05, 0.06);
      color = clamp(color, 0.0, 0.92);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const program = createProgram(gl, vertexSource, fragmentSource);
  if (!program) {
    useCSSFallback();
    return;
  }

  const quad = new Float32Array([
    -1, -1, 0, 0,
    1, -1, 1, 0,
    -1, 1, 0, 1,
    1, 1, 1, 1
  ]);

  const buffer = gl.createBuffer();
  if (!buffer) {
    useCSSFallback();
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  gl.useProgram(program);

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  const aUv = gl.getAttribLocation(program, 'aUv');
  if (aPosition === -1 || aUv === -1) {
    console.error('WebGL attributes not found');
    useCSSFallback();
    return;
  }

  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

  const uTime = gl.getUniformLocation(program, 'uTime');
  const uResolution = gl.getUniformLocation(program, 'uResolution');
  const uMouse = gl.getUniformLocation(program, 'uMouse');
  if (!uTime || !uResolution || !uMouse) {
    console.error('WebGL uniforms not found');
    useCSSFallback();
    return;
  }

  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.BLEND);
  gl.clearColor(0.02, 0.02, 0.03, 1.0);

  const intro = document.getElementById('liquid-chrome-intro');
  const pointerTarget = intro || window;
  const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

  liquidChromePointerHandler = (event) => {
    const point = (event.touches && event.touches[0]) ? event.touches[0] : event;
    if (typeof point.clientX !== 'number' || typeof point.clientY !== 'number') {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    mouse.targetX = (point.clientX - rect.left) / rect.width;
    mouse.targetY = 1.0 - (point.clientY - rect.top) / rect.height;
  };

  liquidChromePointerLeaveHandler = () => {
    mouse.targetX = 0.5;
    mouse.targetY = 0.5;
  };

  pointerTarget.addEventListener('pointermove', liquidChromePointerHandler, { passive: true });
  pointerTarget.addEventListener('pointerdown', liquidChromePointerHandler, { passive: true });
  if (intro) {
    intro.addEventListener('pointerleave', liquidChromePointerLeaveHandler, { passive: true });
  }

  liquidChromeResizeHandler = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
  };

  liquidChromeResizeHandler();
  window.addEventListener('resize', liquidChromeResizeHandler);

  const startTime = performance.now();

  const render = (now) => {
    liquidChromeAnimationId = requestAnimationFrame(render);
    const elapsed = (now - startTime) * 0.001;

    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    gl.uniform1f(uTime, elapsed);
    gl.uniform2f(uMouse, mouse.x, mouse.y);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  liquidChromeState = {
    gl,
    program,
    buffer,
    uTime,
    uResolution,
    uMouse,
    mouse,
    canvas,
    intro,
    pointerTarget,
    loseContext: gl.getExtension('WEBGL_lose_context')
  };

  liquidChromeAnimationId = requestAnimationFrame(render);

  console.log('WebGL liquid chrome initialized');
}
/**
 * CSS fallback for liquid chrome effect when WebGL fails
 */
function useCSSFallback() {
  const canvas = document.getElementById('liquid-chrome-canvas');
  if (!canvas) return;

  // Replace canvas with div that uses CSS gradient
  const fallbackDiv = document.createElement('div');
  fallbackDiv.className = 'liquid-chrome-background liquid-chrome-css-fallback';
  fallbackDiv.innerHTML = '<div class="liquid-chrome-gradient"></div>';

  canvas.parentNode.replaceChild(fallbackDiv, canvas);

  console.log('%c🎨 Using CSS Fallback for Liquid Chrome', 'color: #ffa500; font-weight: bold;');
}

/**
 * Clean up the intro overlay
 */
function cleanup() {
  console.log('%c🧹 Cleaning up liquid chrome intro', 'color: #88ce02;');

  // Stop WebGL animation
  if (liquidChromeAnimationId) {
    cancelAnimationFrame(liquidChromeAnimationId);
    liquidChromeAnimationId = null;
  }

  if (liquidChromeResizeHandler) {
    window.removeEventListener('resize', liquidChromeResizeHandler);
    liquidChromeResizeHandler = null;
  }

  if (liquidChromePointerHandler && liquidChromeState && liquidChromeState.pointerTarget) {
    liquidChromeState.pointerTarget.removeEventListener('pointermove', liquidChromePointerHandler);
    liquidChromeState.pointerTarget.removeEventListener('pointerdown', liquidChromePointerHandler);
    if (liquidChromePointerLeaveHandler && liquidChromeState.intro) {
      liquidChromeState.intro.removeEventListener('pointerleave', liquidChromePointerLeaveHandler);
    }
  }

  liquidChromePointerHandler = null;
  liquidChromePointerLeaveHandler = null;

  if (liquidChromeState && liquidChromeState.loseContext) {
    liquidChromeState.loseContext.loseContext();
  }
  liquidChromeState = null;

  const intro = document.getElementById('liquid-chrome-intro');
  if (intro) {
    intro.remove();
  }
  window.introOverlayActive = false;

  // Restore all sections visibility
  restoreOriginalContent();

  // Unlock scroll
  unlockScroll();

  // Dispatch custom event to trigger hero animations
  const introCompleteEvent = new CustomEvent('intro-complete');
  document.dispatchEvent(introCompleteEvent);
  console.log('%c📤 Dispatched intro-complete event', 'color: #88ce02;');

  // Also call the global function directly as a fallback with retry mechanism
  let retryCount = 0;
  const maxRetries = 10;
  const retryInterval = 50;

  function tryTriggerHero() {
    if (window.triggerHeroAnimations) {
      console.log('%c🔄 Calling triggerHeroAnimations (attempt ' + (retryCount + 1) + ')', 'color: #88ce02;');
      window.triggerHeroAnimations();
    } else if (retryCount < maxRetries) {
      retryCount++;
      console.log('%c⏳ Waiting for triggerHeroAnimations... (attempt ' + retryCount + '/' + maxRetries + ')', 'color: #ffa500;');
      setTimeout(tryTriggerHero, retryInterval);
    } else {
      console.error('❌ window.triggerHeroAnimations not available after ' + maxRetries + ' retries');
    }
  }

  // Start trying immediately
  tryTriggerHero();

  console.log('%c✅ Intro sequence complete', 'color: #51cf66; font-weight: bold;');
}

/**
 * Inject CSS styles for the liquid chrome intro
 */
function injectLiquidChromeStyles() {
  const style = document.createElement('style');
  style.id = 'liquid-chrome-intro-styles';
  style.textContent = `
    /* Liquid Chrome Intro Container */
    #liquid-chrome-intro {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 10000;
      overflow: hidden;
      background: #0b0b0b;
    }

    /* WebGL Liquid Chrome Background Canvas */
    .liquid-chrome-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    #liquid-chrome-canvas {
      width: 100%;
      height: 100%;
      display: block;
      background: #0b0b0b;
      pointer-events: none;
    }

    /* CSS Fallback with animated gradient - Chrome-like appearance */
    .liquid-chrome-css-fallback {
      background:
        radial-gradient(ellipse at top left, rgba(220, 220, 228, 0.9), transparent 50%),
        radial-gradient(ellipse at top right, rgba(200, 200, 210, 0.9), transparent 50%),
        radial-gradient(ellipse at bottom left, rgba(190, 190, 200, 0.9), transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(230, 230, 236, 0.9), transparent 50%),
        linear-gradient(135deg, #d5d6dc, #f1f2f4, #bfc0c8, #e3e4ea);
      background-size: 200% 200%, 200% 200%, 200% 200%, 200% 200%, 100% 100%;
      animation: chromeShineFallback 8s ease-in-out infinite;
    }

    .liquid-chrome-gradient {
      position: absolute;
      top: -10%;
      left: -10%;
      width: 120%;
      height: 120%;
      background:
        linear-gradient(
          60deg,
          transparent 30%,
          rgba(255, 255, 255, 0.25) 50%,
          transparent 70%
        ),
        linear-gradient(
          45deg,
          #d9dadf 0%,
          #c3c4cc 25%,
          #f6f6f7 35%,
          #b9bac2 55%,
          #e5e6ec 75%,
          #d0d1d7 100%
        );
      background-size: 300% 300%, 400% 400%;
      animation: liquidChromeFlow 12s ease infinite, shimmerEffect 3s ease-in-out infinite;
      filter: blur(30px) saturate(1.2);
      opacity: 0.95;
      mix-blend-mode: screen;
    }

    @keyframes liquidChromeFlow {
      0%, 100% {
        background-position: 0% 0%, 0% 50%;
      }
      25% {
        background-position: 100% 50%, 50% 100%;
      }
      50% {
        background-position: 50% 100%, 100% 50%;
      }
      75% {
        background-position: 100% 50%, 50% 0%;
      }
    }

    @keyframes chromeShineFallback {
      0%, 100% {
        background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0%, center;
      }
      50% {
        background-position: 100% 100%, 0% 0%, 100% 0%, 0% 100%, center;
      }
    }

    @keyframes shimmerEffect {
      0%, 100% {
        opacity: 0.9;
      }
      50% {
        opacity: 1;
      }
    }

    /* Intro Content */
    .intro-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      padding: 2rem;
      gap: 1.5rem;
    }

    .intro-text {
      width: min(800px, 92vw);
      height: auto;
      display: block;
    }

    /* Intro Explore Button */
    .intro-explore-btn {
      width: 180px;
      height: auto;
      cursor: pointer;
      transition: transform 0.3s ease, filter 0.3s ease;
      margin: 0 auto;
      display: block;
      z-index: 100;
      pointer-events: auto;
    }

    .intro-explore-btn.is-disabled {
      opacity: 0.55;
      filter: grayscale(0.2) brightness(0.9);
      cursor: not-allowed;
      transform: none;
      pointer-events: none;
    }

    .intro-loading {
      width: min(180px, 70vw);
      height: 8px;
      margin-top: 0.6rem;
      opacity: 0.9;
      transition: opacity 0.6s ease, visibility 0s linear 0.6s;
    }

    .intro-loading-track {
      width: 100%;
      height: 100%;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.5);
      overflow: hidden;
      box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.2);
    }

    .intro-loading-progress {
      width: 0%;
      height: 100%;
      border-radius: inherit;
      background: #ffffff;
      box-shadow: 0 0 16px rgba(255, 255, 255, 0.8);
      transition: width 0.3s ease;
    }

    .intro-loading.is-complete {
      opacity: 0;
      visibility: hidden;
    }

    .intro-explore-btn:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
    }

    .intro-explore-btn:focus {
      outline: 2px solid rgba(190, 190, 200, 0.7);
      outline-offset: 6px;
    }

    /* Intro Sticky Note */
    .intro-sticky-note {
      position: absolute;
      bottom: 8%;
      right: 5%;
      width: 130px;
      height: auto;
      transform: rotate(8deg);
      filter: drop-shadow(0 6px 15px rgba(0, 0, 0, 0.3));
      z-index: 15;
      pointer-events: none;
      animation: stickyNoteFloat 4s ease-in-out infinite;
    }

    @keyframes stickyNoteFloat {
      0%, 100% {
        transform: rotate(8deg) translateY(0);
      }
      50% {
        transform: rotate(8deg) translateY(-8px);
      }
    }

    /* Liquid Wash Overlay */
    .liquid-wash-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(185, 185, 194, 0.85) 20%,
        rgba(230, 230, 234, 0.95) 40%,
        rgba(200, 200, 206, 0.9) 55%,
        rgba(235, 235, 238, 0.9) 70%,
        rgba(190, 190, 198, 0.85) 85%,
        transparent 100%
      );
      display: none;
      z-index: 10002;
      pointer-events: none;
      box-shadow:
        inset 0 0 100px rgba(255, 255, 255, 0.15),
        0 0 100px rgba(190, 190, 200, 0.4);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .intro-content {
        padding: 1.5rem;
        gap: 1rem;
      }

      .intro-text {
        width: min(500px, 85vw);
      }

      .intro-explore-btn {
        width: 140px;
      }

      .intro-loading {
        width: min(140px, 70vw);
        height: 6px;
      }

      .intro-sticky-note {
        width: 90px;
        bottom: auto;
        top: 12%;
        right: 5%;
      }
    }

    @media (max-width: 480px) {
      .intro-content {
        padding: 1rem;
        gap: 0.8rem;
      }

      .intro-text {
        width: min(380px, 90vw);
      }

      .intro-explore-btn {
        width: 110px;
      }

      .intro-loading {
        width: min(110px, 75vw);
        height: 5px;
      }

      .intro-sticky-note {
        width: 70px;
        top: 10%;
        right: 3%;
      }
    }
  `;

  document.head.appendChild(style);
}
