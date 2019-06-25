import { http } from './config'
//import { serverBus } from '../main'

export default {
    props: {
        id: ''
    },

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