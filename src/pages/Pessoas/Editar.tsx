import { CSSTransition } from "react-transition-group";
import React, { useEffect, useState, useRef, FormEvent } from 'react';
import './editar.css';
import { Atualizar, Postar, axiosInstance } from "../../../service/User";


interface EditarProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Editar: React.FC<EditarProps> = ({ children, isOpen, handleClose }) => {
  const atualizarUsuario = new Atualizar();
  const nodeRef = useRef(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || quantity === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {

      const dataResponse = await axiosInstance.post('/', {
        nome: name,
        paes: quantity as number,
      });
      window.location.reload()
      

      setName("");
      setQuantity("");

      handleClose();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={{ enter: 0, exit: 1000 }}
      unmountOnExit
      classNames="modal"
      nodeRef={nodeRef}
    >
      <div className="modal" ref={nodeRef}>
        <div className="conteudo-modal">
          {children}
          <p>Atualizar pessoa na fila</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Nome completo do cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Total de pães:"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className='botoes'>
              <button type="submit" className='enviar'>Enviar</button>
              <button type="button" onClick={handleClose} className="cancelar">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Editar;

