'use client'
import Header from "@/pages/Header/Header";
import Informacoes from "@/pages/Informacoes/informacoes";
import styles from "./page.module.css";
import Pedidos from "@/pages/Pedidos/Pedidos";
import Footer from "@/pages/Footer/Footer";
import { User } from "../../service/User";
import { useEffect, useState } from "react";


export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Informacoes />
      <Pedidos />
      <Footer />
    </main>
  );
}
