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
      <span>{pending ? 'sending…' : 'send message'}</span>
      <span className="contact-submit-arrow" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}

export default function ContactSection() {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  const fieldErrors = state.fieldErrors;
  const hasFormError = state.status === 'error' && !fieldErrors;

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-panel">
        <div className="contact-intro">
          <p className="contact-kicker">
            <span className="availability-dot" aria-hidden="true" />
            available for work — 2026
          </p>

          <h2 id="contact-heading" className="contact-title">
            Let&apos;s build something worth shipping.
          </h2>

          <p className="contact-lead">
            Have a system to untangle, a product to launch, or an idea you want
            to stress-test? Tell me what you&apos;re working on.
          </p>

          <a className="contact-email" href={`mailto:${DIRECT_EMAIL}`}>
            <span className="contact-email-label">email</span>
            <span className="contact-email-value">{DIRECT_EMAIL}</span>
            <span className="contact-email-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <dl className="contact-facts">
            <div>
              <dt>response</dt>
              <dd>within 48 hours</dd>
            </div>
            <div>
              <dt>based in</dt>
              <dd>India · IST</dd>
            </div>
            <div>
              <dt>status</dt>
              <dd className="is-accent">open to collaborate</dd>
            </div>
          </dl>
        </div>

        <form action={formAction} className="contact-form" noValidate>
          <div className="contact-form-head">
            <span className="contact-form-title">Send a message</span>
          </div>

          <div className="contact-grid">
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
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-message">
              message
            </label>
            <textarea
              className="contact-textarea"
              id="contact-message"
              name="message"
              rows={6}
              maxLength={2000}
              placeholder="What are you building, and where does it hurt?"
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
          </div>
        </form>
      </div>
    </section>
  );
}
