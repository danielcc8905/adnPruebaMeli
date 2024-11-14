
import "../styles/main.scss";
import texts from "../styles/components/Texts.module.scss";
import Header from "@/components/Header";
import {  StatsResponse } from "@/types/mutation";
import { fetchStats } from "@/services/stats-middleware";
import { Result } from "@/components/Result";

export default async function Home() {
  const stats: StatsResponse = await fetchStats();

  return (
    <div>
      <Header />
      <main className={texts.container}>
        <div>
          <h1 className={texts.title_page}>Presiona el boton y ... </h1>
          <p className={texts.interestingText}>
            descubre si eres parte de una especie especial o un humano común.
            ¡Haz la prueba y sorpréndete!
          </p>
        </div>
      </main>
      <Result stats={stats} />
    </div>
  );
}
