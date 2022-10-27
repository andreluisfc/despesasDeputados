<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        title="DESPESAS"
        :headers="headers"
        :items="data"
        :search="search"
        @click:row="rowAction"
    ></v-data-table>
  </v-card>
</template>

<script>
import {Utils} from "@/plugins/utils";
export default {
  name: 'TableGastos',
  data () {
    return {
      utils: Utils,
      search: '',
      headers: [],
      data: [],
    }
  },
  props: {
    dados: [],
  },
  mounted() {

    this.preparaDados()
  },
  methods: {
    preparaDados(){
      this.headers.push(
          {'text': 'Data', 'value': 'dataDocumento'},
          {'text': 'Fornecedor', 'value': 'nomeFornecedor'},
          {'text': 'Valor', 'value': 'valorLiquido'},
          {'text': 'Descrição', 'value': 'tipoDespesa'},
          {'text': 'Tipo', 'value': 'tipoDocumento'},
      )

      this.dados.forEach( item =>
      {
        item.dataDocumento = this.utils.formatDate(item.dataDocumento)
        item.valorLiquido = 'R$' + this.utils.formatCurrency(item.valorLiquido)
        this.data.push(item)

      })
    },
    rowAction(row){
      if(row.urlDocumento){
        window.open(row.urlDocumento, '_blank')
      }
    }
  }
}
</script>