import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Wallet,
  CheckCircle2,
  Quote,
  Sparkles,
} from "lucide-react";
import { useCarouselTick } from "../hooks/useCarouselTick.js";

export default function TourPage({ tour, onBack, onContact }) {
  const tick = useCarouselTick();
  const [pausedIndex, setPausedIndex] = useState(null);

  const photos = tour.images ?? (tour.image ? [tour.image] : []);
  const index =
    pausedIndex !== null
      ? pausedIndex
      : photos.length
        ? tick % photos.length
        : 0;

  // Извлекаем минимальное количество дней из строки «9–12 дней» → 9
  const daysMatch = tour.days.match(/\d+/);
  const dayCount = daysMatch ? Math.min(parseInt(daysMatch[0], 10), 15) : 0;

  return (
    <main className="container-shell py-8 md:py-12">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition hover:text-white"
      >
        <ArrowLeft size={14} /> Все туры
      </button>

      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        {/* ФОТО — сверху на мобильном, справа на десктопе */}
        <div className="order-1 lg:order-2">
          <div
            className="visual-block relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10"
            onMouseEnter={() => setPausedIndex(index)}
            onMouseLeave={() => setPausedIndex(null)}
          >
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={tour.title}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPausedIndex(i)}
                    className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                      i === index ? "w-6 opacity-100" : "w-1.5 opacity-60"
                    }`}
                    aria-label={`Фото ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ТЕКСТ — снизу на мобильном, слева на десктопе */}
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-3">{tour.tag}</p>
          <h1 className="mb-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {tour.title}
          </h1>

          <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-coral" />
              {tour.places}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-coral" />
              {tour.days}
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet size={14} className="text-coral" />
              {tour.price}
            </span>
          </div>

          <p className="mb-6 max-w-lg text-sm leading-7 text-slate-300">
            {tour.desc}
          </p>

          {/* Фичи — компактные чипы */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tour.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-panel/50 px-3 py-1.5 text-xs text-slate-300"
              >
                <CheckCircle2 size={12} className="text-coral" />
                {f}
              </span>
            ))}
          </div>

          {/* Почему этот тур — врезка */}
          {tour.result && (
            <div className="mb-8 border-l-2 border-coral/60 pl-4">
              <p className="eyebrow mb-1.5 flex items-center gap-1.5">
                <Quote size={12} className="text-coral" /> ПОЧЕМУ ЭТОТ ТУР
              </p>
              <p className="text-sm leading-6 text-slate-300">{tour.result}</p>
            </div>
          )}

          {/* План тура по дням */}
          {tour.itinerary?.length > 0 && (
            <div className="mb-8">
              <p className="eyebrow mb-4 flex items-center gap-1.5">
                <Sparkles size={12} className="text-coral" /> ПЛАН ТУРА ПО ДНЯМ
              </p>
              <ol className="relative">
                {tour.itinerary.map((day, i) => (
                  <li
                    key={`${tour.id}-day-${i + 1}`}
                    className="relative flex items-start gap-3 pb-5 last:pb-0"
                  >
                    {i < tour.itinerary.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[13px] top-7 h-full w-px bg-white/15"
                      />
                    )}
                    <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-coral/60 bg-ink text-[11px] font-bold text-coral">
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h2 className="mb-1 text-sm font-semibold text-slate-200">
                        День {i + 1}. {day.title}
                      </h2>
                      <p className="text-sm leading-6 text-slate-300">
                        {day.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <button onClick={onContact} className="btn-primary">
            Обсудить поездку <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </main>
  );
}
