<template>
  <v-container>
    <v-card
        className="mx-auto"
        max-width="200"
    >
      <v-img
          className="white--text align-end"
          height="200px"
          width="200px"
          :src="deputado.urlFoto"
      >
      </v-img>
      <v-card-title>{{deputado.nome}}</v-card-title>

      <v-card-subtitle className="pb-0">{{deputado.siglaPartido}}</v-card-subtitle>

      <v-card-text className="text--primary">
        <div>CPF: {{this.detalhes.hasOwnProperty('cpf') ? utils.formatCPF(this.detalhes.cpf) : 'CARREGANDO'}}</div>
        <div>Gastos: {{this.gastos.hasOwnProperty('total') ? 'R$' + utils.formatCurrency(this.gastos.total) : 'CARREGANDO'}}</div>
      </v-card-text>

      <v-card-actions>
        <div class="text-center">
          <v-dialog v-model="showModal" width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="orange"
                  text
                  v-bind="attrs"
                  v-on="on"
              >
                Ver mais
              </v-btn>
            </template>
            <detail-deputado :deputado="deputado" :detalhes="detalhes" :gastos="gastos" v-model="showModal" @fechar="() => this.showModal = false"/>
          </v-dialog>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {Utils} from "@/plugins/utils";
import DetailDeputado from "@/components/DetailDeputado";
export default {
  name: 'CardDeputado',
  components: {DetailDeputado},
  data () {
    return {
      utils: Utils,
      detalhes: {},
      gastos: [],
      showModal: false
    }
  },
  created() {
    this.getDetalhes()
    this.getGastos()
    // console.log(this.deputado)
  },
  props: {
    deputado: [],
  },
  methods: {
    getDetalhes(){
      this.deputado.detalhes.then(d => this.detalhes = d)
    },
    getGastos(){
      this.deputado.gastos.then(g => {
        this.gastos = g
        this.gastos.total = this.gastos.reduce((total, d) => total + d.valorLiquido, 0)
      })
    },

  },
}
</script>