"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import styles from "./EnvioModal.module.css";

type Variante = "exito" | "error";

export default function EnvioModal({
  variant,
  onClose,
  onRetry,
}: {
  variant: Variante;
  onClose: () => void;
  onRetry?: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current
      ?.querySelector<HTMLElement>("[data-autofocus]")
      ?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && variant === "exito") {
          onClose();
        }
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="envio-modal-title"
        className={styles.panel}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <span
          className={`${styles.badge} ${
            variant === "error" ? styles.badgeError : ""
          }`}
          aria-hidden="true"
        >
          {variant === "exito" ? (
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path
                d="M4 12.5l5 5L20 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path
                d="M12 5v9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="12" cy="18.5" r="1.4" fill="currentColor" />
            </svg>
          )}
        </span>

        <span className={styles.eyebrow}>
          {variant === "exito" ? "Inscripción recibida" : "Algo salió mal"}
        </span>

        <h2 id="envio-modal-title" className={styles.title}>
          {variant === "exito" ? (
            <>
              Formulario <span className={styles.accent}>enviado</span>
            </>
          ) : (
            <>
              No pudimos <span className={styles.accent}>enviar</span>
            </>
          )}
        </h2>

        <p className={styles.text}>
          {variant === "exito"
            ? "Gracias por sumarte a Generación De-Bate. Recibimos tus datos y muy pronto nos pondremos en contacto contigo."
            : "Revisa tu conexión e inténtalo de nuevo. Tus respuestas siguen aquí, no se han perdido."}
        </p>

        <div className={styles.actions}>
          {variant === "error" && onRetry && (
            <button
              type="button"
              className={styles.ghostButton}
              onClick={onRetry}
            >
              Reintentar
            </button>
          )}
          <button
            type="button"
            className={styles.button}
            onClick={onClose}
            data-autofocus
          >
            {variant === "exito" ? "Cerrar" : "Volver"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
