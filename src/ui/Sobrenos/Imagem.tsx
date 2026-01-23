import Image from "next/image";

type ImagemProps = {
  src: string;
  alt: string;
};

export function Imagem({ src, alt }: ImagemProps) {
  return (
    <div className="w-full max-w-md">
      <Image
        src={src}
        alt={alt}
        width={420}
        height={280}
        className="rounded-md"
      />
    </div>
  );
}
