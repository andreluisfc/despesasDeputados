<template>
  <v-container>
    <v-autocomplete v-model="searchTerm" :items="nomeDeputados" filled dense clearable label="Pesquisar"/>
    <v-row>
      <v-col cols="4" v-for="d in this.filteredDeputados" :key="d.id">
        <card-deputado :deputado="d"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import CardDeputado from "@/components/CardDeputado";
  export default {
    name: 'HomeView',
    components: {CardDeputado},
    data() {
      return {
        deputados: [],
        searchTerm: [],
        nomeDeputados: [],
      }
    },
    computed: {
      filteredDeputados() {
        return this.searchTerm ? this.deputados.filter(i => this.searchTerm.includes(i.nome)) : this.deputados
      },
    },

    async mounted() {
      await this.getListDeputados();
    },
    methods: {
      async getListDeputados() {
        await this.$http.get('https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome')
            .then(async result => {
              this.deputados = result.data.dados

              for (let i = 0; i < this.deputados.length; i++){
                this.deputados[i].detalhes = this.getDeputado(this.deputados[i].id)
                this.deputados[i].gastos = this.getGastos(this.deputados[i].id)
                this.nomeDeputados.push(this.deputados[i].nome)
              }
              // console.log(this.deputados)
              this.searchTerm = ''
            })
            .catch(err => console.log(err.content))
      },
      getDeputado(id){
        return this.$http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + id)
            .then(async result => {
              return result.data.dados
            })
            .catch(err => console.log(err.content))
      },
      getGastos(id) {
        return this.$http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + id + '/despesas?ordem=ASC&ordenarPor=ano')
            .then(result => { return result.data.dados
            })
            .catch(err => console.log(err))
      },
    },
  }
</script>
