// CV Request Modal Functionality
(function() {
    'use strict';

    const modal = document.getElementById('cvModal');
    const form = document.getElementById('cvRequestForm');
    const successMessage = document.getElementById('cvSuccessMessage');
    const requestBtn = document.querySelector('.cv-request-btn');
    const closeBtn = modal?.querySelector('.cv-modal-close');
    const closeSuccessBtn = modal?.querySelector('.cv-close-success-btn');
    const submitBtn = form?.querySelector('.cv-submit-btn');

    // Open modal
    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset form after closing (with delay for animation)
            setTimeout(() => {
                resetForm();
            }, 300);
        }
    }

    // Reset form to initial state
    function resetForm() {
        if (form) {
            form.reset();
            form.classList.remove('hidden');
        }
        if (successMessage) {
            successMessage.classList.remove('active');
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';
        }
    }

    // Show success message
    function showSuccess() {
        if (form) {
            form.classList.add('hidden');
        }
        if (successMessage) {
            successMessage.classList.add('active');
        }
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        if (!form || !submitBtn) return;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const formData = new FormData(form);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                showSuccess();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show error state
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.disabled = false;

            // Reset button text after delay
            setTimeout(() => {
                submitBtn.textContent = 'Submit Request';
            }, 3000);
        }
    }

    // Event listeners
    if (requestBtn) {
        requestBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click (not modal content)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
})();
