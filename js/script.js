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

                // 1. Capturar os dados que o cliente digitou
                const formData = {
                    nome: document.getElementById('nome').value,
                    telefone: document.getElementById('telefone').value,
                    email: document.getElementById('email').value
                };

                // 2. Enviar esses dados para o arquivo PHP (que roda agora lá no servidor da Hostinger)
                fetch('processa_formulario.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    // Limpar formulário e resetar botão
                    form.reset();
                    form.classList.remove('was-validated');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Exibir alerta de sucesso ou falha na tela para o cliente
                    if (data.success) {
                        successMsg.classList.remove('d-none');
                        successMsg.classList.remove('alert-danger');
                        successMsg.classList.add('alert-success');
                        successMsg.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Cadastro realizado com sucesso! Em breve entraremos em contato.';
                    } else {
                        successMsg.classList.remove('d-none');
                        successMsg.classList.remove('alert-success');
                        successMsg.classList.add('alert-danger');
                        successMsg.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> Erro ao tentar cadastrar. Tente novamente mais tarde.';
                        console.error('Erro PHP:', data.message);
                    }
                    
                    // Sumir com a mensagem depois de 5 segundos
                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 5000);
                })
                .catch(error => {
                    // Caso dê algum erro grave de rede (ex: sem internet)
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    successMsg.classList.remove('d-none');
                    successMsg.classList.remove('alert-success');
                    successMsg.classList.add('alert-danger');
                    successMsg.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> Erro de conexão com o servidor.';
                    
                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 5000);
                });
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
