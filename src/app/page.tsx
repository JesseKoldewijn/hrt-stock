import CountryStocksLister from "@/components/listers/CountryStocksLister";

export const revalidate = 86400; // 24 hours

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CountryStocksLister />
    </main>
  );
};
export default Home;
