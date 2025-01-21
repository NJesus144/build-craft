'use client'

import { useEffect } from 'react'

export function useSidebar() {
  useEffect(() => {
    const toggle = document.querySelector('[data-toggle="sidebar"]')
    const sidebar = document.querySelector('aside')

    const handleClick = () => {
      const isOpen = sidebar?.getAttribute('data-state') === 'open'
      sidebar?.setAttribute('data-state', isOpen ? 'closed' : 'open')
    }

    toggle?.addEventListener('click', handleClick)
    return () => toggle?.removeEventListener('click', handleClick)
  }, [])
}