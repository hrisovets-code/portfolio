import { useState, useEffect, useRef } from 'react'

type Theme = 'light' | 'dark'

function themeByTime(): Theme {
  const hour = new Date().getHours()
  return hour >= 8 && hour < 20 ? 'light' : 'dark'
}

export function useTheme() {
  // sessionStorage: manual override lasts only for the tab session
  const [theme, setTheme] = useState<Theme>(() => {
    const manual = sessionStorage.getItem('theme') as Theme | null
    return manual ?? themeByTime()
  })
  const isManual = useRef(!!sessionStorage.getItem('theme'))

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Check every minute and auto-switch if no manual override
  useEffect(() => {
    const id = setInterval(() => {
      if (!isManual.current) {
        setTheme(themeByTime())
      }
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  const toggle = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      isManual.current = true
      sessionStorage.setItem('theme', next)
      return next
    })
  }

  return { theme, toggle }
}
