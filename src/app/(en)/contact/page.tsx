import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { PageHero, Section } from '@/components/ui';
import { SlotPicker, LeadForm } from '@/components/client';
import { SITE, fullAddress, waLink } from '@/data/site';

export const metadata: Metadata = { title: 'Contact & Visit — Al Nasr Plaza, Oud Metha', description: 'Visit Betterway Mortgages at Al Nasr Plaza, Oud Metha Road, Dubai, book a consultation slot or message the WhatsApp desk.', alternates: { canonical: '/contact' } };

export default function Page() {
  const q = encodeURIComponent(`${SITE.address.building}, ${SITE.address.street}, ${SITE.address.district}, Dubai`);
  return (
    <>
      <PageHero crumbs={[{ name: 'Contact', href: '/contact' }]} eyebrow="Contact" title="Visit us at Al Nasr Plaza, Oud Metha—or start on WhatsApp"
        capsule={`Betterway Mortgages is at ${fullAddress}. Book a free consultation, message us on WhatsApp, or send your details for a 48-hour pre-approval from two banks.`} updated={false} />
      <Section title="Book, message or send your profile">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <SlotPicker />
            <div className="card space-y-4 text-[15px]">
              <p className="flex gap-3"><MapPin className="shrink-0 text-teal" size={20} />{fullAddress}</p>
              {SITE.phone && <p className="flex gap-3"><Phone className="shrink-0 text-teal" size={20} /><a href={SITE.phoneHref} className="ulink">{SITE.phone}</a></p>}
              <p className="flex gap-3"><Mail className="shrink-0 text-teal" size={20} /><a href={`mailto:${SITE.email}`} className="ulink">{SITE.email}</a></p>
              <p className="flex gap-3"><Clock className="shrink-0 text-teal" size={20} />{SITE.hours}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a className="btn btn-primary" href={waLink()} rel="noopener"><MessageCircle size={16} /> WhatsApp desk</a>
                <a className="btn btn-ghost" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} rel="noopener">Get directions</a>
              </div>
            </div>
          </div>
          <LeadForm topic="Pre-approval request" />
        </div>
      </Section>
      <section aria-label="Map" className="h-[420px] border-t border-line bg-mist">
        <iframe title="Map to Al Nasr Plaza, Oud Metha" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${q}&output=embed`} />
      </section>
    </>
  );
}
