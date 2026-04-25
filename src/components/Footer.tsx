import Icon from './ui/Icon';

const columns = [
  {
    heading: 'Company',
    links: ['About Us', 'Careers'],
  },
  {
    heading: 'Support',
    links: ['Support', 'Mobile App'],
  },
  {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Service'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-footer-bg">
      <div className="mx-auto flex max-w-frame flex-col gap-10 px-6 pb-12 pt-12 md:flex-row md:gap-8 md:pb-12">
        <div className="flex w-full flex-col gap-4 md:w-[600px]">
          <div className="text-[20px] font-bold leading-[28px] text-footer-heading">
            T-Goda
          </div>
          <p className="max-w-[376px] text-[14px] leading-[20px] text-footer-muted">
            Making world travel accessible, affordable, and delightful
            for everyone since 2024. Your journey starts here.
          </p>
          <p className="text-[14px] leading-[20px] text-footer-muted">
            © 2024 T-Goda Booking. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a aria-label="Facebook" href="#" className="text-footer-muted hover:text-footer-heading">
              <Icon name="footer/facebook" size={20} />
            </a>
            <a aria-label="Instagram" href="#" className="text-footer-muted hover:text-footer-heading">
              <Icon name="footer/instagram" size={20} />
            </a>
            <a aria-label="Twitter" href="#" className="text-footer-muted hover:text-footer-heading">
              <Icon name="footer/twitter" size={20} />
            </a>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 md:w-[600px]">
          {columns.map((col) => (
            <div key={col.heading}>
              <div className="text-[14px] font-bold leading-[20px] text-footer-heading">
                {col.heading}
              </div>
              <ul className="mt-3 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] leading-[20px] text-footer-muted hover:text-footer-heading"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
