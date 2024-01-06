import CountryStocksLister from "@/components/listers/CountryStocksLister";

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CountryStocksLister />
      {/* <pre>{JSON.stringify(countryByStringMatch, null, 2)}</pre> */}
    </main>
  );
};
export default Home;
