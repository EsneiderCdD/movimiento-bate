import Separator from "@/components/reusables/separator/Separator";
import MovBateContent from "./contents/MovBateContent";
import FormularioContent from "./contents/FormularioContent";
import TiendaContent from "./contents/TiendaContent";
import styles from "./Section2.module.css";

interface Section2Props {
  selected: string | null;
}

export default function Section2({ selected }: Section2Props) {
  if (!selected) return null;

  const separatorTitle =
    selected === "Mov Bate" ? "Mov Bate" : selected;

  return (
    <section className={styles.section}>
      <Separator title={separatorTitle} />
      {selected === "Mov Bate" && <MovBateContent />}
      {selected === "Formulario" && <FormularioContent />}
      {selected === "Tienda" && <TiendaContent />}
    </section>
  );
}
