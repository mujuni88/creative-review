import { Navbar, NavbarBrand, cn } from '@nextui-org/react';
import { VT323 } from 'next/font/google';
const minecraft = VT323({ weight: ['400'], subsets: ['latin'] });

export default async function Header() {
  return (
    <Navbar maxWidth='full' className='bg-primary'>
      <NavbarBrand>
        <p className={cn('text-tertiary text-4xl', minecraft.className)}>
          <b>PixeLingo</b>AI
        </p>
      </NavbarBrand>
    </Navbar>
  );
}
