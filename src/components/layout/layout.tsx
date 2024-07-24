import {PropsWithChildren} from 'react';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

type LayoutProps = PropsWithChildren <{
  needFooter?: boolean;
  hideHeader?: boolean;
}>;

function Layout({needFooter, hideHeader, children}: LayoutProps) {
  return (
    <>
      {
        !hideHeader && <Header />
      }
      {children}
      {
        needFooter && <Footer />
      }
    </>
  );
}

export default Layout;
