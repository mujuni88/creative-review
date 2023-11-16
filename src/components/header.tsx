import { Navbar, NavbarBrand } from '@nextui-org/react';

export default async function Header() {
  return (
    <Navbar maxWidth='full' className='bg-primary'>
      <NavbarBrand>
        <p className='text-tertiary text-xl'>
          <b>PixelLingo</b>AI
        </p>
      </NavbarBrand>
    </Navbar>
  );
}
