'use client';
import React from "react";
import { useState } from "react";
import styles from "../styles/components/Button.module.scss";
import { ResponseMutation, StatsResponse } from "@/types/mutation";
import { generateRandomDna, checkIfMutant } from "@/services/dna-middleware";
import texts from "../styles/components/Texts.module.scss";
import { useRouter } from "next/navigation";
export const Result = ({ stats }: { stats: StatsResponse | null }) => {
  const [result, setResult] = useState<ResponseMutation | null>(null);
    const router = useRouter();
  const handleCheckIfMutant = async () => {
    const body = generateRandomDna();
    const result = await checkIfMutant(body);
    setResult(result);
    router.refresh();
  };


  return (
    <footer className={texts.footer}>
      <button className={styles.button} onClick={handleCheckIfMutant}>
        Intentalo
      </button>
      <div className={texts.statsContainer}>
        {stats && (
          <>
            <p className={texts.statText}>
              Cantidad de mutantes: {stats.count_mutant_dna}
            </p>
            <p className={texts.statText}>
              Cantidad de humanos: {stats.count_human_dna}
            </p>
            <p className={texts.statText}>Ratio: {stats.ratio}</p>
          </>
        )}
        {result && (
          <div>
            {result.message === "Mutante" ? (
              <p className={texts.resultText}>¡Felicidades, eres un mutante!</p>
            ) : (
              <p className={texts.resultText}>
                Lo sentimos, eres un humano cualquiera.
              </p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
