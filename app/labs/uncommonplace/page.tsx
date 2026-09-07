import { Bungee } from 'next/font/google'
import Uncommonplace from '@/components/labs/uncommonplace'
import { NavBar } from '@/components/nav-bar'
import { socialImageFromBuild } from '@/lib/builds'
import { UNCOMMONPLACE_HREF } from '@/lib/labs/uncommonplace'
import { pageMetadata } from '@/lib/site'

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bungee',
})

export const metadata = pageMetadata({
  title: '(Un)Commonplace',
  description:
    'Commonplace books are an ancient practice of capturing bits of knowledge and inspiration in notebooks. This is my emerging digital version drawn from my own notebooks and CSS experiments.',
  path: UNCOMMONPLACE_HREF,
  image: socialImageFromBuild('uncommonplace'),
})

export default function UncommonplacePage() {
  return (
    <div
      className={`${bungee.variable} uncommonplace-lab flex min-h-screen flex-col bg-background`}
    >
      <NavBar activePath="/builds" />
      <main className="relative flex min-h-0 flex-1 flex-col">
        <Uncommonplace />
      </main>
    </div>
  )
}
