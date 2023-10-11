using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public EmailController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> RequestPasswordReset([FromBody] EmailDataModel emailData)
        {
            try
            {
                string smtpServer = configuration["EmailSettings:stServidor"];
                int smtpPort = configuration.GetValue<int>("EmailSettings:stPuerto");
                string smtpUsername = configuration["EmailSettings:stUsuario"];
                string smtpPassword = configuration["EmailSettings:stPassword"];


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
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "<p style=\"color:#000000\";>Hola, <br><br> Hace unos momentos se ha enviado una peticion de " +
                    "restablecimiento de contraseña, para un usuario de ACME, ha esta dirreccion de correo electronico. <br><br> " +
                    "<strong>Si no ha sido usted, por favor, ignore este mensaje</strong>. Cualquier mal uso de dicho " +
                    "correo podria resultar en consequencias legales. <br><br> " +
                    "En caso contrario, por favor, dirijase al siguiente enlace para cambiar su contraseña. " +
                    $"https://tuapp.com/reset?token={resetToken}. <br><br> " +
                    "Cordialmente, <br> " +
                    "El equipo de atencion al cliente de ACME </p>";

                await smtpClient.SendMailAsync(mailMessage);
            }
        }
    }
}

