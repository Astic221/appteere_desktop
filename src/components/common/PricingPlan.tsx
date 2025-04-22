import React from "react";

const pricingPlans = [
    {
      title: "Individuel",
      description: "Idéal pour les lecteurs solo à la recherche d'un accès illimité à nos livres numériques.",
      price: "- FCFA",
      period: "/mois",
      features: [
        "Accès illimité à tous les livres",
        "Lecture hors ligne disponible",
        "Aucune publicité",
        "Support prioritaire : 6 mois",
        "Mises à jour et nouveaux titres inclus",
      ],
    },
    {
      title: "Familial",
      description: "Parfait pour partager l'expérience de lecture avec vos proches.",
      price: "- FCFA",
      period: "/mois",
      features: [
        "Jusqu'à 5 profils de lecture",
        "Accès illimité à tous les livres",
        "Lecture hors ligne disponible",
        "Aucune publicité",
        "Support premium : 24 mois",
        "Mises à jour et nouveaux titres inclus",
      ],
    },
    {
      title: "Collectif",
      description: "Conçu pour les bibliothèques, écoles et grandes structures souhaitant un accès groupé.",
      price: "- FCFA",
      period: "/mois",
      features: [
        "Accès pour 100+ utilisateurs",
        "Gestion avancée des comptes",
        "Accès illimité à tous les livres",
        "Lecture hors ligne pour tous",
        "Support VIP : 36 mois",
        "Ajout prioritaire des nouveautés",
      ],
    },
  ];
  

const PricingSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Nos Abonnements
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Accédez à des contenus exclusifs avec nos abonnements adaptés à tous les lecteurs. Rejoignez-nous et plongez dans une expérience sans limites !
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.title}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{plan.description}</p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-2xl font-extrabold">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium
                 rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-900"
              >
                Choisir
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;