import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IconContext } from 'react-icons'
import '@fontsource-variable/plus-jakarta-sans'
import './index.css'
import App from './App.jsx'

// Every react-icons glyph in this app is decorative — the adjacent text always
// carries the meaning. Setting it once here hides all of them from assistive
// tech, rather than relying on ~90 individual aria-hidden props staying correct.
const ICON_DEFAULTS = {
  attr: { 'aria-hidden': 'true', focusable: 'false' },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IconContext.Provider value={ICON_DEFAULTS}>
      <App />
    </IconContext.Provider>
  </StrictMode>,
)
