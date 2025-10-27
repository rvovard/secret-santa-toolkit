import 'dotenv/config';
import { createTransport } from 'nodemailer';
import { shuffle } from './utils.ts';
import { writeFileSync } from 'fs';
import { Buffer } from 'buffer';
import data from './data.json' with { type: 'json' };

const testing: boolean = true;

interface Guest {
  name: string
  email: string
  gifted?: Guest
}

// Tirage
const sorted = shuffle(data.guestList as Guest[]);
const len = sorted.length;
sorted.forEach((guest, idx) => {
  guest.gifted = sorted[(idx + 1) % len];
});

// Affichage / sauvegarde avant envoi
const log = sorted.map((guest) => `${guest.name} est le Secret Santa de ${guest.gifted?.name}`).join('\n');

if (testing) {
  console.log(log);
} else {
  const today = new Date();
  const timestamp = today.toISOString().replaceAll(/\D/g, '').substring(0, 14);
  writeFileSync(`SecretSanta_${timestamp}.log`, log);
}

// Envoi si tout est OK
if (!testing) {
  const transporter = createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  sorted.forEach((guest) => {
    const nameBase64 = Buffer.from(guest.gifted!.name, 'utf-8').toString('base64');
    const link = `${process.env.BASE_URL}reveal.php?name=${nameBase64}`;
    transporter.sendMail({
      from: `Secret Santa <${process.env.MAIL_SENDER}>`,
      to: guest.email,
      subject: 'Tu es le Secret Santa de...',
      html: `Ô ${guest.name} !<br />La main invisible du marché t'a choisi·e pour être le Secret Santa de... Mais de qui ? <a href="${link}" title="Mais qui donc se cache derrière ce lien ? Clique vite !">Suis ce lien pour le découvrir !</a><br />Bisous 💖🧑‍🎄`,
    });
  });
}
