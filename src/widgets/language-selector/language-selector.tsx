"use client";

import { useAction } from "next-safe-action/hooks";
import { Languages } from "lucide-react";

import { useChangeLocale, languages, useI18n } from "locales/client";
import { updateUserAction } from "@/entities/user/model/update-user.action";

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
};

export function LanguageSelector() {
  const action = useAction(updateUserAction);
  const changeLocale = useChangeLocale();

  const t = useI18n();

  const handleLanguageChange = async (newLocale: string) => {
    await action.execute({ locale: newLocale });
    changeLocale(newLocale as "en" | "fr");
  };

  return (
    <div className="dropdown dropdown-end">
      <div className="tooltip tooltip-bottom" data-tip={t("commons.change_language")}>
        <div
          className="btn btn-ghost btn-circle h-8 w-8 p-0 text-xl flex items-center justify-center hover:bg-slate-200 border-none dark:hover:bg-gray-800 rounded-full"
          role="button"
          tabIndex={0}
        >
          <Languages className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        </div>
      </div>
      <ul
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-black dark:text-gray-200 rounded-box  border border-slate-200 dark:border-gray-800"
        tabIndex={0}
      >
        {languages.map((language) => (
          <li className="" key={language}>
            <button
              className="flex items-center gap-2 text-base hover:bg-slate-200 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
              onClick={() => handleLanguageChange(language)}
            >
              <span className="text-lg">{languageFlags[language]}</span>
              <span className="text-base">{language === "en" ? "English" : "Français"}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
