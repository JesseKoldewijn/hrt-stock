import { type Country } from "@/types/countries";

const Home = async () => {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const countries = (await data.json()) as Country[];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      Hello Mom!
      <div>
        {countries
          .filter((_c, idx) => idx < 1)
          .map((c) => (
            <pre key={c.name.common} className="w-screen overflow-auto">
              {JSON.stringify(c, null, 2)}
            </pre>
          ))}
      </div>
    </main>
  );
};
export default Home;
