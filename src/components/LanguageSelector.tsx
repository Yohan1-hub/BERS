"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Heart, Leaf, ExternalLink } from "lucide-react";

type Lang = {
  code: string;
  name: string;
  native: string;
  supported: boolean;
};

const institutionalLangs: Lang[] = [
  { code: "en", name: "English", native: "English", supported: true },
  { code: "es", name: "Spanish", native: "Español", supported: true },
  { code: "fr", name: "French", native: "Français", supported: true },
  { code: "pt", name: "Portuguese", native: "Português", supported: true },
  { code: "ar", name: "Arabic", native: "العربية", supported: true },
  { code: "zh-CN", name: "Chinese", native: "中文", supported: true },
];

const communityLangs: Lang[] = [
  { code: "qu", name: "Quechua", native: "Runasimi", supported: true },
  { code: "ay", name: "Aymara", native: "Aymar aru", supported: true },
  { code: "gn", name: "Guaraní", native: "Avañe'ẽ", supported: true },
  { code: "guc", name: "Wayuunaiki", native: "Wayuunaiki", supported: false },
  { code: "nah", name: "Nahuatl", native: "Nāhuatl", supported: false },
  { code: "yua", name: "Maya", native: "Maaya t'aan", supported: false },
  { code: "arn", name: "Mapudungun", native: "Mapuzugun", supported: false },
  { code: "sw", name: "Swahili", native: "Kiswahili", supported: true },
  { code: "so", name: "Somali", native: "Af-Soomaali", supported: true },
  { code: "ha", name: "Hausa", native: "Hausa", supported: true },
  { code: "am", name: "Amharic", native: "አማርኛ", supported: true },
  { code: "bn", name: "Bengali", native: "বাংলা", supported: true },
  { code: "ne", name: "Nepali", native: "नेपाली", supported: true },
  { code: "my", name: "Burmese", native: "မြန်မာစာ", supported: true },
  { code: "mi", name: "Māori", native: "Te Reo Māori", supported: true },
];

const gtCode: Record<string, string> = {
  en: "en", es: "es", fr: "fr", pt: "pt", ar: "ar", "zh-CN": "zh-CN",
  qu: "qu", ay: "ay", gn: "gn", sw: "sw", so: "so", ha: "ha",
  am: "am", bn: "bn", ne: "ne", my: "my", mi: "mi",
};

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("English");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cb = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", cb);
    return () => document.removeEventListener("mousedown", cb);
  }, []);

  const trigger = (code: string, name: string) => {
    setOpen(false);
    if (!gtCode[code]) return;
    const sel = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (sel) {
      sel.value = gtCode[code];
      sel.dispatchEvent(new Event("change"));
      setCurrent(name);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-amber-50 hover:text-amber-700"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{current}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-xl border border-slate-100 bg-white shadow-lg">
          {/* Institutional */}
          <div className="p-2 pb-1">
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Institutional Languages
            </p>
            <div className="grid grid-cols-2 gap-0.5">
              {institutionalLangs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => trigger(l.code, l.name)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <span>{l.native}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Community */}
          <div className="p-2 pt-1">
            <div className="flex items-center gap-1.5 px-2 pb-1">
              <Heart className="h-3 w-3 text-rose-400" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                Community Languages
              </p>
            </div>
            <p className="px-2 pb-1.5 text-[10px] italic leading-tight text-slate-400">
              For communities the system leaves behind
            </p>
            <div className="grid grid-cols-2 gap-0.5">
              {communityLangs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => trigger(l.code, l.name)}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-slate-700 transition-colors hover:bg-rose-50"
                >
                  <Leaf className="h-3 w-3 shrink-0 text-emerald-400" />
                  <span className="truncate">{l.native}</span>
                  {!l.supported && (
                    <span className="ml-auto shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-medium text-amber-600">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="mt-1.5 border-t border-slate-100 px-2 pt-1.5 text-[10px] italic leading-tight text-slate-400">
              🌱 Can&apos;t find your language?{" "}
              <a href="/contact" className="text-emerald-600 underline hover:text-emerald-700">
                Tell us
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
