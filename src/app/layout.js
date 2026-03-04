import './globals.css'

export const metadata = {
  title: 'Ross License Manager',
  description: 'Central de Gerenciamento de Licenças - PFPB',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
