import Icon from '@/components/ui/Icon';

export default function Newsletter() {
  return (
    <section className="px-4 pb-12 md:px-[42px] md:pb-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center rounded-xl bg-surface-light px-6 py-12 text-center md:px-12 md:py-14">
        <Icon name="home/mail" size={36} className="text-brand-primary" />
        <h2 className="mt-4 text-[24px] font-bold leading-8 text-ink md:text-[30px] md:leading-9">Get Travel Deals Directly</h2>
        <p className="mt-3 max-w-[662px] text-[14px] leading-5 text-ink-soft md:text-[18px] md:leading-7">
          Subscribe to our newsletter and get early access to hidden gems and seasonal
          discounts. No spam, only adventure.
        </p>

        <form
          action="#"
          className="mt-6 flex w-full max-w-[686px] flex-col gap-3 md:mt-8 md:flex-row"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="h-[57px] flex-1 rounded-[11.5px] bg-white px-5 text-[16px] text-ink placeholder:text-[#6B7280] focus:outline-none"
          />
          <button
            type="submit"
            className="h-[57px] rounded-md bg-brand-primary px-8 text-[16px] font-bold text-white hover:opacity-95"
          >
            Subscribe Now
          </button>
        </form>

        <p className="mt-4 text-[12px] leading-4 text-ink-soft">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
