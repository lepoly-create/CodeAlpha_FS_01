export default function PrivacyPolicy() {
  return (
    <main className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <header className="border-b border-slate-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            MarketElectro
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Politique de Confidentialité
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Dernière mise à jour : 9 octobre 2026
          </p>
        </header>

        <div className="mt-8 space-y-10 text-sm leading-7 text-slate-600">
          <p>
            La présente Politique de Confidentialité décrit la manière dont
            MarketElectro, accessible depuis{" "}
            <a
              href="https://code-alpha-fs-01.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
            >
              https://code-alpha-fs-01.vercel.app
            </a>
            , collecte, utilise et protège vos informations personnelles, avec
            une attention particulière portée aux données issues de nos
            services d&apos;authentification tiers.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              1. Données collectées via Google OAuth
            </h2>
            <p className="mt-4">
              Lorsque vous choisissez de vous authentifier sur MarketElectro
              via votre compte Google, nous vous demandons l&apos;autorisation
              d&apos;accéder à certaines informations de base. Conformément au
              principe de minimisation, nous limitons cette collecte aux
              données strictement nécessaires :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-slate-800">
                  Votre adresse e-mail :
                </strong>{" "}
                utilisée comme identifiant unique pour créer votre compte,
                sécuriser votre accès et vous envoyer les confirmations liées
                à vos futures commandes.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">
                  Votre nom et prénom :
                </strong>{" "}
                enregistrés pour personnaliser votre espace client et
                préremplir vos informations de contact lors de vos achats.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">
                  Votre photo de profil (URL) :
                </strong>{" "}
                récupérée uniquement pour personnaliser l&apos;interface
                utilisateur de votre tableau de bord.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              2. Finalité et Sécurité du traitement
            </h2>
            <p className="mt-4">
              Les données recueillies par MarketElectro ont pour unique but de
              vous fournir une expérience e-commerce fluide et sécurisée.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-slate-800">
                  Protection des mots de passe :
                </strong>{" "}
                l&apos;authentification étant entièrement déléguée et gérée
                par Google, MarketElectro ne collecte, ne stocke et n&apos;a
                jamais accès à votre mot de passe.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">
                  Hébergement sécurisé :
                </strong>{" "}
                vos informations de profil sont stockées sur des bases de
                données sécurisées et protégées contre les accès non autorisés.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">
                  Confidentialité stricte :
                </strong>{" "}
                MarketElectro s&apos;engage formellement à ne jamais vendre,
                louer ou échanger vos données personnelles avec des entités
                tierces à des fins de prospection publicitaire.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              3. Vos droits et gestion des données
            </h2>
            <p className="mt-4">
              En tant qu&apos;utilisateur, vous conservez un contrôle total et
              permanent sur vos informations personnelles. Vous disposez d&apos;un
              droit d&apos;accès, de rectification et d&apos;effacement de vos
              données. Si vous souhaitez supprimer définitivement votre compte
              MarketElectro et révoquer l&apos;accès aux données fournies par
              Google, vous pouvez en faire la demande à tout moment.
            </p>
            <p className="mt-4">
              Pour exercer ces droits ou pour toute question relative à la
              gestion de vos données, veuillez nous contacter directement à
              l&apos;adresse suivante :{" "}
              <a
                href="mailto:amegadjinkomlanjosue@gmail.com"
                className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
              >
                amegadjinkomlanjosue@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
