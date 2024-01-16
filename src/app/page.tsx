export const revalidate = 86400; // 24 hours

const Home = async () => {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-3">
      <h2 className="text-center text-lg font-bold md:text-xl">
        Welcome to the HRT-Stock Application!
      </h2>
      <p className="text-balance text-center">
        This is a simple application that displays stock information for
        different countries and allows you to edit/update the stock data.
      </p>
    </main>
  );
};
export default Home;
