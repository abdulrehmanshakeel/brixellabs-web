import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedinIn, 
  faInstagram, 
  faFacebookF, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const SocialMediaConnectSection = () => {
  const channels = [
    {
      id: 'linkedin',
      name: 'LinkedIn Corporate Page',
      handle: '@brixellabs • AI & Engineering',
      badge: 'B2B & Enterprise',
      desc: 'Connect with our solutions architects, AI engineers, and tech leads for official corporate announcements, whitepapers, and enterprise inquiries.',
      bullets: [
        'Weekly AI Case Study Breakdowns',
        'System Architecture Whitepapers',
        'Direct InMail to Solutions Architects'
      ],
      btnText: 'Follow on LinkedIn',
      url: 'https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true',
      icon: faLinkedinIn,
      iconBg: 'bg-[#0077b5]/15 border-[#0077b5]/40 text-[#00a0dc]',
      badgeStyle: 'bg-sky-950/70 border-sky-500/30 text-sky-300',
      btnStyle: 'bg-[#0077b5] hover:bg-[#006097] text-white shadow-lg shadow-sky-950/40',
      borderHover: 'hover:border-sky-500/50'
    },
    {
      id: 'instagram',
      name: 'Instagram Tech Gallery',
      handle: '@brixellabs • Studio Reels',
      badge: 'Visual Lab & Reels',
      desc: 'Explore high-tempo reels showcasing live computer vision benchmarks, interactive UI/UX prototyping in Figma, and behind-the-scenes coding sprints.',
      bullets: [
        'Real-Time AI Camera Demos',
        'Interactive Figma to React UI',
        'Fast Direct DMs for Quick Estimates'
      ],
      btnText: 'Follow on Instagram',
      url: 'https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt',
      icon: faInstagram,
      iconBg: 'bg-pink-500/15 border-pink-500/40 text-pink-400',
      badgeStyle: 'bg-pink-950/70 border-pink-500/30 text-pink-300',
      btnStyle: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:brightness-110 text-white shadow-lg shadow-pink-950/40',
      borderHover: 'hover:border-pink-500/50'
    },
    {
      id: 'facebook',
      name: 'Facebook Community',
      handle: '@brixellabs • Tech Updates',
      badge: 'Community & Updates',
      desc: 'Stay informed with project milestone releases, technical architecture breakdowns, technology webinars, and direct messaging with our delivery coordination team.',
      bullets: [
        'Live Messenger Project Consultations',
        'Production Deployment Highlights',
        'Engineering Architecture Case Studies'
      ],
      btnText: 'Visit Facebook Page',
      url: 'https://www.facebook.com/share/1HiGirYC4f/',
      icon: faFacebookF,
      iconBg: 'bg-[#1877f2]/15 border-[#1877f2]/40 text-[#3b82f6]',
      badgeStyle: 'bg-blue-950/70 border-blue-500/30 text-blue-300',
      btnStyle: 'bg-[#1877f2] hover:bg-[#125ec2] text-white shadow-lg shadow-blue-950/40',
      borderHover: 'hover:border-blue-500/50'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Trade Desk',
      handle: '+92 344 9254864 • Instant Desk',
      badge: 'Instant Desk',
      desc: 'Direct hotline with our senior technical managers for immediate project feasibility checks, rapid NDA signing, and same-day sprint roadmapping.',
      bullets: [
        'Instant Feasibility & Cost Assessment',
        'Direct Audio / Video Call Booking',
        'Same-Day Sprint Scheduling'
      ],
      btnText: 'Start WhatsApp Chat',
      url: 'https://wa.me/923449254864?text=Hi%20BrixelLabs%2C%20I%20would%20like%20to%20discuss%20a%20project.',
      icon: faWhatsapp,
      iconBg: 'bg-[#25d366]/15 border-[#25d366]/40 text-[#25d366]',
      badgeStyle: 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300',
      btnStyle: 'bg-[#25d366] hover:bg-[#20b858] text-[#031422] font-bold shadow-lg shadow-emerald-950/40',
      borderHover: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <section className="relative py-20 sm:py-24 border-t border-slate-800/80" id="social-channels">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16 space-y-3">


          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Connect With BrixelLabs On Social Media
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Stay updated with our latest AI deployments, computer vision demonstrations, live engineering sprints, &amp; direct client consultations.
          </motion.p>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {channels.map((channel, idx) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800/90 bg-[#030e1a]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${channel.borderHover} group`}
            >
              <div>
                {/* Top Row: Icon Container */}
                <div className="mb-5">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${channel.iconBg}`}>
                    <FontAwesomeIcon icon={channel.icon} className="text-xl" />
                  </div>
                </div>

                {/* Title & Handle */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                  {channel.name}
                </h3>
                <div className="text-xs font-mono text-cyan-400/90 font-medium mb-3">
                  {channel.handle}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                  {channel.desc}
                </p>

                {/* Feature Bullet List Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 mb-6">
                  {channel.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold leading-tight mt-0.5">•</span>
                      <span className="leading-tight">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button */}
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${channel.btnStyle}`}
              >
                <span>{channel.btnText}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 opacity-80" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
