(() => {
  const STORAGE_KEY = 'site.lang';
  const DEFAULT_LANG = 'pt';
  const TARGET_LANG  = 'en';

  
  const originals = {};

  const translations = {
    en: {
                title: "Who was Martin Luther King Jr.?",
                title_site:"Everyone against Racism",
                description: "Martin Luther King Jr. (January 15, 1929 – April 4, 1968) was a Baptist minister, activist, and leader of the civil rights movement in the United States. He became known for his fight against racial segregation and his advocacy for racial equality through nonviolence and civil disobedience, inspired by Mahatma Gandhi.",
                about: "About",
                fullName: "Full Name: Martin Luther King Jr.",
                birth: "Born: January 15, 1929, Atlanta, Georgia, USA",
                death: "Died: April 4, 1968, Memphis, Tennessee, USA (assassinated)",
                profession: "Profession: Baptist minister, civil rights activist",
                family: "Family: Son of Martin Luther King Sr. and Alberta Williams King; married to Coretta Scott King; had four children.",
                education1: "Graduated in sociology from Morehouse College.",
                education2: "Earned a doctorate in systematic theology from Boston University.",
                education3: "He was deeply influenced by the Christian faith and the philosophy of nonviolence of Mahatma Gandhi.",
                murder: "Assassination",
                murderDescription: "King was killed on April 4, 1968, at the Lorraine Motel in Memphis, where he was supporting a sanitation workers' strike. The assassin was James Earl Ray, but to this day there are conspiracy theories and investigations into the true motivation and possible involvement of the government."
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
