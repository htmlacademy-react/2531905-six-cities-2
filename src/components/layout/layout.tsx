import {PropsWithChildren, ReactNode} from 'react';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

type LayoutProps = PropsWithChildren <{
  needFooter?: ReactNode;
}>;

function Layout({needFooter, children}: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      {
        needFooter && <Footer />
      }
    </>
  );
}

export default Layout;
