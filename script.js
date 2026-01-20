{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /**\
 * Apeks Agency - Production Script\
 * Handles multi-step form navigation, UI interactions, and form processing.\
 */\
\
document.addEventListener('DOMContentLoaded', () => \{\
    // FAQ Accordion Logic\
    const faqItems = document.querySelectorAll('.faq-item');\
    \
    window.toggleFaq = (button) => \{\
        const item = button.parentElement;\
        const isActive = item.classList.contains('active');\
        \
        // Close other items for a cleaner accordion effect\
        faqItems.forEach(el => el.classList.remove('active'));\
        \
        if (!isActive) \{\
            item.classList.add('active');\
        \}\
    \};\
\
    // Form Navigation Logic\
    let currentStep = 1;\
    const totalSteps = 3;\
    const progressBar = document.getElementById('form-progress');\
    const formSteps = document.querySelectorAll('[id^="step-"]');\
    const applySection = document.getElementById('apply');\
\
    /**\
     * Navigates between form steps with validation\
     * @param \{number\} step - The target step number\
     */\
    window.nextStep = (step) => \{\
        // Simple validation for required fields when moving forward\
        if (step > currentStep) \{\
            const currentStepEl = document.getElementById(`step-$\{currentStep\}`);\
            const requiredFields = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');\
            let isValid = true;\
\
            requiredFields.forEach(field => \{\
                if (!field.value.trim()) \{\
                    field.style.borderColor = '#ef4444'; // Red-500\
                    isValid = false;\
                \} else \{\
                    field.style.borderColor = '#e5e7eb'; // Gray-200\
                \}\
            \});\
\
            if (!isValid) return;\
        \}\
\
        // Update UI Visibility\
        formSteps.forEach(el => el.classList.add('step-hidden'));\
        document.getElementById(`step-$\{step\}`).classList.remove('step-hidden');\
\
        // Update Progress Bar\
        currentStep = step;\
        const progressPercentage = (currentStep / totalSteps) * 100;\
        if (progressBar) \{\
            progressBar.style.width = `$\{progressPercentage\}%`;\
        \}\
\
        // Smooth scroll to top of form for mobile users\
        if (applySection) \{\
            applySection.scrollIntoView(\{ behavior: 'smooth', block: 'start' \});\
        \}\
    \};\
\
    // Form Submission Handling\
    const apeksForm = document.getElementById('apeks-form');\
    const applicationContainer = document.getElementById('application-container');\
    const successMessage = document.getElementById('success-message');\
\
    if (apeksForm) \{\
        apeksForm.addEventListener('submit', async (event) => \{\
            event.preventDefault();\
            \
            // Collect Form Data\
            const formData = new FormData(apeksForm);\
            const data = Object.fromEntries(formData.entries());\
\
            // UI Transition to Success\
            if (applicationContainer && successMessage) \{\
                applicationContainer.style.opacity = '0';\
                applicationContainer.style.transform = 'translateY(10px)';\
                \
                setTimeout(() => \{\
                    applicationContainer.style.display = 'none';\
                    successMessage.classList.remove('hidden');\
                    successMessage.style.opacity = '0';\
                    successMessage.style.display = 'block';\
                    \
                    // Trigger fade in for success message\
                    requestAnimationFrame(() => \{\
                        successMessage.style.transition = 'opacity 0.5s ease';\
                        successMessage.style.opacity = '1';\
                    \});\
                \}, 400);\
            \}\
\
            /**\
             * For production: Replace console log with actual API endpoint\
             * Example: fetch('https://api.apeks.agency/apply', \{ method: 'POST', body: JSON.stringify(data) \})\
             */\
            console.log('Application Data Received:', data);\
        \});\
    \}\
\
    // Scroll Reveal / Sticky Nav Logic (Optional)\
    let lastScroll = 0;\
    const nav = document.querySelector('nav');\
    \
    window.addEventListener('scroll', () => \{\
        const currentScroll = window.pageYOffset;\
        if (currentScroll <= 0) \{\
            nav.style.boxShadow = 'none';\
            return;\
        \}\
        \
        if (currentScroll > lastScroll) \{\
            // Scrolling down\
            nav.style.transform = 'translateY(-100%)';\
        \} else \{\
            // Scrolling up\
            nav.style.transform = 'translateY(0)';\
            nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';\
        \}\
        lastScroll = currentScroll;\
    \}, \{ passive: true \});\
\});}