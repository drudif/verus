import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code · Verus Google Event",
  robots: { index: false, follow: false },
};

const LANDING_URL =
  process.env.NEXT_PUBLIC_LANDING_PAGE_URL ||
  "https://convert.com.br/verus-google-event";

export default function QrPreviewPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg text-center">
        <span className="eyebrow justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
          Material do evento
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
          QR Code <span className="text-gradient">Verus</span>
        </h1>
        <p className="mt-3 text-sm text-cloud-muted">
          Aponte a câmera para acessar a landing apresentada no Google Event.
        </p>

        <div className="glass mt-8 p-6">
          <div className="mx-auto w-fit rounded-2xl bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr/verus-google-event-qr.png"
              alt="QR Code da landing do Verus"
              width={300}
              height={300}
              className="h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]"
            />
          </div>

          <p className="mt-5 break-all rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-cloud-muted">
            {LANDING_URL}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/qr/verus-google-event-qr.png" download className="btn-ghost">
              Baixar PNG
            </a>
            <a href="/qr/verus-google-event-qr.svg" download className="btn-ghost">
              Baixar SVG
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-cloud-faint">
          Os arquivos são gerados por <code className="text-cloud-muted">npm run qr</code>.
          Se o QR acima não aparecer, rode o comando após definir{" "}
          <code className="text-cloud-muted">NEXT_PUBLIC_LANDING_PAGE_URL</code>.
        </p>
      </div>
    </main>
  );
}
