(() => {
  const STORAGE_KEY = 'site.lang';
  const DEFAULT_LANG = 'pt';
  const TARGET_LANG  = 'en';

  
  const originals = {};

  const translations = {
    en: {
      site_title: "Everyone against Racism",

      rosa_name: "Rosa Parks",
      rosa_desc: "Rosa became a symbol of the anti-segregation struggle in the USA when she refused to give up her bus seat to a white person in 1955.",

      martin_name: "Martin Luther King",
      martin_desc: "Baptist pastor, he stood out in the fight for civil rights of the black population in the United States and received the Nobel Peace Prize in 1964.",

      what_is_racism: "What is racism?",
      what_is_racism_text: "Racism is discrimination or prejudice against people based on their race or ethnicity, often supported by an idea of racial superiority. It can manifest individually, institutionally, and structurally.",

      types_title: "Types of Racism:",
      individual_racism: "Individual Racism:",
      individual_racism_text: "Prejudiced behaviors and attitudes of one person towards another based on race. Example: racist insults, social exclusion, stereotypes.",

      institutional_racism: "Institutional Racism:",
      institutional_racism_text: "When institutions (such as schools, companies, governments) operate in a way that systematically discriminates or excludes people of certain races. Example: unequal access to education, health or jobs.",

      structural_racism: "Structural Racism:",
      structural_racism_text: "Refers to racism rooted in society's structures, which perpetuates regardless of individual intent. It is the historical result of centuries of inequality.",

      recreational_racism: "Recreational Racism:",
      recreational_racism_text: "Use of stereotypes or racist jokes as 'fun', which reinforces prejudice and normalizes racism.",
 slider: "Key activists in the fight against racism",
      vini_title: "Famous people are also victims of racism!",
      vini_li1: "Vinícius Júnior, Real Madrid player, was the victim of several episodes of racism in Spain, especially in May 2023, when Valencia fans insulted him with racist chants.",
      vini_li2: "He publicly denounced the case, generating worldwide repercussion and support from entities such as FIFA, the Brazilian government and football clubs.",
      vini_li3: "The case highlighted the recurring racism he faces in La Liga, something he has actively fought against.",
      vini_li4: "After international pressure, Spain began applying stricter punishments, including arrests of fans.",
      vini_li5: "Vini Jr. became an important voice in the fight against racism in sports.",
      vini_li6: "After the strong international mobilization and the attention Vini Jr. gave to the cause, the Spanish justice system began to act more decisively.",
      vini_li7: "Fans were identified, arrested, and convicted of hate crimes, something rare in European football.",
      vini_li8: "La Liga and the Spanish government began to reinforce campaigns and measures against racism in stadiums.",
      about_us: "About us",
      video_title: "Video about racism in Brazil:"
    }
  };

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');

      
      if (!originals[key]) {
        originals[key] = el.textContent.trim();
      }

      if (lang === DEFAULT_LANG) {
        
        el.textContent = originals[key] || el.textContent;
      } else {
       
        const dict = translations[lang] || {};
        const value = dict[key];
        if (value) el.textContent = value;
      }
    });

    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
    updateButtonLabel(lang);
  }

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function toggleLang() {
    const current = getLang();
    const next = current === TARGET_LANG ? DEFAULT_LANG : TARGET_LANG;
    applyLang(next);
  }

  function updateButtonLabel(lang) {
    const btn = document.querySelector('[data-role="translate-btn"]');
    if (!btn) return;
    const isEN = lang === TARGET_LANG;
    btn.textContent = isEN ? 'Ver em português' : 'See in English';
  }

  function createTranslateButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-role', 'translate-btn');
    btn.addEventListener('click', toggleLang);
    return btn;
  }

  function replaceExistingButton(selector) {
    const existing = document.querySelector(selector);
    const newBtn = createTranslateButton();
    if (existing) {
      if (existing.className) newBtn.className = existing.className;
      existing.replaceWith(newBtn);
    } else {
      document.body.prepend(newBtn);
    }
    updateButtonLabel(getLang());
  }

  document.addEventListener('DOMContentLoaded', () => {
    replaceExistingButton('#traduzir');
    applyLang(getLang());
  });
})();
