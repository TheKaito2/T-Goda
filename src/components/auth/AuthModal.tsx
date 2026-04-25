'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { gsap } from '@/lib/gsap';

type Mode = 'signin' | 'signup';
type Props = {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
};

export default function AuthModal({ open, onClose, initialMode = 'signin' }: Props) {
  const { signIn, signUp } = useAuth();
  const toast = useToast();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setSubmitting(false);
    }
  }, [open, initialMode]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!email.trim() || !password.trim() || (mode === 'signup' && !name.trim())) {
      if (formRef.current) {
        formRef.current.classList.remove('tg-shake');
        void formRef.current.offsetWidth;
        formRef.current.classList.add('tg-shake');
      }
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      const u = mode === 'signin' ? await signIn(email, password) : await signUp(name, email, password);
      toast.success(mode === 'signin' ? `Welcome back, ${u.name}` : `Welcome aboard, ${u.name}`);
      onClose();
      setName('');
      setEmail('');
      setPassword('');
    } catch {
      toast.error('Something went wrong, try again');
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, x: next === 'signup' ? 16 : -16 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="md" ariaLabel="Authentication">
      <div className="px-7 pb-7 pt-7">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">T-Goda</div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink-soft hover:text-ink">×</button>
        </div>
        <h2 className="mt-3 text-[26px] font-extrabold leading-tight tracking-[-0.5px] text-ink">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-1 text-[14px] text-ink-soft">
          {mode === 'signin'
            ? 'Sign in to manage bookings and unlock member prices.'
            : 'Join T-Goda to save trips, earn rewards, and book faster next time.'}
        </p>

        <div className="mt-6 inline-flex rounded-md bg-surface-cool p-1 text-[13px] font-semibold">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className={`rounded px-4 py-1.5 transition ${mode === 'signin' ? 'bg-white text-ink shadow-sm' : 'text-ink-soft'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`rounded px-4 py-1.5 transition ${mode === 'signup' ? 'bg-white text-ink shadow-sm' : 'text-ink-soft'}`}
          >
            Create Account
          </button>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === 'signup' ? (
            <Field label="Full name" type="text" value={name} onChange={setName} placeholder="Alex Traveler" autoFocus />
          ) : null}
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" autoFocus={mode === 'signin'} />
          <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-sm bg-brand-primary text-[15px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
          <div className="my-2 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-ink-soft">
            <span className="h-px flex-1 bg-line/60" />
            or
            <span className="h-px flex-1 bg-line/60" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SocialBtn label="Google" onClick={() => toast.demo('Social sign-in is decorative in this demo')} />
            <SocialBtn label="Apple" onClick={() => toast.demo('Social sign-in is decorative in this demo')} />
          </div>
          <p className="pt-1 text-center text-[12px] text-ink-soft">
            By continuing you agree to our <a href="/terms" className="underline">Terms</a> and{' '}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </Modal>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="mt-1 block h-11 w-full rounded-sm border border-line/60 bg-white px-3 text-[14px] text-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
      />
    </label>
  );
}

function SocialBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center rounded-sm border border-line/60 bg-white text-[14px] font-semibold text-ink transition hover:border-line"
    >
      Continue with {label}
    </button>
  );
}
