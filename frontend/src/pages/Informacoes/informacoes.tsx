import { useEffect, useState } from "react";
import { Totais } from "../../../service/User";
import "./informacoes.css";
import Image from 'next/image';

interface TO {
    totalPaes: number
    precototal: number
    pessoas: number
}

export default function Informacoes() {

    return (
      <main className="infor">
        <Fila />
        <Vendidos/>
        <Entrada />
      </main>
    );
}

function Fila(){

  const [tota, setTota] = useState<TO | null>(null);
    const toti = new Totais();
    useEffect(() => {
        toti.totasss()
        .then((response)=>{
          console.log(response.data)
          setTota(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }, []);

    return(
        <main className="pessoasfila">
            <div className="cima">
                <p>Pessoas na fila</p>
                <Image src="/person.svg" alt="Lapadarie" width={25} height={22} />
            </div>

            <div className="fila">
              {tota ? (
                <p className="branco">{tota.pessoas}</p>
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>
        </main>
    );
}

function Vendidos(){
    const [tota, setTota] = useState<TO | null>(null);
    const toti = new Totais();
    useEffect(() => {
        toti.totasss()
        .then((response)=>{
          console.log(response.data)
          setTota(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }, []);

    return(
        <main className="vendidos">
            <div className="cima">
                <p>Pães vendidos</p>
                <Image src="/carrinho.svg" alt="Lapadarie" width={25} height={22} />
            </div>

            <div className="quantidade">
              {tota ? (
                <p className="branco">{tota.totalPaes}</p>
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>
        </main>
    );
}

function Entrada(){

  const [tota, setTota] = useState<TO | null>(null);
    const toti = new Totais();
    useEffect(() => {
        toti.totasss()
        .then((response)=>{
          console.log(response.data)
          setTota(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }, []);

    return(
        <main className="entrada">
            <div className="cima">
                <p>Entrada</p>
                <Image src="/entrada.svg" alt="Lapadarie" width={25} height={22} />
            </div>

            <div className="valor">
              {tota ? (
                  <p className="marrom">R$ {tota.precototal}</p>
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>

        </main>
    );
}
