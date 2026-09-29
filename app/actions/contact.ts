'use server';

import { Resend } from 'resend';
import type { ContactState, FieldErrors } from '@/app/lib/contact';

const MAX_NAME = 80;
const MAX_EMAIL = 200;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'manan.bansal0302@gmail.com';
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function validate(formData: FormData) {
  const fieldErrors: FieldErrors = {};

  const name = readField(formData, 'name');
  const email = readField(formData, 'email');
  const message = readField(formData, 'message');

  if (!name) {
    fieldErrors.name = 'Please add your name.';
  } else if (name.length > MAX_NAME) {
    fieldErrors.name = `Please keep this under ${MAX_NAME} characters.`;
  }

  if (!email) {
    fieldErrors.email = 'Please add an email so I can reply.';
  } else if (email.length > MAX_EMAIL || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    fieldErrors.message = 'Please write a message.';
  } else if (message.length < MIN_MESSAGE) {
    fieldErrors.message = `Please add a little more detail (at least ${MIN_MESSAGE} characters).`;
  } else if (message.length > MAX_MESSAGE) {
    fieldErrors.message = `Please keep this under ${MAX_MESSAGE} characters.`;
  }

  return { name, email, message, fieldErrors };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot. A real visitor never sees or fills this, so anything in it is a bot.
  if (readField(formData, 'company')) {
    return { status: 'success', message: 'Thanks — your message is on its way.' };
  }

  const { name, email, message, fieldErrors } = validate(formData);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — the contact form is not configured.');
    return {
      status: 'error',
      message:
        'The contact form is not configured yet. Please email me directly instead.',
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      console.error('Resend rejected the contact message:', error);
      return {
        status: 'error',
        message: 'Something went wrong sending your message. Please email me directly instead.',
      };
    }

    const firstName = name.split(/\s+/)[0] ?? name;
    return {
      status: 'success',
      message: `Thanks ${firstName} — I'll get back to you soon.`,
    };
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      status: 'error',
      message: 'Something went wrong sending your message. Please email me directly instead.',
    };
  }
}
