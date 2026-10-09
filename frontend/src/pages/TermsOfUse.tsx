export default function TermsOfUse() {
  return (
    <main className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <header className="border-b border-slate-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            MarketElectro
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Dernière mise à jour : 9 octobre 2026
          </p>
        </header>

        <div className="mt-8 space-y-10 text-sm leading-7 text-slate-600">
          <p>
            Les présentes Conditions Générales d&apos;Utilisation définissent
            les règles d&apos;accès et d&apos;utilisation du site MarketElectro,
            accessible depuis{" "}
            <a
              href="https://code-alpha-fs-01.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
            >
              https://code-alpha-fs-01.vercel.app
            </a>
            . En utilisant le site, vous reconnaissez avoir lu et accepté ces
            conditions.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              1. Présentation du service
            </h2>
            <p className="mt-4">
              MarketElectro est une plateforme de présentation et de vente de
              produits électroniques. Elle permet notamment de consulter un
              catalogue, de créer un compte, de gérer un panier et de soumettre
              des commandes à l&apos;équipe administratrice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              2. Création et sécurité du compte
            </h2>
            <p className="mt-4">
              Certaines fonctionnalités nécessitent un compte utilisateur.
              Vous devez fournir des informations exactes, à jour et
              complètes. Vous êtes responsable de la confidentialité de vos
              identifiants et de toute activité réalisée depuis votre compte.
            </p>
            <p className="mt-4">
              L&apos;authentification peut être réalisée avec une adresse
              e-mail et un mot de passe ou avec Google OAuth. Lorsque Google
              OAuth est utilisé, les informations communiquées sont traitées
              conformément à notre{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
              >
                Politique de Confidentialité
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              3. Produits, prix et disponibilité
            </h2>
            <p className="mt-4">
              Les produits, descriptions, images, prix et stocks affichés sur
              MarketElectro sont fournis à titre informatif et peuvent être
              modifiés sans préavis. Nous faisons notre possible pour présenter
              des informations exactes, sans pouvoir garantir l&apos;absence
              totale d&apos;erreurs.
            </p>
            <p className="mt-4">
              En cas d&apos;erreur manifeste de prix, de description ou de
              disponibilité, MarketElectro peut contacter l&apos;utilisateur
              afin de corriger la commande ou la refuser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              4. Panier et soumission des commandes
            </h2>
            <p className="mt-4">
              L&apos;ajout d&apos;un produit au panier ne garantit pas sa
              disponibilité définitive. La commande est soumise lorsque
              l&apos;utilisateur confirme les articles et les informations
              demandées.
            </p>
            <p className="mt-4">
              Après soumission, le panier est vidé afin de préparer une
              nouvelle commande. Une commande distincte doit être créée pour
              tout nouvel achat.
            </p>
            <p className="mt-4">
              La commande reste soumise à la vérification et à la validation
              de l&apos;administrateur. La validation administrative confirme
              l&apos;acceptation de la commande selon les conditions
              disponibles au moment du traitement. Sauf indication contraire
              affichée lors de la commande, le site ne constitue pas, à lui
              seul, un service de paiement en ligne.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              5. Validation, rejet et annulation
            </h2>
            <p className="mt-4">
              Une commande peut être mise en attente, validée ou rejetée par
              l&apos;administrateur, notamment en cas de stock insuffisant,
              d&apos;information incomplète, d&apos;erreur ou de problème
              empêchant son traitement.
            </p>
            <p className="mt-4">
              En cas de rejet ou d&apos;annulation, les produits ne sont pas
              automatiquement replacés dans le panier. L&apos;utilisateur peut
              toutefois constituer une nouvelle commande depuis le catalogue.
              Lorsque cela est nécessaire, le stock réservé est rétabli selon
              les règles de gestion de MarketElectro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              6. Utilisation acceptable du site
            </h2>
            <p className="mt-4">
              Vous vous engagez à utiliser MarketElectro de manière licite et
              loyale. Il est interdit de tenter d&apos;accéder sans
              autorisation aux comptes, données, API ou espaces
              d&apos;administration, de perturber le fonctionnement du site,
              d&apos;introduire un code malveillant ou d&apos;utiliser le
              service à des fins frauduleuses.
            </p>
            <p className="mt-4">
              MarketElectro peut suspendre ou supprimer un compte en cas de
              violation de ces conditions, de fraude présumée ou de comportement
              portant atteinte à la sécurité du service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              7. Propriété intellectuelle
            </h2>
            <p className="mt-4">
              L&apos;identité visuelle, le nom MarketElectro, les textes,
              interfaces, logos, éléments graphiques et logiciels du site sont
              protégés par les règles applicables de propriété intellectuelle.
              Toute reproduction, modification ou réutilisation non autorisée
              est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              8. Disponibilité et responsabilité
            </h2>
            <p className="mt-4">
              MarketElectro met en œuvre des moyens raisonnables pour maintenir
              le site accessible et sécurisé. Toutefois, le service peut être
              interrompu temporairement pour maintenance, mise à jour,
              incident technique ou événement indépendant de notre volonté.
            </p>
            <p className="mt-4">
              MarketElectro ne peut être tenu responsable des dommages
              résultant d&apos;une utilisation non conforme du site, de données
              inexactes fournies par l&apos;utilisateur ou d&apos;un événement
              échappant raisonnablement à son contrôle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              9. Données personnelles et contact
            </h2>
            <p className="mt-4">
              Le traitement des données personnelles est décrit dans notre{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
              >
                Politique de Confidentialité
              </a>
              . Pour toute question, demande ou réclamation, vous pouvez
              contacter MarketElectro à l&apos;adresse suivante :{" "}
              <a
                href="mailto:amegadjinkomlanjosue@gmail.com"
                className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-800"
              >
                amegadjinkomlanjosue@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              10. Modification des conditions
            </h2>
            <p className="mt-4">
              MarketElectro peut mettre à jour les présentes conditions afin
              de refléter l&apos;évolution du service, de la réglementation ou
              de ses pratiques. La date de dernière mise à jour sera modifiée
              en conséquence. La poursuite de l&apos;utilisation du site après
              publication des changements vaut acceptation des nouvelles
              conditions.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
