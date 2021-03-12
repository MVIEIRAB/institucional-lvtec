// IMPORTANDO NODEMAILER
const nodemailer = require('nodemailer')

// CONFIGURANDO CREDENCIAIS PARA USO DO ENVIO DE EMAIL SERVIDOR => (HONSTINGER) 
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com.br",
    port: 587,
    auth: {
        user: "matheus@matheusvieiradev.com.br",
        pass: "Jacapodre123"
    }
})

class mailer {
    constructor() {
        this.from = 'matheus@matheusvieiradev.com.br'
        this.subject = 'Gestor de Projetos'
        this.text = 'Olá, agradecemos a preferência, aqui esta os dados para continuação do cadastro.'
    }

    mailerOptions(to) {
        return {
            from: this.from,
            to: to,
            subject: this.subject,
            text: `Olá, Agradecemos a preferencia aqui está seu email para continuação do cadastro, ${to}.`
        }
    }

    sendMail(to) {
        transporter.sendMail(this.mailerOptions(to), (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Enviado!')
            }
        })
    }
}

module.exports = new mailer()