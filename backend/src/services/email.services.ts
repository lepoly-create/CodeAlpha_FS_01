import { Resend } from "resend";

let resendClient: Resend | null = null;

const getResendClient = () => {
    if (resendClient) {
        return resendClient;
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY est introuvable");
    }

    resendClient = new Resend(apiKey);
    return resendClient;
};

const escapeHtml = (
    value: string
) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

const getFrontendUrl = () => {
    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
        return "https://marketelectro.polydev.live";
    }

    const primaryUrl = frontendUrl.split(",")[0].trim();
    return primaryUrl || "https://marketelectro.polydev.live";
};

const getFrom = () => {
    const email =
        process.env.RESEND_FROM_EMAIL;

    if (!email) {
        throw new Error(
            "RESEND_FROM_EMAIL est introuvable"
        );
    }

    const name =
        process.env.RESEND_FROM_NAME ||
        "MarketElectro";

    return `"${name}" <${email}>`;
};

interface EmailMessage {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const sendEmail = async (message: EmailMessage) => {
    const { data, error } =
        await getResendClient().emails.send(message);

    if (error) {
        throw new Error(`Resend : ${error.message}`);
    }

    if (!data?.id) {
        throw new Error("Resend n'a pas confirmé l'envoi de l'e-mail");
    }
};

const buildUrl = (
    path: string,
    token: string,
) => {
    const url =
        new URL(
            path,
            getFrontendUrl(),
        );

    url.searchParams.set(
        "token",
        token,
    );

    return url.toString();
};

export const sendVerificationEmail =
    async (
        email: string,
        fullName: string,
        token: string,
    ) => {
        const url =
            buildUrl(
                "/verify-email",
                token,
            );

        const safeName =
            escapeHtml(fullName);

        await sendEmail({
                from: getFrom(),
                to: email,

                subject:
                    "Vérifiez votre adresse email - MarketElectro",

                text: `
Bonjour ${fullName},

Bienvenue sur MarketElectro.

Confirmez votre adresse email avec ce lien :

${url}

Ce lien expire dans 30 minutes.
                `.trim(),

                html: `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0"
/>
<title>Vérification MarketElectro</title>
</head>

<body style="
margin:0;
padding:40px 20px;
background:#f5f5f5;
font-family:Arial,sans-serif;
">

<div style="
max-width:600px;
margin:auto;
background:#ffffff;
border-radius:16px;
padding:40px;
">

<h1>Bienvenue sur MarketElectro</h1>

<p>Bonjour ${safeName},</p>

<p>
Merci pour votre inscription.
Confirmez votre adresse email
pour activer votre compte.
</p>

<p style="margin:32px 0;">
<a
href="${url}"
style="
display:inline-block;
padding:14px 24px;
background:#111111;
color:#ffffff;
text-decoration:none;
border-radius:10px;
font-weight:bold;
"
>
Vérifier mon adresse email
</a>
</p>

<p style="color:#666;font-size:14px;">
Ce lien expire dans 30 minutes et ne peut
être utilisé qu'une seule fois.
</p>

<p style="color:#999;font-size:12px;">
MarketElectro
</p>

</div>
</body>
</html>
                `,
            });
    };

export const sendPasswordResetEmail =
    async (
        email: string,
        fullName: string,
        token: string,
    ) => {
        const url =
            buildUrl(
                "/reset-password",
                token,
            );

        await sendEmail({
                from: getFrom(),
                to: email,

                subject:
                    "Réinitialisation de votre mot de passe - MarketElectro",

                text: `
Bonjour ${fullName},

Une demande de réinitialisation de mot de passe
a été effectuée.

Utilisez ce lien :

${url}

Ce lien expire dans 30 minutes.

Si vous n'êtes pas à l'origine de cette demande,
ignorez cet email.
                `.trim(),

                html: `
<h1>Réinitialisation du mot de passe</h1>

<p>
Bonjour ${escapeHtml(fullName)},
</p>

<p>
Une demande de réinitialisation de votre mot
de passe a été effectuée.
</p>

<p>
<a href="${url}">
Réinitialiser mon mot de passe
</a>
</p>

<p>
Ce lien expire dans 30 minutes.
</p>
                `,
            });
    };

export const sendEmailChangeEmail =
    async (
        email: string,
        fullName: string,
        token: string,
    ) => {
        const url =
            buildUrl(
                "/verify-email-change",
                token,
            );

        await sendEmail({
                from: getFrom(),
                to: email,

                subject:
                    "Confirmez votre nouvelle adresse - MarketElectro",

                text: `
Bonjour ${fullName},

Vous avez demandé à modifier votre adresse email.

Confirmez votre nouvelle adresse avec ce lien :

${url}

Ce lien expire dans 30 minutes.
                `.trim(),

                html: `
<h1>Confirmez votre nouvelle adresse</h1>

<p>
Bonjour ${escapeHtml(fullName)},
</p>

<p>
Vous avez demandé à modifier votre adresse email.
</p>

<p>
<a href="${url}">
Confirmer ma nouvelle adresse
</a>
</p>

<p>
Ce lien expire dans 30 minutes.
</p>
                `,
            });
    };

export const sendEmailChangeNotification =
    async (
        oldEmail: string,
        fullName: string,
        newEmail: string,
    ) => {
        await sendEmail({
                from: getFrom(),
                to: oldEmail,

                subject:
                    "Votre adresse email MarketElectro a été modifiée",

                text: `
Bonjour ${fullName},

L'adresse email de votre compte MarketElectro
vient d'être modifiée.

Nouvelle adresse :
${newEmail}

Si vous n'êtes pas à l'origine de cette modification,
contactez immédiatement le support.
                `.trim(),
            });
    };


export const sendContactEmailToAdmin = async (
    userEmail: string,
    fullName: string,
    messageContent: string,
) => {
    const resend = getResendClient();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.RESEND_FROM_EMAIL;

    await resend.emails.send({
        from: getFrom(), // ex: support@marketelectro.polydev.live
        to: adminEmail!,
        replyTo: userEmail, // 👈 Permet à l'admin de répondre directement au client en 1 clic
        subject: `[Support MarketElectro] Nouveau message de ${fullName}`,
        text: `
Nouveau message de contact reçu sur MarketElectro :

Nom : ${fullName}
Email : ${userEmail}

Message :
${messageContent}
        `.trim(),
        html: `
<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
  <h2 style="color: #111111; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Nouveau message de contact</h2>
  <p><strong>Nom :</strong> ${escapeHtml(fullName)}</p>
  <p><strong>Email :</strong> <a href="mailto:${userEmail}">${userEmail}</a></p>
  <div style="margin-top: 20px; background: #f9fafb; padding: 16px; border-radius: 8px;">
    <p style="margin: 0; color: #374151; white-space: pre-wrap;">${escapeHtml(messageContent)}</p>
  </div>
  <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Cliquez simplement sur "Répondre" dans votre boîte mail pour écrire directement au client.</p>
</div>
        `,
    });
};