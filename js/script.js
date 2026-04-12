// Executar quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    
    // Configuração para validação do formulário (Bootstrap Standard)
    const form = document.getElementById('leadForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function (event) {
            // Previne o envio padrao em qualquer caso
            event.preventDefault();

            // Verifica as regras de validação do HTML5 / Bootstrap
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                // Se válido, simula um envio de dados assíncrono (ex: AJAX para API)
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Animação de carregamento no botão
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...';
                submitBtn.disabled = true;

                // Simulando tempo de resposta do servidor
                setTimeout(() => {
                    // Esconde o formulário ou limpa os campos
                    form.reset();
                    form.classList.remove('was-validated');
                    
                    // Retorna botão ao estado original
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Mostra mensagem de sucesso
                    successMsg.classList.remove('d-none');
                    
                    // Oculta a mensagem após 5 segundos
                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 5000);
                }, 1500);
            }
        }, false);
    }

    // Código para adicionar fundo opaco no Navbar ao rolar a página
    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
