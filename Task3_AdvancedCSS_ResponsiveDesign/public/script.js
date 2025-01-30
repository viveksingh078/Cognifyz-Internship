// JavaScript for any interactive functionality (e.g., smooth scroll, dynamic animations)

// Example: Smooth scroll to features section
document.querySelector('a[href="#features"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
});
