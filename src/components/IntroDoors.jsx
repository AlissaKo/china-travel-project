import { useEffect, useState } from "react";

export default function IntroDoors({ image = "/images/background9.jfif" }) {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Уважаем настройку «уменьшить движение» у пользователя
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setHidden(true);
      return;
    }

    // Блокируем скролл на время анимации
    document.body.style.overflow = "hidden";

    // 100 мс — чтобы браузер успел отрисовать закрытые створки до старта
    const start = setTimeout(() => setOpened(true), 100);

    // 1400 мс анимация + 200 мс запас = 1600 мс, затем убираем слой
    const finish = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 1600);

    return () => {
      clearTimeout(start);
      clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  const panelBase =
    "absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)] will-change-transform";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Левая створка — показывает ЛЕВУЮ половину картинки */}
      <div
        className={panelBase}
        style={{
          clipPath: "inset(0 50% 0 0)",
          transform: opened ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <div
          className="absolute inset-0 bg-ink bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
      </div>

      {/* Правая створка — показывает ПРАВУЮ половину картинки */}
      <div
        className={panelBase}
        style={{
          clipPath: "inset(0 0 0 50%)",
          transform: opened ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <div
          className="absolute inset-0 bg-ink bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
      </div>
    </div>
  );
}
