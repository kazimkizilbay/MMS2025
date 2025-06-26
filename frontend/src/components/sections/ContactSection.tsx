import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send, User, Building, MessageSquare, Instagram, Linkedin, Facebook, MessageCircle, Globe, CheckCircle, X } from 'lucide-react';

export default function ContactSection() {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Helper function to safely get array from translation
  const getTranslationArray = (key: string, fallback: string[] = []): string[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : fallback;
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: t('contact.info.emailText'),
      bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      iconColor: 'text-white',
      link: `mailto:${t('contact.info.emailText')}`
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: t('contact.info.phoneText'),
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
      iconColor: 'text-white',
      link: `tel:${t('contact.info.phoneText').replace(/\s/g, '')}`
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      value: t('contact.info.addressText'),
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      iconColor: 'text-white',
      link: 'https://maps.app.goo.gl/gZESRYuJidHbSQpB9'
    },
    {
      icon: Clock,
      title: t('contact.info.workingHours'),
      value: t('contact.info.workingHoursText'),
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
      iconColor: 'text-white'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/marinemanagementsystem/',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/mms-erp',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61560348505866',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      url: 'https://wa.me/+905075742666',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      name: 'Website',
      url: 'http://www.marinemanagementsystem.com',
      color: 'from-gray-600 to-gray-700'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`MMS Demo Talebi - ${formData.name} ${formData.surname}`);
    const body = encodeURIComponent(`
🚢 Marine Management System Demo Talebi

Kişi Bilgileri:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Ad Soyad: ${formData.name} ${formData.surname}
📧 E-posta: ${formData.email}
📞 Telefon: ${formData.phone}
${formData.company ? `Şirket: ${formData.company}` : ''}

Mesaj:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Bu kişi MMS demo talep formunu doldurmuştur.
📅 Lütfen en kısa sürede demo randevusu planlayınız.

🌐 Website: www.marinemanagementsystem.com
    `);
    
    const mailtoLink = `mailto:info@marinemanagementsystem.com?subject=${subject}&body=${body}`;
    
    // Open user's default mail application
    window.location.href = mailtoLink;
    
    // Show success message after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', surname: '', email: '', phone: '', company: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsFormOpen(false);
      }, 3000);
    }, 1000);
  };

  const openDemoForm = () => {
    setIsFormOpen(true);
    setSubmitStatus('idle');
  };

  const closeDemoForm = () => {
    setIsFormOpen(false);
    setSubmitStatus('idle');
  };

  // Listen for openDemoForm event from header to open demo modal
  useEffect(() => {
    const listener = () => openDemoForm();
    window.addEventListener('openDemoForm', listener);
    return () => {
      window.removeEventListener('openDemoForm', listener);
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/15 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200 text-sm font-medium mb-8 shadow-sm">
            <Mail className="w-4 h-4 mr-2" />
            {t('contact.title')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-50 mb-8">
            {t('contact.subtitle')}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const CardContent = (
              <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${info.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 text-center">
                    {info.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                    {info.value}
                  </p>
                </div>
              </div>
            );

            return info.link ? (
              <a key={index} href={info.link} target="_blank" rel="noopener noreferrer" className="block">
                {CardContent}
              </a>
            ) : (
              <div key={index}>
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Demo CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden mb-20">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Decorative AI Elements */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-12 w-3 h-3 bg-white/30 rounded-full animate-ping delay-500"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-700">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              {t('contact.hero.badge', { defaultValue: 'Yapay Zeka Destekli' })}
            </div>
            
            <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-slate-50">
              {t('contact.hero.title')}<br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {t('contact.hero.subtitle')}
              </span>
            </h3>
            
            <p className="text-xl mb-8 text-gray-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {t('contact.hero.description')}
            </p>
            
            {/* Key Features Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {getTranslationArray('contact.hero.features', []).map((feature, index) => {
                const icons = ['🤖', '🚢', '🇹🇷', '⚡'];
                return (
                  <div key={index} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                    {icons[index]} {feature}
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openDemoForm}
                data-demo-trigger
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                {t('contact.hero.cta')}
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2">
                <span>📋</span>
                {t('contact.hero.ctaSecondary')}
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8">
            {t('contact.social.title')}
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group-hover:-translate-y-1`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                  Demo Talep Formu
                </h3>
                <button
                  onClick={closeDemoForm}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                    Mail Uygulamanız Açıldı!
                  </h4>
        <p className="text-gray-700 dark:text-gray-300">
                    Demo talebiniz hazırlandı. Mail uygulamanızdan göndermeyi unutmayın!
                  </p>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <X className="w-10 h-10 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                    Gönderim Başarısız!
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Demo talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ad
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Adınız"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Soyad
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Soyadınız"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      E-posta
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('contact.form.emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Telefon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('contact.form.phonePlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Şirket
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Şirket adınız"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Mesaj
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Gönder
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={closeDemoForm}
                      className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      İptal
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 