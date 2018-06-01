import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.scss';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  return (
    <div className="Template">
      <Header/>
      <main className="Template-content" key={Math.random()}>
        {children}
      </main>
      <Footer/>
    </div>
  );
};
