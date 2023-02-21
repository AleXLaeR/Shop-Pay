import { readStaticTemplate } from '@lib/utils';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const { OAuth2 } = google.auth;

const { GOOGLE_ID, GOOGLE_SECRET, MAILING_SERVICE_REFRESH_TOKEN, SENDER_EMAIL_ADDRESS } =
  process.env;

const oAuth2Client = new OAuth2(GOOGLE_ID, GOOGLE_SECRET, MAILING_SERVICE_REFRESH_TOKEN);

export default async function sendEmail(recipientAddress: string, url: string, subject: string) {
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

  const fileContent = await readStaticTemplate('verifyEmail', {
    user__link: url,
    user__email: recipientAddress,
  });
  await smtpTransport.sendMail(
    {
      from: SENDER_EMAIL_ADDRESS,
      to: recipientAddress,
      subject,
      html: fileContent,
    },
    (error, info) => error || info,
  );
}
