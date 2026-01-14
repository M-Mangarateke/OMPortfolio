/**
 * Work Flip Interactions - GSAP Flip Plugin
 * Click-to-enlarge with flip-to-reveal description
 */

document.addEventListener('DOMContentLoaded', () => {
  initWorkFlipInteractions();
});

let currentFlipState = null;
let isFlipActive = false;

function initWorkFlipInteractions() {
  // Get all clickable work items
  const workItems = document.querySelectorAll('.clickable-work');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'work-flip-overlay';
  document.body.appendChild(overlay);

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'work-close-btn';
  closeBtn.innerHTML = '×';
  document.body.appendChild(closeBtn);

  // Create flip instruction
  const instruction = document.createElement('div');
  instruction.className = 'work-flip-instruction';
  instruction.textContent = 'Click to flip and read description';
  document.body.appendChild(instruction);

  // Add click handlers to all work items
  workItems.forEach(item => {
    // Skip poster folder and folder image (base layers that shouldn't be clickable)
    if (item.classList.contains('poster-folder') || item.classList.contains('folder-image')) {
      return;
    }

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isFlipActive) {
        enlargeWorkItem(item, overlay, closeBtn, instruction);
      }
    });
  });

  // Close button handler
  closeBtn.addEventListener('click', () => {
    closeEnlargedItem(overlay, closeBtn, instruction);
  });

  // Overlay click handler
  overlay.addEventListener('click', () => {
    closeEnlargedItem(overlay, closeBtn, instruction);
  });

  // ESC key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFlipActive) {
      closeEnlargedItem(overlay, closeBtn, instruction);
    }
  });

  console.log('%c🔄 Work Flip Interactions Initialized', 'color: #88ce02; font-weight: bold;');
}

function enlargeWorkItem(item, overlay, closeBtn, instruction) {
  isFlipActive = true;

  // Get data attributes
  const title = item.dataset.title || 'Untitled';
  const description = item.dataset.description || 'No description available.';

  // Capture initial state
  const state = Flip.getState(item);

  // Create enlarged container
  const enlargedContainer = document.createElement('div');
  enlargedContainer.className = 'work-item-enlarged';

  // Create card structure
  const card = document.createElement('div');
  card.className = 'work-item-card';

  // Front of card (image)
  const front = document.createElement('div');
  front.className = 'work-item-front';
  const imgClone = item.cloneNode(true);
  imgClone.removeAttribute('class');
  imgClone.style.transform = 'none';
  front.appendChild(imgClone);

  // Back of card (description)
  const back = document.createElement('div');
  back.className = 'work-item-back';
  back.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;

  card.appendChild(front);
  card.appendChild(back);
  enlargedContainer.appendChild(card);

  // Position container at item's current location
  const rect = item.getBoundingClientRect();
  gsap.set(enlargedContainer, {
    position: 'fixed',
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    zIndex: 9999
  });

  // Hide original item
  gsap.set(item, { opacity: 0 });

  // Add to DOM
  document.body.appendChild(enlargedContainer);

  // Store reference
  currentFlipState = { item, enlargedContainer, card };

  // Show overlay and buttons
  overlay.classList.add('active');
  closeBtn.classList.add('active');
  instruction.classList.add('active');

  // Calculate enlarged size (responsive)
  const maxWidth = Math.min(window.innerWidth * 0.7, 600);
  const maxHeight = Math.min(window.innerHeight * 0.7, 800);

  // Animate to enlarged state using GSAP Flip
  Flip.from(state, {
    duration: 0.6,
    ease: 'power2.inOut',
    absolute: true,
    onComplete: () => {
      // Now animate to center and resize
      gsap.to(enlargedContainer, {
        left: '50%',
        top: '50%',
        width: maxWidth,
        height: maxHeight,
        xPercent: -50,
        yPercent: -50,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });

  // Add flip on click
  let isCardFlipped = false;
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    isCardFlipped = !isCardFlipped;
    card.classList.toggle('flipped');

    // Hide instruction after first flip
    if (isCardFlipped) {
      instruction.classList.remove('active');
    }
  });
}

function closeEnlargedItem(overlay, closeBtn, instruction) {
  if (!isFlipActive || !currentFlipState) return;

  const { item, enlargedContainer, card } = currentFlipState;

  // Get original position
  const rect = item.getBoundingClientRect();

  // Animate back to original position
  gsap.to(enlargedContainer, {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    xPercent: 0,
    yPercent: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      // Remove enlarged container
      enlargedContainer.remove();

      // Show original item
      gsap.to(item, { opacity: 1, duration: 0.2 });

      // Hide overlay and buttons
      overlay.classList.remove('active');
      closeBtn.classList.remove('active');
      instruction.classList.remove('active');

      // Reset state
      currentFlipState = null;
      isFlipActive = false;
    }
  });

  // If card is flipped, flip it back first
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
  }
}
