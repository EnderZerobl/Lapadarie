'use client'
import "./pedidos.css";
import { useState } from "react";
import Modal from "./Modal";
import Pessoas from "../Pessoas/pessoas";

export default function Pedidos() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="allpedidos">

      <section className="pedidos">
        
        <div className="addpedidos">
          <button onClick={() => setIsOpen(true)}>+ Adicionar pessoa a fila</button>
        </div>

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <></>
        </Modal>

        <Pessoas/>

      </section>

    </main>
  );
}
