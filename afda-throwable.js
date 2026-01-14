/**
 * AFDA Logo Throwable - Interactive Draggable Logo
 * Dragging disabled per request.
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const afdaLogo = document.querySelector('.afda-logo');

  if (!afdaLogo) {
    console.warn('AFDA logo not found for draggable disable');
    return;
  }

  console.log('AFDA logo dragging disabled');
});
