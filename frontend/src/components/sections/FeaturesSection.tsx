import { useTranslation } from 'react-i18next';
import { CheckCircle, Globe, Cog, Layers, DollarSign } from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const featureIcons = [CheckCircle, Globe, Layers, Cog, DollarSign];
  const gradients = [
    "from-green-500 to-emerald-500",
    "from-red-500 to-red-600",
    "from-blue-500 to-purple-500",
    "from-orange-500 to-red-500",
    "from-yellow-500 to-orange-500"
  ];

  const features = (t('features.list', { returnObjects: true }) as Array<{title: string, description: string}>).map((feature, index) => ({
    ...feature,
    icon: featureIcons[index] || CheckCircle,
    gradient: gradients[index] || gradients[0]
  }));

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/15 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 dark:bg-slate-800/80 dark:border-slate-700 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t('features.badge', { defaultValue: 'Özellikler' })}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-50 mb-8">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
} 