import { http } from './config'

export default {
    
    listar: () => {
        return http.get('/tools')
    },

    salvar: (tool) => {
        return http.post('/tools', tool)
    },

    remover: (tool) => {
        return http.delete(`/tools/${tool.id}`)        
    },
  
}