import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';
import Hero from '@/components/Marketing/Hero';
import StatsSection from '@/components/Marketing/StatsSection';
import KeyHighlights from '@/components/Marketing/KeyHighlights';
import AboutPreview from '@/components/Marketing/AboutPreview';
import PartnerGrid from '@/components/Marketing/PartnerGrid';
import TestimonialsSection from '@/components/Marketing/TestimonialsSection';
import CTASection from '@/components/Marketing/CTASection';
import { Partner } from '@/types/partner';

interface HomeProps {
    partners: Partner[];
    testimonials: any[];
}

export default function Home({ partners, testimonials }: HomeProps) {
    const { props } = usePage();
    const isRtl = props.locale === 'ar';

    return (
        <MarketingLayout>
            <Head title="Home - Medical Solutions & Supplies" />

            <Hero />
            <StatsSection />
            <KeyHighlights />
            <AboutPreview />
            <PartnerGrid partners={partners} />
            <TestimonialsSection testimonials={testimonials} isRtl={isRtl} />
            <CTASection />
        </MarketingLayout>
    );
}
