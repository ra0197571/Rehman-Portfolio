document.addEventListener('DOMContentLoaded', () => {

    // 1. AOS (Animate on Scroll) Initialization
    AOS.init({
        duration: 1000, 
        once: true, 
        offset: 50, // element dikhne se 50px pehle animate ho
    });

    // 2. Expertise Tabs Logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 3. Navbar Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // 80 is navbar height + buffer
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
});

// NOTE: Your original Animated Graph Script from HTML is removed as it was not in the contact section anymore.
// If you want to add it back somewhere else, you can place this code inside the DOMContentLoaded event listener.
// For example:
/*
    const canvas = document.getElementById('animatedGraphCanvas');
    if (canvas) {
        // ... paste the canvas script here ...
    }
*/
// script.js ke akhir mein yeh poora code paste karein

// ===== START: CONTACT FORM SUBMISSION LOGIC =====

const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

async function handleSubmit(event) {
  event.preventDefault(); // Default form submission ko roko (page reload na ho)
  
  const formData = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json' // Formspree ko batao ke JSON response chahiye
      }
    });

    if (response.ok) {
      // Agar submission کامیاب ho gaya
      statusDiv.innerHTML = "Thank you for your message! I will get back to you soon.";
      statusDiv.className = 'success'; // Green success style lagao
      form.reset(); // YEH LINE FORM KO CLEAR KAR DEGI
    } else {
      // Agar Formspree se koi error aaya
      statusDiv.innerHTML = "Oops! There was a problem submitting your form. Please try again.";
      statusDiv.className = 'error'; // Red error style lagao
    }
  } catch (error) {
    // Agar network ya koi aur masla ho
    statusDiv.innerHTML = "Oops! A network error occurred. Please check your connection.";
    statusDiv.className = 'error'; // Red error style lagao
  }
}

// Form ke submit event par 'handleSubmit' function ko chalao
form.addEventListener("submit", handleSubmit);

// ===== END: CONTACT FORM SUBMISSION LOGIC =====