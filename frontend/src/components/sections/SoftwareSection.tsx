import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Ship, 
  Wrench, 
  Anchor, 
  Cpu, 
  Brain,
  Zap,
  Shield,
  BarChart3,
  Cog,
  Users,
  Calendar,
  FileText,
  Truck,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Settings,
  Target,
  TrendingUp
} from 'lucide-react';

export function SoftwareSection() {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState('nb');

  // Icon mappings for modules
  const moduleIcons = {
    nb: [Brain, Cog, TrendingUp, Cpu, CheckCircle, Truck, BarChart3, Settings, FileText, FileText, Users, Cog, Truck, Shield, Truck, Users, Ship, DollarSign, Shield, Truck, DollarSign, Users, AlertTriangle, FileText, BarChart3, Target, Users],
    srm: [Calendar, Brain, AlertTriangle, Users, TrendingUp, Truck, BarChart3, FileText, Users, Target, FileText, Truck, Cog, Users, Cog, CheckCircle, FileText, DollarSign, Users, Ship, Shield],
    yacht: [Brain, Users, Target, CheckCircle, Cog, Cpu, BarChart3, Truck, Users, FileText, FileText, Cog, Cog, Cog, Truck, Truck, Users, DollarSign, Shield]
  };

  const modules = {
    nb: {
      title: t('software.modules.nb.title'),
      description: t('software.modules.nb.description'),
      icon: Ship,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      features: (t('software.modules.nb.features', { returnObjects: true }) as string[]).map((name: string, index: number) => ({
        name,
        icon: moduleIcons.nb[index] || FileText
      }))
    },
    srm: {
      title: t('software.modules.srm.title'),
      description: t('software.modules.srm.description'),
      icon: Wrench,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      features: (t('software.modules.srm.features', { returnObjects: true }) as string[]).map((name: string, index: number) => ({
        name,
        icon: moduleIcons.srm[index] || FileText
      }))
    },
    yacht: {
      title: t('software.modules.yacht.title'),
      description: t('software.modules.yacht.description'),
      icon: Anchor,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      features: (t('software.modules.yacht.features', { returnObjects: true }) as string[]).map((name: string, index: number) => ({
        name,
        icon: moduleIcons.yacht[index] || FileText
      }))
    }
  };

  return (
    <section id="software" className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-tr from-blue-200/30 to-purple-300/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-300/30 dark:from-green-600/20 dark:to-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-2 duration-700">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 border border-blue-200/50 dark:border-blue-700/50">
            <Cpu className="w-4 h-4 mr-2" />
            {t('software.title')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-50 mb-8">
            {t('software.title')}
          </h2>
          <p className="text-xl text-gray-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {t('software.description')}
          </p>
        </div>

        {/* Module Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {Object.entries(modules).map(([key, module]) => {
            const IconComponent = module.icon;
            const isActive = activeModule === key;

            return (
              <button
                key={key}
                onClick={() => setActiveModule(key)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? `bg-gradient-to-r ${module.gradient} text-white shadow-xl`
                    : `bg-white border border-gray-300 text-gray-700 dark:bg-slate-800/80 dark:border-slate-700/50 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-lg shadow-sm`
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{module.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Content */}
        <div key={activeModule} className="bg-white border border-gray-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-2 duration-700">
          <div className={`bg-gradient-to-r ${modules[activeModule as keyof typeof modules].gradient} p-8 text-white`}>
            <div className="flex items-center space-x-4 mb-4">
              {(() => {
                const IconComponent = modules[activeModule as keyof typeof modules].icon;
                return <IconComponent className="w-8 h-8" />;
              })()}
              <h3 className="text-3xl font-bold">
                {modules[activeModule as keyof typeof modules].title}
              </h3>
            </div>
            <p className="text-lg opacity-90 leading-relaxed">
              {modules[activeModule as keyof typeof modules].description}
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules[activeModule as keyof typeof modules].features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-6 bg-gray-50 border border-gray-200 dark:bg-gray-800/70 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${modules[activeModule as keyof typeof modules].gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-gray-300 font-medium">
                      {feature.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MMS Paketleri Section */}
        <div className="mt-24 mb-16">
          <div id="packages" className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('packages.title')}
            </h3>
            <p className="text-xl text-gray-700 dark:text-slate-300 max-w-3xl mx-auto">
              {t('packages.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Starter Package */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Ship className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('packages.starter.title')}
                </h4>
                <ul className="space-y-3 mb-8">
                  {(t('packages.starter.features', { returnObjects: true }) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {t('packages.starter.cta')}
                </button>
              </div>
            </div>

            {/* Professional Package */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                {t('packages.popular')}
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('packages.professional.title')}
                </h4>
                <ul className="space-y-3 mb-8">
                  {(t('packages.professional.features', { returnObjects: true }) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {t('packages.professional.cta')}
                </button>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Anchor className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('packages.enterprise.title')}
                </h4>
                <ul className="space-y-3 mb-8">
                  {(t('packages.enterprise.features', { returnObjects: true }) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {t('packages.enterprise.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Teknik Yapılabilirlik Section */}
        <div className="mt-24 mb-16">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-12 text-center">
                {t('technical.title')}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Kullanılan Teknolojiler */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{t('technical.technologies.title')}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {t('technical.technologies.description')}
                  </p>
                </div>

                {/* Mevcut Altyapı Uyumluluğu */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{t('technical.infrastructure.title')}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {t('technical.infrastructure.description')}
                  </p>
                </div>

                {/* Entegrasyon */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{t('technical.integration.title')}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {t('technical.integration.description')}
                  </p>
                </div>
              </div>

              {/* Ekip Yetkinlikleri */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-bold mb-6 text-center">{t('technical.team.title')}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(t('technical.team.skills', { returnObjects: true }) as Array<{title: string, description: string}>).map((skill, index) => {
                    const icons = [Cpu, Users, FileText, Shield, Target, BarChart3, CheckCircle, Settings];
                    const Icon = icons[index] || Cpu;
                    const gradients = [
                      'from-blue-400 to-cyan-400',
                      'from-purple-400 to-pink-400',
                      'from-green-400 to-emerald-400',
                      'from-orange-400 to-red-400',
                      'from-yellow-400 to-orange-400',
                      'from-pink-400 to-red-400',
                      'from-indigo-400 to-purple-400',
                      'from-cyan-400 to-blue-400'
                    ];
                    
                    return (
                      <div key={index} className="text-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h5 className="font-semibold mb-2">{skill.title}</h5>
                        <p className="text-sm text-gray-300">{skill.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
} 