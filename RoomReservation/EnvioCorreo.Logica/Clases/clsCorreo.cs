using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnvioCorreo.Logica.Clases
{
    internal class clsCorreo
    {
        public void envioEmail(string stServidor, 
            string stUsuario,
            string stPassword,
            bool blConexionSegura,
            bool blAutenticacion,
            string stFrom,
            string stTo,
            string stAsunto,
            string stMensaje,
            int inTipo,
            int inPrioridad,
            string stPuerto)
        {
            try 
            {
                System.Net.Mail.MailMessage Mail = new System.Net.Mail.MailMessage();
                Mail.From = new System.Net.Mail.MailAddress(stFrom);
                Mail.To.Add(stTo);
                Mail.Subject = stAsunto;
                Mail.Body = stMensaje;

                if (inTipo == 0) Mail.IsBodyHtml = false;
                else if (inTipo == 1) Mail.IsBodyHtml = true;

                if (inPrioridad == 2) Mail.Priority = System.Net.Mail.MailPriority.High;
                else if (inPrioridad == 1) Mail.Priority = System.Net.Mail.MailPriority.Low;
                else if (inPrioridad == 0) Mail.Priority = System.Net.Mail.MailPriority.Normal;

                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
                smtp.Host = stServidor;

                if (blAutenticacion) smtp.Credentials = new System.Net.NetworkCredential(stUsuario, stPassword);
                if (stPuerto.Length > 0) smtp.Port = Convert.ToInt32(stPuerto);

                smtp.EnableSsl = blConexionSegura;
                smtp.Send(Mail);
            }    
            catch (Exception ex) { throw ex; }
        }
    }
}
