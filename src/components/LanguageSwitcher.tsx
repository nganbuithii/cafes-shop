'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export type Locale = (typeof locales)[number];
export const locales = ["en", "vi"] as const;
export const defaultLocale: Locale = "vi";

export default function LocaleSwitcherSelect() {
    return (
        <Suspense>
            <LocaleSwitcherSelectComp />
        </Suspense>
    );
}

function LocaleSwitcherSelectComp() {
    const t = useTranslations("switch_language");
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const param = useParams();
    const locale = useLocale();

    return (
        <div className="relative w-44">
            <Select
                value={locale}
                onValueChange={(value) => {
                    const currentLocale = param.locale as Locale;
                    const newPathName = pathName.replace(`/${currentLocale}`, `/${value}`);
                    const fullUrl = `${newPathName}?${searchParams.toString()}`;
                    router.replace(fullUrl);
                }}
            >
                <SelectTrigger className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-black transition-all duration-300">
                    <SelectValue placeholder={t("title")} className="font-medium" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {locales.map((locale) => (
                        <SelectItem 
                            key={locale} 
                            value={locale} 
                            className="px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 dark:text-black"
                        >
                            {t(locale)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}