import React from 'react'

export function ErrorPage() {
  document.title = 'Страница не найдена'
  return (
    <main className="Main">
      <div className="Error">404</div>
    </main>
  )
}
