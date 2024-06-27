import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"

})

export class User{

    listarall(){
        return axiosInstance.get('/usuarios')
    }
}

export class Totais{

    totasss(){
        return axiosInstance.get('/totais')
    }
}

export class Postar{

    Criar(){
        return axiosInstance.post('/')
    }
    
}

//Classe não implementada, infelizmente

export class Atualizar{
    
        atualizarUsuario(id: number, data: { nome: string, paes: number }) {
            return axiosInstance.put(`/usuarios/${id}`, data);
        }
    
    
}