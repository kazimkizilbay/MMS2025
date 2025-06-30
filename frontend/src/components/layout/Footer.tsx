import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { API_URL } from '../../lib/config';

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Helper function to safely get array from translation
  const getTranslationArray = (key: string, fallback: string[] = []): any[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : fallback;
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Lütfen geçerli bir email adresi giriniz' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Bir hata oluştu' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bağlantı hatası. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/marinemanagementsystem/',
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/company/mms-erp',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61560348505866',
      icon: Facebook,
      color: 'hover:text-blue-500'
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/+905075742666',
      icon: MessageCircle,
      color: 'hover:text-green-500'
    },
    {
      name: 'Google Maps',
      href: 'https://maps.app.goo.gl/gZESRYuJidHbSQpB9',
      icon: MapPin,
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.software'), href: '#software' },
    { name: t('nav.packages'), href: '#packages' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const services = getTranslationArray('footer.services_items', []);

  return (
    <footer className="bg-slate-900 text-slate-50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Marine Management System Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">Marine Management System</h3>
                <p className="text-blue-400 text-sm">{t('footer.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">{t('contact.info.addressText')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${t('contact.info.phoneText').replace(/\s/g, '')}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('contact.info.phoneText')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${t('contact.info.emailText')}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('contact.info.emailText')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href={`http://${t('contact.info.website')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-1"
                >
                  <span>{t('contact.info.website')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-start space-x-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                      title={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter.title')}</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <div className="flex max-w-sm">
                <input
                  type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-50 placeholder-slate-400"
                    disabled={loading}
                />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-r-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      t('footer.newsletter.button')
                    )}
                </button>
              </div>
                {message && (
                  <div className={`flex items-center space-x-2 text-sm ${
                    message.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>{message.text}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Kullanım Şartları</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 