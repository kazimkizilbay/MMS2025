import { useTranslation } from 'react-i18next';

export default function SoftwareSection() {
  const { t } = useTranslation();

  const softwareModules = [
    {
      title: t('software.mms_nb'),
      description: 'Gemi inşa süreçleri için kapsamlı modüller',
      icon: '🚢',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      hoverColor: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50'
    },
    {
      title: t('software.mms_srm'),
      description: 'Tedarik zinciri yönetimi modülleri',
      icon: '⚙️',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      hoverColor: 'group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50'
    },
    {
      title: t('software.mms_yacht'),
      description: 'Yat inşa süreçleri için özel modüller',
      icon: '🛥️',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      hoverColor: 'group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/50'
    }
  ];

  return (
    <section id="software" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('software.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('software.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {softwareModules.map((module, index) => (
            <div key={index} className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className={`w-16 h-16 ${module.bgColor} ${module.hoverColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                <span className="text-2xl">{module.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {module.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {module.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Tüm Modülleri Keşfet
          </button>
        </div>
      </div>
    </section>
  );
} 