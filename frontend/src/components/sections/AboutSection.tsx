import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {/* Vision */}
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('vision.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('vision.description')}
            </p>
          </div>

          {/* Mission */}
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('mission.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('mission.description')}
            </p>
          </div>

          {/* Promises */}
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('promises.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('promises.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 