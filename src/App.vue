<template>  
  <div id="app">
  <b-container class="bv-example-row">
    <b-row>
      <b-col sm="12" offset="6">
        <Vuttr  
          :tool="tool" 
          :tools="tools"
          :salvar="salvar"
          :remover="remover"
        />
      </b-col>      
    </b-row>
  </b-container>
  </div>  
</template>

<script>
import Tool from './services/tools';
import Vuttr from './components/Vuttr';


export default {

  name: 'app',

  data() {
    return {      
      tool: {
        id: '',
        title: '',
        link: '',
        description: '',
        tags: []
      },
      tools: [],      
    }
  },

  mounted() {
    this.listar()    
  },

  methods: {

    listar() {
      Tool.listar().then(res => {
        this.tools = res.data
      }) 
    },

    salvar() {      
      Tool.salvar(this.tool).then( () => {
        this.tool = {}
        this.tool.tags = []
        this.listar()
      }).catch(e => {
        console.log(e.error)
      }) 
    },

    remover(tool) {      
      Tool.remover(tool).then( () => {
        this.listar()
      })      
    }
  },

  components: {    
    Vuttr
  },

}
</script>

<style lang="scss">
@import './assets/styles/variables';
@import './assets/styles/bootstrap';
* {
  color: black;
}
#app {
  display: inline-block;
}
</style>
