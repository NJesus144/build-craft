import Logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full h-screen bg-gradient-to-tl from-muted flex flex-col md:justify-center p-6 overflow-hidden">
      <div className='w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12'>
        <div>
          <Logo className="w-full max-w-[100px] mb-8" />

          <h1 className="font-title font-bold text-5xl max-w-[500px]">
            Um criador de currículos gratuito e fácil de usar
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Comece a criar seus currículos de forma rápida e fácil com nossos
            modelos.
          </p>
          <Link href="/dashboard/resumes" passHref>
            <Button className="mt-4">Começar agora!</Button>
          </Link>
        </div>
        <div className="flex-1 relative h-full">
          <Image
            src="/images/auth-bg.webp"
            alt="Imagem landing page"
            width={1200}
            height={800}
            className="rounded-lg overflow-hidden border-w border-muted md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:min-w-[80vw]"
            quality={100}
          />
        </div>
      </div>
    </main>
  )
}
