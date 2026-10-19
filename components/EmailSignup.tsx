// Email signup block (A10), off in v1. Renders nothing until enabled.
export default function EmailSignup() {
  const enabled = process.env.NEXT_PUBLIC_EMAIL_SIGNUP === '1';
  if (!enabled) return null;
  return (
    <section className="rounded-card border border-line bg-surface p-5">
      <p className="text-body text-ink">Get an email when we add a vehicle or tool.</p>
    </section>
  );
}
