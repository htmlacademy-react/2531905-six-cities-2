import {PropsWithChildren} from 'react';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

type LayoutProps = PropsWithChildren <{
  needFooter?: boolean;
  hideNav?: boolean;
}>;

function Layout({needFooter, hideNav, children}: LayoutProps) {
  return (
    <>
      <Header hideNav={hideNav}/>
      {children}
      {
        needFooter && <Footer />
      }
    </>
  );
}

export default Layout;
