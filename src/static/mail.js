function sendMail() {
  event.preventDefault();
  let from = document.getElementById('from');
  let message = document.getElementById('message');
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'florian.delvo@googlemail.com',
    Password: 'dasbroetchenschmecktgut',
    To: 'florian.delvo@googlemail.com',
    From: from,
    Subject: 'Contact Form Mail',
    Body: message,
  });
}

function init() {
  document.getElementById('form').onsubmit = sendMail;
}

document.onload = init;
