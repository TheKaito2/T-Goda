'use client';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  url?: string;
};

export default function ShareModal({ open, onClose, title = 'Check out this stay on T-Goda', url }: Props) {
  const toast = useToast();
  const [link, setLink] = useState(url ?? '');

  useEffect(() => {
    if (!open) return;
    if (url) setLink(url);
    else if (typeof window !== 'undefined') setLink(window.location.href);
  }, [open, url]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied', 'Share it anywhere');
    } catch {
      toast.error('Could not copy link');
    }
  };

  const open_ = (kind: 'fb' | 'tw' | 'wa' | 'mail') => {
    const e = encodeURIComponent;
    const map: Record<typeof kind, string> = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${e(link)}`,
      tw: `https://twitter.com/intent/tweet?url=${e(link)}&text=${e(title)}`,
      wa: `https://api.whatsapp.com/send?text=${e(title + ' ' + link)}`,
      mail: `mailto:?subject=${e(title)}&body=${e(link)}`,
    };
    window.open(map[kind], '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal open={open} onClose={onClose} size="md" ariaLabel="Share">
      <div className="px-7 pb-7 pt-7">
        <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-ink">Share this stay</h2>
        <p className="mt-1 text-[14px] text-ink-soft">{title}</p>

        <div className="mt-5 grid grid-cols-4 gap-3 text-center text-[12px] font-semibold text-ink">
          <ShareBtn label="Facebook" emoji="📘" onClick={() => open_('fb')} />
          <ShareBtn label="Twitter" emoji="🐦" onClick={() => open_('tw')} />
          <ShareBtn label="WhatsApp" emoji="💬" onClick={() => open_('wa')} />
          <ShareBtn label="Email" emoji="✉️" onClick={() => open_('mail')} />
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-sm border border-line/60 bg-surface-cool px-3 py-2">
          <input
            value={link}
            readOnly
            className="flex-1 bg-transparent text-[13px] text-ink outline-none"
          />
          <button
            type="button"
            onClick={copy}
            className="rounded-sm bg-brand-primary px-3 py-1.5 text-[13px] font-semibold text-white hover:opacity-90"
          >
            Copy
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-sm border border-line/60 bg-white text-[14px] font-semibold text-ink hover:border-line"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

function ShareBtn({ emoji, label, onClick }: { emoji: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-md border border-line/40 bg-white py-3 transition hover:border-brand-primary/60 hover:bg-surface-cool"
    >
      <span aria-hidden className="text-[24px]">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
