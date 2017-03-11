'use strict';

module.exports = {
  forgot_password_email: function(user, req, token, mailOptions) {
    mailOptions.html = [
      'Olá ' + user.name + ',<br//>',
      'Nós recebemos uma requisição para modificar a senha da sua conta.',
      'Por favor clique no link abaixo para modificar sua senha:<br//><br//>'+
      '<a href=\''+'http://' + req.headers.host + '/reset/' + token+'\'>Alterar senha</a> <br//><br//>'+
      'Se não conseguir clicar no link, copie a URL abaixo e cole no seu navegador para completar o processo: <br//><br//>',
      'http://' + req.headers.host + '/reset/' + token,
      '<br//><br//>Este link funcionará por 1 hora ou até você alterar sua senha.',
      '<br//>Se você não solicitou a mudança da sua senha, por favor ignore este e-mail e sua conta não será modificada.'
    ].join('\n\n');
    mailOptions.subject = 'Alteração de senha';
    return mailOptions;
  }
};
