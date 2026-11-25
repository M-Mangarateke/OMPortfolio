(() => {
    const reel = document.querySelector('.social-video');
    const list = reel.querySelector('.social-video-list');
    const cards = list.querySelectorAll('li');
    if (!cards.length) return;

    const controls = reel.querySelector('.social-video-controls');
    const previous = controls.querySelector('[data-reel-direction="-1"]');
    const next = controls.querySelector('[data-reel-direction="1"]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateControls() {
        const end = list.scrollWidth - list.clientWidth;
        controls.hidden = end <= 1;
        previous.setAttribute('aria-disabled', String(list.scrollLeft <= 1));
        next.setAttribute('aria-disabled', String(list.scrollLeft >= end - 1));
    }

    list.addEventListener('scroll', updateControls, { passive: true });
    new ResizeObserver(updateControls).observe(list);
    updateControls();

    controls.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-reel-direction]');
        if (!button || button.getAttribute('aria-disabled') === 'true') return;

        const step = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap);
        list.scrollBy({
            left: step * Number(button.dataset.reelDirection),
            behavior: reducedMotion.matches ? 'instant' : 'smooth'
        });
    });

    const dialog = document.querySelector('.social-video-dialog');
    if (typeof dialog.showModal !== 'function') return;

    const title = dialog.querySelector('h2');
    const player = dialog.querySelector('.social-video-player');
    const error = dialog.querySelector('.social-video-error');
    const watch = dialog.querySelector('.social-video-watch');
    let opener;

    list.addEventListener('click', (event) => {
        const link = event.target.closest('.social-video-card');
        if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const url = new URL(link.href);
        const isMux = url.origin === 'https://player.mux.com';
        const isMp4 = url.pathname.toLowerCase().endsWith('.mp4');
        if (!isMux && !isMp4) return;

        event.preventDefault();
        opener = link;
        title.textContent = link.querySelector('.social-video-card-title').textContent.trim();
        watch.href = url.href;

        const [width, height] = (link.dataset.videoSize || '1080x1920').split('x').map(Number);
        const aspect = width > 0 && height > 0 ? width / height : 9 / 16;
        player.style.setProperty('--video-aspect', aspect);

        error.hidden = true;
        dialog.showModal();

        if (isMux) {
            const iframe = document.createElement('iframe');
            iframe.title = title.textContent + ' video player';
            iframe.allow = 'encrypted-media; picture-in-picture';
            iframe.allowFullscreen = true;
            url.searchParams.set('disable-mux-data', 'true');
            iframe.src = url.href;
            player.append(iframe);
            return;
        }

        const video = document.createElement('video');
        video.controls = true;
        video.playsInline = true;
        video.preload = 'none';
        video.setAttribute('aria-label', title.textContent + ' video player');
        const captions = link.dataset.captions;
        if (captions) {
            const track = document.createElement('track');
            track.kind = 'captions';
            track.srclang = 'en';
            track.label = 'English';
            track.src = captions;
            video.append(track);
        }
        video.addEventListener('error', () => {
            error.textContent = 'The video could not load. Try opening it in a new tab.';
            error.hidden = false;
        }, { once: true });
        video.src = url.href;
        player.append(video);
        video.play().catch(() => {});
    });

    dialog.addEventListener('close', () => {
        const video = player.querySelector('video');
        if (video) {
            video.pause();
            video.removeAttribute('src');
            video.load();
        }
        player.replaceChildren();
        opener?.focus({ preventScroll: true });
    });
})();
