<template>
    <div class="vuttr">
        <p>{{ tool.description }}</p>
        <b-container class="p-5">

            <header>
                <h1>VUTTR</h1>
                <h3>Very Usefull Tools to Remember</h3>                
            </header>
            
            <b-row>
                <b-col>
                    <input type="text" v-model="search" placeholder="search" />
                </b-col>
                <b-col>
                    <b-form-checkbox                         
                        v-model="tagStatus"                        
                        value="accepted"
                        unchecked-value="not_accepted"                        
                    >
                        search in tags only 
                    </b-form-checkbox>
                </b-col>                
                <b-col>
                    <b-button type="button" class="btn btn-primary" @click="modalForm = !modalForm"> + Add </b-button>
                </b-col>
            </b-row>

            <b-modal @ok.prevent="addTags" centered title="+ Add new tool" size="sm" v-model="modalForm" ok-title="Add tool" >
                <form ref="form" @submit.prevent="addTags">
                    <b-form-group
                        label="Tool title" label-for="toolTitle" invalid-feedback="Tool title is required">
                        <b-form-input id="toolTitle" v-model="tool.title"  required></b-form-input>
                    </b-form-group>
                    <b-form-group  label="Tool link" label-for="toolLink" invalid-feedback="Tool link is required">
                        <b-form-input id="toolLink" v-model="tool.link"  required></b-form-input>
                    </b-form-group>
                    <b-form-group  label="Tool description" label-for="toolDescription" invalid-feedback="Tool description is required">
                        <b-form-textarea id="toolDescription" v-model="tool.description" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                    </b-form-group>
                    <vue-tags-input            
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => tags = newTags"
                    />
                    <legend>hit enter for tags</legend>
                </form>
            </b-modal>

            <b-modal id="myBmodal" @ok="remover(item)" centered title="x Remove tool" size="sm" 
                        v-model="modalRemove" ok-title="Yes, remove" >                        
                <p>Are you sure you want to remove <b>{{ title }}</b>?</p>                
            </b-modal>            
            
            <b-card class="mb-2" md="3" style="max-width: 40rem;" v-for="(item, index) in filteredTools" :key="index">                
                <a :href="item.link">{{ item.title }}</a>
                <b-button @click="itemClicked(item)">x remove</b-button>
                <b-card-text>{{ item.description }}</b-card-text>            
                <span v-for="(tag, index) in item.tags" :key="index">
                    #{{ tag }}
                </span>                
            </b-card>
        </b-container>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {

    data() {
        return {
            modalForm: false,
            modalRemove: false,
            tag: '',
            tags: [],
            title: '',            
            search: '',
            tagStatus: ''
        }        
    },

    props: {        
        tool: Object,
        tools: Array,
        salvar: Function,
        remover: Function,        
    },

    components: {
        VueTagsInput
    },

    methods: {
        addTags() {
            this.tags.map(tag => {
                this.tool.tags.push(tag.text)
            })
            this.tags = []
            this.modalForm = false
            return this.salvar()
        },
        itemClicked(item) {            
            this.title = item.title            
            this.item = item
            this.modalRemove = true
        },      
    },
    
    computed: {
        filteredTools: function() {
            return this.tools.filter((tool) => {
                if(this.tagStatus) {
                    return this.search ? tool.tags.some(tag => tag.includes(this.search)) : this.tools
                }
                return Object.values(tool).some( val => String(val).includes(this.search))                
            })
        },        
    },

}
</script>

<style scoped>

.btn-primary, button {
    float: right;
}
.col {
    margin-bottom: 15px;
}
.custom-control {
    margin-top: 3px;
}

</style>

