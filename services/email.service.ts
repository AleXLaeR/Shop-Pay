import { readStaticTemplate } from '@lib/utils';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';

const { GOOGLE_ID, GOOGLE_SECRET, MAILING_SERVICE_REFRESH_TOKEN, SENDER_EMAIL_ADDRESS } =
  process.env;

const oAuth2Client = new OAuth2Client(GOOGLE_ID, GOOGLE_SECRET, MAILING_SERVICE_REFRESH_TOKEN);

export default async function sendEmail(
  recipientAddress: string,
  url: string,
  subject: string,
  templateName: string,
) {
  oAuth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const { token } = await oAuth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientSecret: GOOGLE_SECRET,
      clientId: GOOGLE_ID,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken: token!,
    },
  });

  const fileContent = await readStaticTemplate(templateName, {
    user__link: url,
    user__reset: url,
    user__email: recipientAddress,
  });
  smtpTransport.sendMail(
    {
      from: SENDER_EMAIL_ADDRESS,
      to: recipientAddress,
      subject,
      html: fileContent,
    },
    (error, info) => error || info,
  );
}
