/**
 * Custom Text Effects - Free Alternatives to SplitText & ScrambleText
 * Provides similar functionality to premium GSAP plugins
 */

/**
 * Split text into characters and wrap each in a span
 * Free alternative to GSAP SplitText
 */
function splitTextIntoChars(element) {
  const text = element.textContent;
  element.innerHTML = '';

  const chars = text.split('');
  const spans = [];

  chars.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    // Preserve spaces
    if (char === ' ') {
      span.style.width = '0.3em';
    }
    element.appendChild(span);
    spans.push(span);
  });

  return spans;
}

/**
 * Split text into words and wrap each in a span
 */
function splitTextIntoWords(element) {
  const text = element.textContent;
  element.innerHTML = '';

  const words = text.split(' ');
  const spans = [];

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    element.appendChild(span);
    spans.push(span);

    // Add space between words (except last)
    if (index < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });

  return spans;
}

/**
 * Split text into lines and wrap each in a div
 */
function splitTextIntoLines(element) {
  const text = element.textContent;
  const words = text.split(' ');
  element.innerHTML = '';

  // Create temporary spans to detect line breaks
  const tempSpans = [];
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    element.appendChild(span);
    tempSpans.push(span);

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  // Detect lines based on vertical position
  const lines = [];
  let currentLine = [];
  let currentTop = tempSpans[0].offsetTop;

  tempSpans.forEach((span) => {
    if (span.offsetTop !== currentTop) {
      lines.push(currentLine);
      currentLine = [span.textContent];
      currentTop = span.offsetTop;
    } else {
      currentLine.push(span.textContent);
    }
  });
  lines.push(currentLine);

  // Clear and rebuild with line divs
  element.innerHTML = '';
  const lineDivs = [];

  lines.forEach((lineWords) => {
    const lineDiv = document.createElement('div');
    lineDiv.textContent = lineWords.join(' ');
    element.appendChild(lineDiv);
    lineDivs.push(lineDiv);
  });

  return lineDivs;
}

/**
 * Scramble text effect - Free alternative to GSAP ScrambleText
 */
function scrambleText(element, options = {}) {
  const finalText = options.text || element.textContent;
  const duration = options.duration || 1;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const scrambleSpeed = options.speed || 50; // ms between scrambles

  let currentText = element.textContent;
  const iterations = Math.floor((duration * 1000) / scrambleSpeed);
  let currentIteration = 0;

  const interval = setInterval(() => {
    currentIteration++;
    const progress = currentIteration / iterations;

    // Calculate how many characters should be final vs scrambled
    const revealedChars = Math.floor(finalText.length * progress);

    let newText = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < revealedChars) {
        // Character is revealed
        newText += finalText[i];
      } else if (finalText[i] === ' ') {
        // Keep spaces
        newText += ' ';
      } else {
        // Scramble this character
        newText += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = newText;

    if (currentIteration >= iterations) {
      clearInterval(interval);
      element.textContent = finalText;
      if (options.onComplete) options.onComplete();
    }
  }, scrambleSpeed);

  return interval;
}

/**
 * Scramble text with GSAP timeline integration
 */
function gsapScrambleText(element, options = {}) {
  const finalText = options.text || element.textContent;
  const duration = options.duration || 1;

  return new Promise((resolve) => {
    scrambleText(element, {
      text: finalText,
      duration: duration,
      speed: options.speed || 50,
      onComplete: resolve
    });
  });
}

// Export functions to window for global access
window.splitTextIntoChars = splitTextIntoChars;
window.splitTextIntoWords = splitTextIntoWords;
window.splitTextIntoLines = splitTextIntoLines;
window.scrambleText = scrambleText;
window.gsapScrambleText = gsapScrambleText;

console.log('%c📝 Custom Text Effects Loaded', 'color: #88ce02; font-weight: bold;');
