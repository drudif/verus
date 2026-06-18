import { redirect } from "next/navigation";

// A landing canônica vive em /verus-google-event.
// A raiz apenas redireciona para lá (conveniência se o QR apontar para o domínio).
export default function Home() {
  redirect("/verus-google-event");
}
