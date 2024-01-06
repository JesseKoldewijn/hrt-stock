import CountryStocksLister from "@/components/listers/CountryStocksLister";

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CountryStocksLister />
    </main>
  );
};
export default Home;
