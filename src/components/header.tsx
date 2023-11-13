import { Navbar, NavbarBrand } from '@nextui-org/react';

export default async function Header() {
  return (
    <Navbar maxWidth='full'>
      <NavbarBrand>
        <p className='text-foreground'>Creative Review</p>
      </NavbarBrand>
    </Navbar>
  );
}
