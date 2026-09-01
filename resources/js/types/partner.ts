export interface Specialty {
    id: number;
    name_en: string;
    name_ar: string;
}

export interface Partner {
    id: number;
    name: string;
    desc_en: string | null;
    desc_ar: string | null;
    logo: string | null;
    website_url: string | null;
    specialties: Specialty[];
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}
