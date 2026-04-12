document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('leadForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    form.reset();
                    form.classList.remove('was-validated');
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    successMsg.classList.remove('d-none');
                    
                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 5000);
                }, 1500);
            }
        }, false);
    }

    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
