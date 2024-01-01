import { getStocksWithCountry } from "@/server/handlers/getters";

const Home = async () => {
  const stockWithCountry = await getStocksWithCountry();
  const filterByCountry = stockWithCountry.filter(
    (stock) => stock.country && stock.countryData?.cca2 !== "NL",
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <pre className="flex max-w-md">
        {JSON.stringify(filterByCountry, null, 2)}
      </pre>
    </main>
  );
};
export default Home;
