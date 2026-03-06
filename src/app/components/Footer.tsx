import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

const SOCIAL_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Email: Mail,
};

export function Footer() {
  const navigation = {
    main: ['About', 'Skills', 'Projects', 'Experience', 'Contact'] as const,
    social: siteConfig.social.map((s) => ({
      ...s,
      icon: SOCIAL_ICONS[s.name] ?? Mail,
    })),
  };

  return (
    <footer className="relative bg-[#0A0F1F] border-t border-[#3BA4FF]/10">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3BA4FF] to-transparent shadow-[0_0_10px_rgba(59,164,255,0.5)]" />

      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-[24px] font-bold bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] bg-clip-text text-transparent">
              {'{JS}'}
            </div>
            <p className="text-[#9BA6B2] text-sm">
              Crafting exceptional digital experiences with cutting-edge technologies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#F5F7FA] font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#9BA6B2] hover:text-[#3BA4FF] transition-colors text-sm cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#F5F7FA] font-medium mb-4">Connect</h4>
            <div className="flex gap-3">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="w-10 h-10 bg-[#0F1A33] border border-[#3BA4FF]/20 rounded-lg flex items-center justify-center text-[#9BA6B2] hover:text-[#3BA4FF] hover:border-[#3BA4FF]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,164,255,0.3)]"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5F7FA] font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-[#9BA6B2]">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#3BA4FF] transition-colors">
                {siteConfig.contact.email}
              </a>
              <p>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-[#3BA4FF] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>{siteConfig.contact.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#3BA4FF]/10 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
          <p className="text-[#9BA6B2] text-sm">© 2026 Albert Shkhyan</p>
        </div>
      </div>
    </footer>
  );
}
