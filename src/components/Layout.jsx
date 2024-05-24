import Header from './layout/Header';
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
