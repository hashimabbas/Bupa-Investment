import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            src="/transperant_logo.png" 
            alt="Terma Logo" 
            {...props} 
        />
    );
}
