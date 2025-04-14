export default function Dashboard() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <section>
          <h1 className="font-medium text-2xl leading-6">
            Doggy Day<span className="font-semibold">Care</span>
          </h1>
          <p className="text-lg opacity-80">
            The best care for your best friend
          </p>
        </section>
        <section className="text-center">
          <p className="text-2xl font-bold leading-6">2</p>
          <p className="opacity-80">current guests</p>
        </section>
      </div>
    </main>
  );
}
