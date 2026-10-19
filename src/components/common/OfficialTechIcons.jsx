import React from 'react';
import officialIconsData from './officialIconsData.json';

// Helper for single-path vector icons from official simple-icons library
const SIVector = ({ name, fallbackHex, className = "w-5 h-5", defaultFill }) => {
  const data = officialIconsData[name];
  if (!data) return null;
  const fill = defaultFill || `#${data.hex || fallbackHex || 'ffffff'}`;
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill}>
      <path d={data.path} />
    </svg>
  );
};

// --- AI & MACHINE LEARNING ---

export const PythonIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#387EB8" d="M11.91 2c-5.07 0-4.75 2.2-4.75 2.2l.01 2.28h4.82v.69H5.16S2 6.8 2 11.92c0 5.11 2.76 4.93 2.76 4.93h1.65v-2.31s-.09-2.76 2.71-2.76h4.66s2.63.04 2.63-2.62V4.62S16.98 2 11.91 2zm-2.6 1.54a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76z"/>
    <path fill="#FFE052" d="M12.09 22c5.07 0 4.75-2.2 4.75-2.2l-.01-2.28h-4.82v-.69h6.83S22 17.2 22 12.08c0-5.11-2.76-4.93-2.76-4.93h-1.65v2.31s.09 2.76-2.71 2.76H10.22s-2.63-.04-2.63 2.62v4.54S7.02 22 12.09 22zm2.6-1.54a.88.88 0 1 1 0-1.76.88.88 0 0 1 0 1.76z"/>
  </svg>
);

export const OpenAIIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#10A37F">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5977 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4055-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

export const ClaudeIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Claude" fallbackHex="D97757" className={className} />
);

export const GeminiIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="geminiOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4E82EE" />
        <stop offset="50%" stopColor="#9B72CB" />
        <stop offset="100%" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path fill="url(#geminiOfficialGrad)" d="M12 2C12 7.52 7.52 12 2 12c5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
  </svg>
);

export const GrokIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="4" fill="#000000" stroke="#334155" strokeWidth="0.8" />
    <polygon points="15.4 5.1 5.7 18.9 8.6 18.9 18.3 5.1" fill="#FFFFFF" />
  </svg>
);

export const LangChainIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="LangChain" fallbackHex="00A67E" className={className} defaultFill="#00A67E" />
);

export const LangGraphIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="LangGraph" fallbackHex="00A67E" className={className} defaultFill="#00A67E" />
);

export const HuggingFaceIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="HuggingFace" fallbackHex="FFD21E" className={className} />
);

export const PyTorchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M13.5 2.5a.75.75 0 0 1 .75.75v1.285a7.502 7.502 0 0 1 5.465 5.465H21a.75.75 0 0 1 0 1.5h-1.285a7.502 7.502 0 0 1-5.465 5.465V20.25a.75.75 0 0 1-1.5 0v-1.285A7.502 7.502 0 0 1 7.285 13.5H6a.75.75 0 0 1 0-1.5h1.285A7.502 7.502 0 0 1 12.75 6.535V3.25a.75.75 0 0 1 .75-.75z" fill="#EE4C2C"/>
    <circle cx="16.5" cy="7.5" r="1.5" fill="#FF6F00"/>
  </svg>
);

export const TensorFlowIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#FF6F00">
    <path d="M1.986 20.999L12 24l10.014-3.001V8.653L12 11.654v11.096L3.992 20.3V9.854l-2.006.6V21zM12 0L1.986 3.001v4.354l10.014 3.001 10.014-3.001V3.001L12 0zm0 2.45l6.509 1.951-6.509 1.952-6.509-1.952L12 2.45z" />
  </svg>
);

export const KerasIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Keras" fallbackHex="D00000" className={className} />
);

export const ScikitLearnIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="ScikitLearn" fallbackHex="F7931E" className={className} />
);

export const OpenCVIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke="#EA4335" strokeWidth="2.5" />
    <circle cx="7" cy="16" r="4" stroke="#4285F4" strokeWidth="2.5" />
    <circle cx="17" cy="16" r="4" stroke="#34A853" strokeWidth="2.5" />
  </svg>
);

export const YOLOIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="YOLO" fallbackHex="00B4D8" className={className} defaultFill="#00B4D8" />
);

// --- FRONTEND & MOBILE ---

export const ReactIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="React" fallbackHex="61DAFB" className={className} />
);

export const JavaScriptIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
    <path fill="#000000" d="M7 17.5c.5.8 1.3 1.2 2.3 1.2 1.3 0 2.1-.7 2.1-2.4v-6.8h-2.1v6.8c0 .7-.3 1-.8 1-.4 0-.7-.2-.9-.5l-.6.7zm7.5.3c1.1 0 1.9-.5 2.4-1.2l-1.3-.8c-.3.4-.6.6-1.1.6-.6 0-1-.3-1-.8 0-.5.4-.7 1.2-1 1.5-.5 2.4-1.1 2.4-2.4 0-1.4-1.1-2.3-2.6-2.3-1.2 0-2.1.5-2.6 1.4l1.3.8c.3-.4.6-.6 1.2-.6.5 0 .9.3.9.7 0 .4-.4.6-1.1.9-1.5.5-2.5 1.1-2.5 2.5 0 1.5 1.1 2.2 2.8 2.2z"/>
  </svg>
);

export const HTML5Icon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#E34F26" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z"/>
    <path fill="#EF652A" d="M12 3.8v18.4l5.7-1.4 1.4-17H12z"/>
    <path fill="#FFFFFF" d="M12 7.6H7.5l.3 3.4h4.2V7.6zm0 5.6H8.1l.3 3.5 3.6 1V13.2zm0-5.6h4.5l-.4 3.4H12V7.6zm0 5.6h3.8l-.4 3.9-3.4.9V13.2z"/>
  </svg>
);

export const CSS3Icon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#1572B6" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z"/>
    <path fill="#33A9DC" d="M12 3.8v18.4l5.7-1.4 1.4-17H12z"/>
    <path fill="#FFFFFF" d="M12 7.6H7.5l.3 3.4H12v2.2H8.1l.3 3.5 3.6 1V13.2zm0-5.6h4.5l-.4 3.4H12V7.6zm0 5.6h3.8l-.4 3.9-3.4.9V13.2z"/>
  </svg>
);

export const FlutterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#54C5F8" d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372z"/>
    <path fill="#02569B" d="M14.314 10.971L7.7 17.586l3.7 3.7 2.914-2.915 5.372 5.371h7.372L17.7 14.371l-3.386-3.4z"/>
    <path fill="#0175C2" d="M14.314 10.971L17.7 14.371l-3.386 3.4-3.7-3.7z"/>
  </svg>
);

export const FigmaIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M7 2h5v5H7a2.5 2.5 0 0 1 0-5z" fill="#F24E1E"/>
    <path d="M12 2h5a2.5 2.5 0 0 1 0 5h-5V2z" fill="#FF7262"/>
    <path d="M7 7h5v5H7a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
    <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE"/>
    <path d="M7 12h5v2.5a2.5 2.5 0 1 1-5 0V12z" fill="#0ACF83"/>
  </svg>
);

export const CanvaIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="canvaOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C4CC"/>
        <stop offset="50%" stopColor="#005BFF"/>
        <stop offset="100%" stopColor="#7D2AE8"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10.5" fill="url(#canvaOfficialGrad)"/>
    <path fill="#FFFFFF" d="M15.8 8.8c-.8-.7-1.8-1.1-2.9-1.1-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3c1.1 0 2.1-.4 2.9-1.1.3-.3.3-.8 0-1.1s-.8-.3-1.1 0c-.5.5-1.1.7-1.8.7-1.5 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8c.7 0 1.3.2 1.8.7.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1z"/>
  </svg>
);

export const ShopifyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#95BF47" d="M19.7 5.7c-.2-.1-.5 0-.6.2l-1.3 3.6-2.5-1.7c-.3-.2-.7-.1-.8.2l-4.5 9-3.2-1.6c-.3-.1-.6 0-.7.3L3.8 22h16.4l-.5-16.3z"/>
    <path fill="#5E8E3E" d="M12.8 2.2C11.5 2.2 10.4 3 9.8 4l2.7 1.8 2.3-1.6c-.5-1.2-1.1-2-2-2z"/>
    <path fill="#FFFFFF" d="M12.8 11.2c-.8 0-1.3.5-1.3 1.1 0 1.2 2.2 1.4 2.2 2.9 0 1.2-1 1.9-2.1 1.9-.9 0-1.5-.4-1.8-.8l.5-.8c.3.3.7.6 1.3.6.6 0 1-.4 1-.9 0-1.3-2.2-1.4-2.2-2.9 0-1.2.9-2 2-2 .8 0 1.3.3 1.6.6l-.5.8c-.3-.3-.6-.5-1.2-.5z"/>
  </svg>
);

// --- BACKEND & APIS ---

export const FastAPIIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="FastAPI" fallbackHex="009688" className={className} />
);

export const DjangoIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Django" fallbackHex="092E20" className={className} defaultFill="#44B78B" />
);

export const FlaskIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Flask" fallbackHex="FFFFFF" className={className} defaultFill="#E2E8F0" />
);

export const JSONIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#031628" stroke="#38BDF8" strokeWidth="1"/>
    <path d="M7 6c-1.5 0-2 1-2 2v2c0 .8-.7 1.5-1.5 1.5.8 0 1.5.7 1.5 1.5v2c0 1 .5 2 2 2M17 6c1.5 0 2 1 2 2v2c0 .8.7 1.5 1.5 1.5-.8 0-1.5.7-1.5 1.5v2c0 1-.5 2-2 2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const PlaywrightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M7.5 4C4.5 4 2.5 6.5 2.5 10.5c0 4.5 3 8.5 7 8.5 1 0 1.8-.3 2.5-.7-.3-.6-.5-1.3-.5-2.1 0-2.8 2.2-5 5-5 .4 0 .7.1 1.1.2C17 7 13.5 4 7.5 4z" fill="#2EAD33"/>
    <path d="M16.5 11c-2.5 0-4.5 2-4.5 4.5 0 3.5 2.5 6.5 6 6.5 3.5 0 6-3 6-6.5 0-2.5-2-4.5-7.5-4.5z" fill="#D14836"/>
    <circle cx="6" cy="9.5" r="1" fill="#FFFFFF"/>
    <circle cx="9.5" cy="9.5" r="1" fill="#FFFFFF"/>
    <circle cx="15" cy="15.5" r="1" fill="#FFFFFF"/>
    <circle cx="18" cy="15.5" r="1" fill="#FFFFFF"/>
  </svg>
);

export const SeleniumIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Selenium" fallbackHex="43B02A" className={className} />
);

// --- DATA & CLOUD ---

export const PandasIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Pandas" fallbackHex="150458" className={className} defaultFill="#E70488" />
);

export const NumPyIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="NumPy" fallbackHex="013243" className={className} defaultFill="#4DABCF" />
);

export const PostgreSQLIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="PostgreSQL" fallbackHex="4169E1" className={className} />
);

export const ExcelIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3.5" fill="#107C41" />
    <path fill="#0C592E" d="M14 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7V3z" />
    <path fill="#FFFFFF" d="M6 7.5h2.4l2 3.6 2-3.6h2.4l-3.2 5 3.3 5h-2.4l-2.1-3.7-2.1 3.7H6l3.3-5-3.3-5z" />
  </svg>
);

export const PowerBIIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect x="3" y="13" width="4.5" height="8" rx="1.5" fill="#F2C811" fillOpacity="0.6"/>
    <rect x="9.5" y="8" width="4.5" height="13" rx="1.5" fill="#F2C811" fillOpacity="0.85"/>
    <rect x="16" y="3" width="4.5" height="18" rx="1.5" fill="#F2C811"/>
  </svg>
);

export const BeautifulSoupIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 11h16a8 8 0 0 1-16 0z" fill="#10B981"/>
    <path d="M8 8c0-2 1-3 1-5M12 8c0-2 1-3 1-5M16 8c0-2 1-3 1-5" stroke="#FFE052" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="11" x2="22" y2="11" stroke="#387EB8" strokeWidth="2"/>
  </svg>
);

export const DockerIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Docker" fallbackHex="2496ED" className={className} />
);

export const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="GitHub" fallbackHex="FFFFFF" className={className} defaultFill="#FFFFFF" />
);

export const FirebaseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#FFA000" d="M3.89 15.67L6.5 2.8a.78.78 0 0 1 1.48-.15l3.22 6.03-7.31 7z"/>
    <path fill="#F57C00" d="M14.5 9.1l-2.43-4.63a.78.78 0 0 0-1.4 0L3.89 15.67 12 20.3l8.11-4.63-5.61-6.57z"/>
    <path fill="#FFCA28" d="M20.11 15.67L17.7 5.2a.78.78 0 0 0-1.46-.07l-1.74 3.97 5.61 6.57z"/>
  </svg>
);

export const SupabaseIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Supabase" fallbackHex="3FCF8E" className={className} />
);

export const NeonIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Neon" fallbackHex="34D59A" className={className} />
);

export const RenderIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Render" fallbackHex="46E3B7" className={className} defaultFill="#46E3B7" />
);

export const VercelIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Vercel" fallbackHex="FFFFFF" className={className} defaultFill="#FFFFFF" />
);

// --- CASE STUDY MARQUEE ADDITIONAL ICONS ---

export const NVIDIAIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="NVIDIA" fallbackHex="76B900" className={className} />
);

export const CUDAIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#76B900">
    <rect width="24" height="24" rx="4" fill="#031622" stroke="#76B900" strokeWidth="1.2"/>
    <path d="M5.5 12c0-3.6 2.9-6.5 6.5-6.5 2 0 3.8.9 5 2.3l-1.8 1.4c-.8-.9-2-1.5-3.2-1.5-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3c1.2 0 2.4-.6 3.2-1.5l1.8 1.4c-1.2 1.4-3 2.3-5 2.3-3.6 0-6.5-2.9-6.5-6.5z" fill="#76B900"/>
  </svg>
);

export const RedisIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Redis" fallbackHex="FF4438" className={className} />
);

export const KotlinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="kotlinOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C757BC"/>
        <stop offset="50%" stopColor="#D04E78"/>
        <stop offset="100%" stopColor="#F18E33"/>
      </linearGradient>
    </defs>
    <path fill="url(#kotlinOfficialGrad)" d="M24 24H0V0h24L12 12z"/>
  </svg>
);

export const AndroidIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Android" fallbackHex="3DDC84" className={className} />
);

export const MetaIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Meta" fallbackHex="0467DF" className={className} />
);

export const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="WhatsApp" fallbackHex="25D366" className={className} />
);

export const TwilioIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 30 30" fill="#F22F46">
    <path d="M14.4 11.3c0 1.7-1.4 3.1-3.1 3.1S8.2 13 8.2 11.3s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1zm-3.1 4.3c-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1-1.4-3.1-3.1-3.1zM30 15c0 8.3-6.7 15-15 15S0 23.3 0 15 6.7 0 15 0s15 6.7 15 15zm-4 0c0-6.1-4.9-11-11-11S4 8.9 4 15s4.9 11 11 11 11-4.9 11-11zm-7.3.6c-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1-1.4-3.1-3.1-3.1zm0-7.4c-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1-1.4-3.1-3.1-3.1z"/>
  </svg>
);

export const StreamlitIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="Streamlit" fallbackHex="FF4B4B" className={className} />
);

export const TailwindCSSIcon = ({ className = "w-5 h-5" }) => (
  <SIVector name="TailwindCSS" fallbackHex="06B6D4" className={className} />
);

export const GroqIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 210 305" fill="#F55036">
    <path d="M105.3.0C47.7-.5.5 45.8 0 103.4c-.5 57.6 45.8 104.8 103.4 105.3h36.2v-39.1h-34.3c-36 .4-65.6-28.4-66-64.5-.4-36.1 28.4-65.6 64.5-66h1.5c36 0 65.2 29.2 65.4 65.2v96.1c0 35.7-29.1 64.8-64.7 65.2-17.1-.1-33.4-7-45.4-19.1l-27.7 27.7c19.2 19.3 45.2 30.3 72.4 30.5h1.4c56.9-.8 102.6-47 102.9-103.9v-99.1c-1.4-56.5-47.7-101.6-104.3-101.7Z"/>
  </svg>
);

export const TavilyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0EA5E9" fillOpacity="0.15" stroke="#0EA5E9" strokeWidth="1.5"/>
    <path d="M8 12h8M12 8v8M8 8l8 8M16 8l-8 8" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WebSocketsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#38BDF8" strokeWidth="1.8"/>
    <path d="M8 12h8M12 8l4 4-4 4" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ICONS_MAP = {
  python: PythonIcon,
  openai: OpenAIIcon,
  chatgpt: OpenAIIcon,
  gpt4: OpenAIIcon,
  claude: ClaudeIcon,
  anthropic: ClaudeIcon,
  gemini: GeminiIcon,
  googlegemini: GeminiIcon,
  grok: GrokIcon,
  xai: GrokIcon,
  langchain: LangChainIcon,
  langgraph: LangGraphIcon,
  huggingface: HuggingFaceIcon,
  pytorch: PyTorchIcon,
  tensorflow: TensorFlowIcon,
  tf: TensorFlowIcon,
  keras: KerasIcon,
  scikitlearn: ScikitLearnIcon,
  sklearn: ScikitLearnIcon,
  opencv: OpenCVIcon,
  yolo: YOLOIcon,
  yolov8: YOLOIcon,
  yolov9: YOLOIcon,
  yolov8yolov9: YOLOIcon,
  react: ReactIcon,
  reactjs: ReactIcon,
  javascript: JavaScriptIcon,
  js: JavaScriptIcon,
  html5: HTML5Icon,
  html: HTML5Icon,
  css3: CSS3Icon,
  css: CSS3Icon,
  flutter: FlutterIcon,
  figma: FigmaIcon,
  canva: CanvaIcon,
  shopify: ShopifyIcon,
  shopifyapi: ShopifyIcon,
  fastapi: FastAPIIcon,
  django: DjangoIcon,
  flask: FlaskIcon,
  json: JSONIcon,
  restapi: JSONIcon,
  playwright: PlaywrightIcon,
  selenium: SeleniumIcon,
  pandas: PandasIcon,
  numpy: NumPyIcon,
  postgresql: PostgreSQLIcon,
  postgres: PostgreSQLIcon,
  excel: ExcelIcon,
  microsoftexcel: ExcelIcon,
  powerbi: PowerBIIcon,
  microsoftpowerbi: PowerBIIcon,
  beautifulsoup: BeautifulSoupIcon,
  bs4: BeautifulSoupIcon,
  docker: DockerIcon,
  dockeronedge: DockerIcon,
  github: GitHubIcon,
  firebase: FirebaseIcon,
  supabase: SupabaseIcon,
  neon: NeonIcon,
  render: RenderIcon,
  vercel: VercelIcon,
  nvidia: NVIDIAIcon,
  nvidiajetson: NVIDIAIcon,
  cuda: CUDAIcon,
  cudatensorrt: CUDAIcon,
  tensorrt: CUDAIcon,
  redis: RedisIcon,
  redisstreams: RedisIcon,
  kotlin: KotlinIcon,
  android: AndroidIcon,
  androidos: AndroidIcon,
  meta: MetaIcon,
  metallama: MetaIcon,
  metallama33: MetaIcon,
  llama: MetaIcon,
  llama3: MetaIcon,
  whatsapp: WhatsAppIcon,
  whatsappapi: WhatsAppIcon,
  twilio: TwilioIcon,
  streamlit: StreamlitIcon,
  tailwindcss: TailwindCSSIcon,
  tailwind: TailwindCSSIcon,
  tailwindmodernui: TailwindCSSIcon,
  groq: GroqIcon,
  groqlpus: GroqIcon,
  groqcloud: GroqIcon,
  tavily: TavilyIcon,
  tavilysearch: TavilyIcon,
  websockets: WebSocketsIcon
};

export const getOfficialIcon = (identifier) => {
  if (!identifier) return PythonIcon;
  const normalized = String(identifier).toLowerCase().replace(/[^a-z0-9]/g, '');
  return ICONS_MAP[normalized] || PythonIcon;
};

