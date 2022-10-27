<template>
  <v-card class="mx-auto" height="900">
    <v-row>
      <v-col cols="1">
        <v-avatar size="100px">
          <v-img :src="deputado.urlFoto"/>
        </v-avatar>
      </v-col>
      <v-col>
        <v-card-title>{{detalhes.nomeCivil}} ({{detalhes.ultimoStatus.nomeEleitoral}}) - {{deputado.siglaPartido}}</v-card-title>
        <v-card-subtitle>
          ID: {{deputado.id}}
          |
          CPF: {{utils.formatCPF(detalhes.cpf)}}
          |
          Email: {{detalhes.ultimoStatus.email}}
          <br/>
          Data de nascimento: {{utils.formatDate(detalhes.dataNascimento)}}
          |
          Estado última candidatura: {{detalhes.ultimoStatus.siglaUf}}
          <br/>
          <v-row>
            <v-col :cols="detalhes.redeSocial.length">
              <v-tooltip top v-for="(link, i) in detalhes.redeSocial" :key="i">
                <template v-slot:activator="{ on, attrs }">
                <v-btn icon @click="openLink(link)" v-bind="attrs" v-on="on">
                  <v-icon>{{getSocialMediaIcon(link)}}</v-icon>
                </v-btn>
                </template>
                {{link}}
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-divider class="mx-4"></v-divider>
    <table-gastos :dados="gastos"/>

   <v-divider/>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="close"
      >
        Fechar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {Utils} from "@/plugins/utils";
import TableGastos from "@/components/TableGastos";
export default {
  name: 'DetailDeputado',
  components: {TableGastos},
  data () {
    return {
      utils: Utils,
    }
  },
  props: {
    deputado: {},
    detalhes: {},
    gastos: [],
  },
  methods: {
    close() {
      this.$emit('fechar');
    },
    openLink(url){
      window.open(url, '_blank')
    },
    getSocialMediaIcon(url){
      if(url.includes('facebook')){return 'mdi-facebook'}
      if(url.includes('instagram')){return 'mdi-instagram'}
      if(url.includes('twitter')){return 'mdi-twitter'}
      if(url.includes('youtube')){return 'mdi-youtube'}
      return 'mdi-link'

    }
  }
}
</script>