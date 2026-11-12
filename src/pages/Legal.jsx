/* ============================================================
   Goodbite — Legal & Info pages
   One component renders the Privacy Policy, Terms of Service,
   or FAQ based on the `doc` route prop (wired from the Footer).
   ============================================================ */
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated · January 2026',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'When you create an account or place an order, we collect your name, email address, phone number, and delivery address. We also store your order history so you can reorder favorites in one tap.',
          'Payments are processed by PCI-DSS compliant providers — we never see or store your full card details, only a payment token and the last four digits.',
        ],
      },
      {
        heading: 'How we use your data',
        body: [
          'We use your information to prepare and deliver your orders, send delivery updates, personalize menu recommendations, and provide support when something goes wrong.',
        ],
      },
      {
        heading: 'Cookies & analytics',
        body: [
          'Essential cookies keep your cart and session working. Optional analytics cookies help us understand which dishes people love — you can decline them at any time without losing functionality.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'Only the courier partner delivering your order and the payment processor completing your transaction. We never sell your personal data to third parties.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can request access, correction, or deletion of your personal data at any time by emailing privacy@goodbite.com. We respond to every request within 30 days.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated · January 2026',
    sections: [
      {
        heading: 'Placing an order',
        body: [
          'All offers are subject to availability. Prices shown at checkout include applicable taxes. An order is confirmed once you see the “Confirmed” status on your tracking page.',
        ],
      },
      {
        heading: 'Delivery',
        body: [
          'We aim to deliver within the estimated window shown at checkout — usually 25–40 minutes. Weather, traffic, and kitchen volume may occasionally extend this window.',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'We accept major cards, PayPal, and Apple Pay. All transactions are encrypted end-to-end; see the security badges in our site footer.',
        ],
      },
      {
        heading: 'Refund policy',
        id: 'refunds',
        body: [
          'If your order arrives damaged, incorrect, or more than 60 minutes late, contact our support team within 24 hours with your order number and we will remake the item or issue a full refund — your choice.',
          'Approved refunds are returned to the original payment method within 5–10 business days.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'Nothing in these terms limits your statutory consumer rights. For questions about these terms, email hello@goodbite.com.',
        ],
      },
    ],
  },
  faq: {
    title: 'Help & FAQ',
    updated: 'Quick answers to common questions',
    sections: [
      {
        heading: 'How long does delivery take?',
        body: [
          'Most orders arrive in 25–40 minutes. You can follow your courier in real time from the Order Tracking page after checkout.',
        ],
      },
      {
        heading: 'What is the delivery fee?',
        body: [
          'Delivery is $2.99 on orders under $30, and free on orders of $30 or more. The fee is always shown before you pay.',
        ],
      },
      {
        heading: 'Can I cancel or change my order?',
        body: [
          'Yes — while your order status is still “Confirmed” you can cancel or edit it from the tracking page. Once the kitchen starts cooking, contact us and we will do our best.',
        ],
      },
      {
        heading: 'How do refunds work?',
        body: [
          'Damaged, wrong, or very late orders are refunded in full, no arguments.',
        ],
        link: { to: '/terms#refunds', label: 'Read the refund policy →' },
      },
      {
        heading: 'Do you cater to allergies?',
        body: [
          'Each dish lists its ingredients on the menu page. For severe allergies, please add a note at checkout or call us before ordering.',
        ],
      },
    ],
  },
};

export const Legal = ({ doc = 'privacy' }) => {
  const content = DOCS[doc];
  const { hash, pathname } = useLocation();

  // Scroll to the target section when arriving via a hash link (e.g. /terms#refunds)
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash, pathname]);

  if (!content) {
    return (
      <main className="legal-page">
        <div className="legal-page-inner">
          <Link to="/" className="legal-back">← Back to Goodbite</Link>
          <h1>Page not found</h1>
          <p>
            The page you are looking for does not exist. Head back to the homepage
            to keep exploring the menu.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="legal-page">
      <div className="legal-page-inner">
        <Link to="/" className="legal-back">← Back to Goodbite</Link>
        <h1>{content.title}</h1>
        <p className="legal-updated">{content.updated}</p>

        {content.sections.map((section) => (
          <section key={section.heading} id={section.id}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.link && (
              <p>
                <Link to={section.link.to} className="link-arrow">{section.link.label}</Link>
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
};

export default Legal;
