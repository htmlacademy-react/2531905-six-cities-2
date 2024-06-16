import {PropsWithChildren, ReactNode} from 'react';

import {AuthorizationStatus} from '@/constants';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

type LayoutProps = PropsWithChildren <{
  needFooter?: ReactNode;
  authorizationStatus?: AuthorizationStatus;
}>;

function Layout({needFooter, authorizationStatus, children}: LayoutProps) {
  return (
    <>
      <Header authorizationStatus={authorizationStatus} />
      {children}
      {
        needFooter && <Footer />
      }
    </>
  );
}

export default Layout;
