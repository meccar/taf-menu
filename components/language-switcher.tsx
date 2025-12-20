"use client";

import { useI18n } from "@/lib/i18n/context";
import {
  Language,
  languageNames,
  supportedLanguages,
} from "@/lib/i18n/translations";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-popover border border-border rounded-md shadow-md p-1 z-50"
          align="end"
        >
          {supportedLanguages.map((lang) => (
            <DropdownMenu.Item
              key={lang}
              className={`flex items-center px-3 py-2 text-sm rounded-sm cursor-pointer outline-none ${
                language === lang
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onSelect={() => setLanguage(lang)}
            >
              <span className="mr-2">{getLanguageFlag(lang)}</span>
              {languageNames[lang]}
              {language === lang && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function getLanguageFlag(lang: Language): string {
  const flags: Record<Language, string> = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    zh: "🇨🇳",
    ja: "🇯🇵",
  };
  return flags[lang];
}
