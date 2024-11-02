const select = document.querySelector('#language')
const dictionary = await getDictionary()

init()

select.onchange = handleLangChange

function init() {
  const lang = localStorage.getItem('lang') || 'en'

  translate(lang)
  select.value = lang

  document.body.hidden = false
}

function handleLangChange() {
  const lang = select.value

  localStorage.setItem('lang', lang)
  translate(lang)
}

function translate(lang) {
  const elements = document.querySelectorAll('[data-text]')
  
  for (const el of elements) {
    const text = el.dataset.text

    if (!text) continue
    
    const translation = dictionary[text]?.[lang] || dictionary[text]?.en

    if (!translation) continue
    
    el.textContent = translation
  }
}

async function getDictionary() {
  const response = await fetch('dictionary.json')
  const dictionary = await response.json()

  return dictionary
}
