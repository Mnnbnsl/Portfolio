'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContact } from '@/app/actions/contact';
import { initialContactState } from '@/app/lib/contact';

const DIRECT_EMAIL = 'manan.bansal0302@gmail.com';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="contact-submit" disabled={pending}>
      {pending ? 'sending…' : 'send message'}
    </button>
  );
}

export default function ContactSection() {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  const fieldErrors = state.fieldErrors;
  const hasFormError = state.status === 'error' && !fieldErrors;

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="projects-header">
        <h2 className="section-heading" id="contact-heading">
          Contact
        </h2>
        <p className="section-subtitle">
          Got something in mind, or just want to say hi? Send a note and I&apos;ll get back to you.
        </p>
      </div>

      <div className="contact-body">
        <form action={formAction} className="contact-form" noValidate>
          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-name">
              name
            </label>
            <input
              className="contact-input"
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              placeholder="Your name"
              aria-invalid={fieldErrors?.name ? true : undefined}
              aria-describedby={fieldErrors?.name ? 'contact-name-error' : undefined}
            />
            {fieldErrors?.name && (
              <p className="contact-field-error" id="contact-name-error">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-email">
              email
            </label>
            <input
              className="contact-input"
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={200}
              placeholder="you@company.com"
              aria-invalid={fieldErrors?.email ? true : undefined}
              aria-describedby={fieldErrors?.email ? 'contact-email-error' : undefined}
            />
            {fieldErrors?.email && (
              <p className="contact-field-error" id="contact-email-error">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-message">
              message
            </label>
            <textarea
              className="contact-textarea"
              id="contact-message"
              name="message"
              rows={5}
              maxLength={2000}
              placeholder="What are you working on?"
              aria-invalid={fieldErrors?.message ? true : undefined}
              aria-describedby={fieldErrors?.message ? 'contact-message-error' : undefined}
            />
            {fieldErrors?.message && (
              <p className="contact-field-error" id="contact-message-error">
                {fieldErrors.message}
              </p>
            )}
          </div>

          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <SubmitButton />
        </form>

        <div className="contact-feedback">
          {state.status === 'success' && (
            <p className="contact-status" role="status">
              {state.message}
            </p>
          )}

          {hasFormError && (
            <p className="contact-status is-error" role="alert">
              {state.message}
            </p>
          )}

          <p className="contact-direct">
            or email me directly at{' '}
            <a href={`mailto:${DIRECT_EMAIL}`} className="link">
              {DIRECT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
