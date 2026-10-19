const fs = require('fs');
const si = require('simple-icons');

// Map of simple-icons used
const siMapping = {
  Claude: 'siClaude',
  LangChain: 'siLangchain',
  LangGraph: 'siLanggraph',
  HuggingFace: 'siHuggingface',
  Keras: 'siKeras',
  ScikitLearn: 'siScikitlearn',
  YOLO: 'siYolo',
  React: 'siReact',
  FastAPI: 'siFastapi',
  Django: 'siDjango',
  Flask: 'siFlask',
  Selenium: 'siSelenium',
  Pandas: 'siPandas',
  NumPy: 'siNumpy',
  PostgreSQL: 'siPostgresql',
  Docker: 'siDocker',
  GitHub: 'siGithub',
  Supabase: 'siSupabase',
  Neon: 'siNeon',
  Render: 'siRender',
  Vercel: 'siVercel',
  Redis: 'siRedis',
  NVIDIA: 'siNvidia',
  Kotlin: 'siKotlin',
  Android: 'siAndroid',
  Meta: 'siMeta',
  WhatsApp: 'siWhatsapp',
  Streamlit: 'siStreamlit',
  TailwindCSS: 'siTailwindcss'
};

const iconData = {};
for (const [key, slug] of Object.entries(siMapping)) {
  const item = si[slug];
  if (item) {
    iconData[key] = {
      path: item.path,
      hex: item.hex,
      title: item.title
    };
  }
}

fs.writeFileSync('src/components/common/officialIconsData.json', JSON.stringify(iconData, null, 2));
console.log('Successfully wrote officialIconsData.json with ' + Object.keys(iconData).length + ' icons');
