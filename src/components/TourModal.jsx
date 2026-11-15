import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useCarouselTick } from "../hooks/useCarouselTick.js";

export default function TourModal({ tour, onClose, onContact }) {
  const tick = useCarouselTick();
  const [pausedIndex, setPausedIndex] = useState(null);

  if (!tour) return null;

  const photos = tour.images ?? (tour.image ? [tour.image] : []);
  const index =
    pausedIndex !== null
      ? pausedIndex
      : photos.length
        ? tick % photos.length
        : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="glass-card my-auto w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`visual-block relative h-72 overflow-hidden bg-gradient-to-br ${tour.color}`}
          onMouseEnter={() => setPausedIndex(index)}
          onMouseLeave={() => setPausedIndex(null)}
        >
          {/* Все фото стопкой, активное — с opacity 1 */}
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

          {/* Затемнение снизу для читаемости заголовка */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-4 top-4 z-20 rounded-full bg-ink/70 p-2 backdrop-blur"
          >
            <X size={17} />
          </button>

          <div className="absolute bottom-4 left-5 z-10">
            <p className="eyebrow mb-1">{tour.tag}</p>
            <h2 className="text-2xl font-black">{tour.title}</h2>
          </div>

          {/* Точки-индикаторы */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPausedIndex(i)}
                  className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                    i === index ? "w-5 opacity-100" : "w-1.5 opacity-60"
                  }`}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-sm leading-6 text-slate-300">{tour.desc}</p>

          <div className="my-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-ink/70 p-3">
              <p className="text-xs text-slate-500">Продолжительность</p>
              <p className="mt-1 text-sm font-bold">{tour.days}</p>
            </div>
            <div className="rounded-lg bg-ink/70 p-3">
              <p className="text-xs text-slate-500">Стоимость</p>
              <p className="mt-1 text-sm font-bold">{tour.price}</p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {tour.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => onContact()} className="btn-primary">
              Обсудить поездку <ArrowRight size={14} />
            </button>
            <button onClick={onClose} className="btn-secondary">
              Вернуться к турам
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
