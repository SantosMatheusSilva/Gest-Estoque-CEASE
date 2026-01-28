import FaqAccordion from "@/src/ui/faq/faqAccordion";
export default function FaqPage() {
  return (
    <main className="h-svh mt-20 flex flex-col justify-center items-center">
      <h2>Duvidas frequentes</h2>
      <section className="flex items-center justify-center min-h-screen w-full">
        <FaqAccordion />
      </section>
    </main>
  );
}
