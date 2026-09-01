import React from 'react';

interface SectionHeaderProps {
    title: string;
    description?: string;
    subtitle?: string;
    align?: 'center' | 'left' | 'right';
    centered?: boolean;
    accent?: boolean;
    inverted?: boolean;
}

export default function SectionHeader({
    title,
    description,
    subtitle,
    align = 'center',
    centered = false,
    accent = true,
    inverted = false
}: SectionHeaderProps) {
    const resolvedAlign = centered ? 'center' : align;
    const resolvedDescription = description ?? subtitle;

    const alignmentClasses = {
        center: 'text-center items-center',
        left: 'text-left items-start',
        right: 'text-right items-start',
    };

    return (
        <div className={`flex flex-col gap-4 mb-16 ${alignmentClasses[resolvedAlign]}`}>
            <div className="flex flex-col gap-2">
                <h2 className={`text-3xl md:text-5xl font-heading font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                </h2>
                {accent && (
                    <div className={`h-1.5 w-24 bg-secondary rounded-full ${resolvedAlign === 'center' ? 'mx-auto' : ''}`} />
                )}
            </div>
            {resolvedDescription && (
                <p className={`text-lg max-w-2xl leading-relaxed ${inverted ? 'text-white/60' : 'text-muted-foreground'} ${resolvedAlign === 'center' ? 'mx-auto' : ''}`}>
                    {resolvedDescription}
                </p>
            )}
        </div>
    );
}
