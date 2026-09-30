import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "../components/Icons";

export const metadata = { title: "Contact | Addis Eats" };

const info = [
  { icon: MapPinIcon, title: "Visit us", text: "Bole, Addis Ababa, Ethiopia" },
  { icon: PhoneIcon, title: "Call us", text: "+251 911 000 000" },
  { icon: MailIcon, title: "Email us", text: "hello@addiseats.com" },
  { icon: ClockIcon, title: "Working hours", text: "Every day, 9:00 AM to 10:00 PM" },
];

const inputClass =
  "mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl bg-white px-5 py-12">
      <p className="text-xs font-bold tracking-[0.25em] text-amber-700">CONTACT</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
        Talk to Addis Eats
      </h1>
      <p className="mt-3 max-w-xl text-base text-gray-600">
        Questions about an order, catering for a special event, or general inquiries? Send us a message and our team will get back to you promptly.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-4">
          {info.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-amber-200 bg-amber-50 text-amber-700">
                <Icon width={22} height={22} />
              </span>
              <div>
                <p className="text-xs font-medium text-gray-500">{title}</p>
                <p className="text-sm font-semibold text-gray-900">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <form
          action="mailto:hello@addiseats.com"
          method="post"
          encType="text/plain"
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8"
        >
          <label className="block text-sm font-semibold text-gray-700">
            Your name
            <input name="name" required autoComplete="name" placeholder="Abebe Kebede" className={inputClass} />
          </label>
          <label className="block text-sm font-semibold text-gray-700">
            Email address
            <input name="email" type="email" required autoComplete="email" placeholder="abebe@example.com" className={inputClass} />
          </label>
          <label className="block text-sm font-semibold text-gray-700">
            Your message
            <textarea name="message" rows={5} required placeholder="How can we help you?" className={inputClass} />
          </label>
          <button
            type="submit"
            className="rounded-full bg-amber-600 px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
