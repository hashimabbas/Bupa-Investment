import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-8 object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-black uppercase text-[#185c2e]">TERMA</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase truncate">Medical Supplies</span>
            </div>
        </>
    );
}
