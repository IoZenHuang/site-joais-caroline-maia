<?php
// Permite requisições do próprio site
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Recebe os dados em formato JSON que vêm do Javascript
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Nenhum dado recebido.']);
    exit;
}

$nome = $data['nome'] ?? '';
$telefone = $data['telefone'] ?? '';
$email = $data['email'] ?? '';

// Validação simples para ter certeza de que nada veio vazio
if (empty($nome) || empty($telefone) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos.']);
    exit;
}

// ==========================================
// 1. CONFIGURAÇÕES DE ENVIO DE E-MAIL
// ==========================================

// Vi que no seu footer você atualizou o email, então enviaremos para ele!
$to = 'carolinemaiasemijoias@hotmail.com';
$subject = 'Novo Cadastro no Site - Caroline Maia Joias';

// Corpo do e-mail que vai chegar para você
$message = "Olá, Caroline!\n\n";
$message .= "Você recebeu um novo cadastro de lead pelo seu site.\n\n";
$message .= "DADOS DO CLIENTE:\n";
$message .= "--------------------\n";
$message .= "Nome: " . $nome . "\n";
$message .= "WhatsApp: " . $telefone . "\n";
$message .= "E-mail: " . $email . "\n";
$message .= "--------------------\n\n";
$message .= "Mensagem enviada automaticamente pelo sistema do site.";

// Cabeçalhos do e-mail
// MUITO IMPORTANTE: Quando você conectar um domínio seu ao site (ex: carolinesemijoias.com.br), 
// altere o "From" abaixo para um email do seu domínio, como contato@carolinesemijoias.com.br.
// Isso evita que o e-mail caia na caixa de SPAM do Hotmail.
$headers = "From: site@seudominio.com.br" . "\r\n" .
           "Reply-To: " . $email . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Tenta enviar o email
$mailSent = mail($to, $subject, $message, $headers);


// ==========================================
// 2. (OPCIONAL) SALVAR CADASTRADOS NO BANCO DE DADOS (MySQL) DA HOSTINGER
// ==========================================
// Como você comentou sobre "Banco de Dados na plataforma", deixei o código pronto!
// Se você tiver criado um Banco de Dados MySQL no painel da Hostinger ("Bancos de Dados" -> "Gerenciamento"),
// basta apagar o /* e o */ que envolve o bloco abaixo e colocar os dados que a Hostinger te deu:

/*
$host = "localhost"; // Na Hostinger, geralmente é "localhost"
$nome_bd = "u123456789_nome_do_seu_banco"; // O nome do banco criado lá
$usuario_bd = "u123456789_usuario";        // O usuário do banco
$senha_bd = "SuaSenhaSegura@123";          // A senha do banco de dados

try {
    $conn = new PDO("mysql:host=$host;dbname=$nome_bd;charset=utf8", $usuario_bd, $senha_bd);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Insere o cliente na tabela (Lembre-se de criar uma tabela chamada 'clientes' com essas colunas lá no phpMyAdmin)
    $sql = "INSERT INTO clientes (nome, telefone, email) VALUES (:nome, :telefone, :email)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
} catch(PDOException $e) {
    // Se der erro de banco, não avisa o cliente pra não assustar, mas guarda o log
    error_log("Erro ao salvar no banco de dados: " . $e->getMessage());
}
*/
// ==========================================


// Responde de volta para o JavaScript se tudo deu certo
if ($mailSent) {
    echo json_encode(['success' => true]);
} else {
    // No ambiente local do seu PC o email vai falhar porque não tem servidor de email rodando,
    // mas na Hostinger vai retornar sucesso.
    echo json_encode(['success' => false, 'message' => 'Não foi possível enviar o email a partir deste servidor.']);
}
?>
