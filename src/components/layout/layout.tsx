import {PropsWithChildren} from 'react';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

type LayoutProps = PropsWithChildren <{
  needFooter?: boolean;
  showNav?: boolean;
}>;

function Layout({needFooter, showNav = true, children}: LayoutProps) {
  return (
    <>
      <Header showNav={showNav}/>
      {children}
      {
        needFooter && <Footer />
      }
    </>
  );
}

export default Layout;
