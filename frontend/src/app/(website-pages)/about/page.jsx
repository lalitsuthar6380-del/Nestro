import Link from "next/link";

const values = [
  {
    title: "Made for everyday living",
    description:
      "We believe furniture should feel at home in your daily routine: useful, comfortable, and made to last.",
  },
  {
    title: "Thoughtful materials",
    description:
      "We focus on practical materials, considered details, and finishes that bring warmth to a room.",
  },
  {
    title: "A home, your way",
    description:
      "From a single accent piece to a whole room, our collection helps you make a space your own.",
  },
];

export const metadata = {
  title: "About Us | Nestro",
  description: "Learn about Nestro and our approach to furniture for your home.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#f7f3ec] text-stone-900">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          About Nestro
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          Furniture that makes a house feel like home.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          Nestro brings together furniture and home pieces designed to make
          everyday spaces more comfortable, useful, and personal. We care about
          thoughtful details, welcoming materials, and pieces that fit the way
          you live.
        </p>
        <Link
          href="/store"
          className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Explore the collection
        </Link>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-3 lg:px-8">
          {values.map((value) => (
            <article key={value.title}>
              <h2 className="text-xl font-semibold">{value.title}</h2>
              <p className="mt-3 leading-7 text-stone-600">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-stone-900 p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Need help choosing for your space?
            </h2>
            <p className="mt-2 text-stone-300">
              Our team is happy to help you find the right fit.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-amber-100"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
