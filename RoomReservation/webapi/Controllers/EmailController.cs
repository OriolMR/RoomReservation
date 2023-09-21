﻿using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public EmailController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost("password/reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] EmailDataModel emailData)
        {
            try
            {
                string smtpServer = configuration["EmailSettings:SmtpServer"];
                int smtpPort = configuration.GetValue<int>("EmailSettings:SmtpPort");
                string smtpUsername = configuration["EmailSettings:SmtpUsername"];
                string smtpPassword = configuration["EmailSettings:SmtpPassword"];


                // Validar el correo electrónico aquí si es necesario.

                // Generar un token de restablecimiento de contraseña si es válido.
                string resetToken = GenerateResetToken();

                // Envía el correo electrónico de restablecimiento de contraseña.
                await SendPasswordResetEmail(emailData.emailData, resetToken, smtpServer, smtpPort, smtpUsername, smtpPassword);

                // Devuelve una respuesta exitosa al cliente.
                return Ok(new { message = "Solicitud de restablecimiento de contraseña enviada con éxito" });
            }
            catch (Exception ex)
            {
                // Maneja los errores y devuelve una respuesta de error al cliente.
                return StatusCode(500, new { message = $"Error al enviar la solicitud de restablecimiento de contraseña: {ex.Message}" });
            }
        }

        private string GenerateResetToken()
        {
            // Implementa lógica para generar un token de restablecimiento de contraseña aquí.
            return Guid.NewGuid().ToString();
        }

        private async Task SendPasswordResetEmail(string email, string resetToken, string smtpServer, int smtpPort, string smtpUsername, string smtpPassword)
        {
            using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(smtpUsername);
                mailMessage.To.Add(email);
                mailMessage.Subject = "Solicitud de Restablecimiento de Contraseña";
                mailMessage.Body = $"Haga clic en el siguiente enlace para restablecer su contraseña: https://tuapp.com/reset?token={resetToken}";

                await smtpClient.SendMailAsync(mailMessage);
            }
        }
    }
}
