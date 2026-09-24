import SectionHeader from "@/components/reusables/sectionHeader/SectionHeader";
import MovBateContent from "./contents/MovBateContent";
import FormularioContent from "./contents/FormularioContent";
import TiendaContent from "./contents/TiendaContent";
import styles from "./Section2.module.css";

interface Section2Props {
  selected: string | null;
}

export default function Section2({ selected }: Section2Props) {
  if (!selected) return null;

  return (
    <section className={styles.section}>
      {selected === "Mov Bate" && (
        <>
          <SectionHeader
            tag="Mov Bate"
            title="Conoce nuestra causa"
            subtitle="Somos un movimiento ciudadano comprometido con la defensa del orden, la libertad y el bienestar de nuestra gente."
          />
          <MovBateContent />
        </>
      )}
      {selected === "Formulario" && (
        <>
          <SectionHeader
            tag="Formulario"
            title="Haz parte del cambio"
            subtitle="Déjanos tus datos y únete a la causa ciudadana."
          />
          <FormularioContent />
        </>
      )}
      {selected === "Tienda" && (
        <>
          <SectionHeader
            tag="Tienda oficial"
            title="Lleva el bate puesto"
            subtitle="Envíos a toda Colombia."
          />
          <TiendaContent />
        </>
      )}
    </section>
  );
}
