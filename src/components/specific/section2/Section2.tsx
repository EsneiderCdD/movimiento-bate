import SectionHeader from "@/components/reusables/sectionHeader/SectionHeader";
import NosotrosContent from "@/components/specific/nosotros/NosotrosContent";
import BateadoresContent from "./contents/BateadoresContent";
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
          <NosotrosContent />
        </>
      )}
      {selected === "Los Bateadores" && (
        <>
          <SectionHeader
            tag="Los Bateadores"
            title="Sé parte del cambio"
            subtitle="Formamos líderes que transforman sus comunidades desde adentro."
          />
          <BateadoresContent />
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
