import { useState } from "react";
import { Moon, Hemisphere } from "lunarphase-js";


const toLocalDateOnly = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const prettyDate = (d: Date) => {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
};
const titleCasePhase = (phaseEnum: string) =>
  phaseEnum
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

const HEMI = Hemisphere.NORTHERN;

export default function MoonApp() {
  const [showNext, setShowNext] = useState(false);

  const today = toLocalDateOnly(new Date());
  const todayEmoji = Moon.lunarPhaseEmoji(today, { hemisphere: HEMI });
  const todayPhase = titleCasePhase(Moon.lunarPhase(today));

  const next7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return {
      date: d,
      emoji: Moon.lunarPhaseEmoji(d, { hemisphere: HEMI }),
      phase: titleCasePhase(Moon.lunarPhase(d)),
    };
  });

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Moon Phase</h1>
     <h2 className="text-3xl ">Today</h2>
      </header>

      <div className="max-w-xl flex justify-center mx-auto bg-indigo-950/40 border border-white/10 rounded-2xl shadow-xl p-6">
        <div className="gap-6 mt-5">
          <div className="text-8xl drop-shadow-lg">{todayEmoji}</div>
          <div className="space-y-2">
            <div>
              <p className="text-sm  text-gray-400">Today</p>
              <p className="text-lg">{today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phase</p>
              <p className="text-lg font-medium">{todayPhase}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowNext(!showNext)}
                className="px-4 py-2 rounded-xl font-semibold border border-indigo-400/50 bg-indigo-900/40 hover:bg-indigo-900/60"
              >
                {showNext ? "Hide Next 7 Days" : "Show Next 7 Days"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNext && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3  gap-4 max-w-5xl max-h-5xl mx-auto">
          {next7.map((d, idx) => (
            <div key={idx} className="bg-indigo-950/40 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-4xl">{d.emoji}</div>
              <div className="text-xl text-gray-400 mt-2">{prettyDate(d.date)}</div>
              <div className="text-xl font-medium">{d.phase}</div>
            </div>
          ))}
        </div>
      )}

   
    </div>
  );
}
