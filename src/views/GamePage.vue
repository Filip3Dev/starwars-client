<template>
  <div class="backgroundGame">
    <div class="container">
      <div class="columns largeTitle">
        <div class="column is-four-fifths">
          <h4>
            Eu acho a sua falta de fé perturbadora
          </h4>
        </div>
        <div class="column coutBox" v-if="hide_count">
          <countdown :date="nowTimer" v-if="listPeople" @updateCart="updateCart"></countdown>
        </div>
      </div>
    </div>
    <div v-if="listPeople" class="container is-fluid">
      <div class="columns is-multiline">
        <div class="column is-one-fifth" v-for="(x,i) in listPeople" :key="i">
          <cards :data="x"/>
        </div>
      </div>
    </div>
    <div v-else>
      
    </div>
    <b-modal :active.sync="isImageModalActive" :canCancel="false">
      <div class="card mobileDiff">
        <div class="card-content">
          <div class="has-text-centered">
            <p class="title text-center">
              Quiz finalizado!
            </p>
          </div>
          <div class="has-text-centered">
            <div class="finalPoints">
              <p class="title text-center">
                {{score}}
              </p>
              <p>
                Pontos
              </p>
            </div>
          </div>
          <div class="has-text-centered">
            <form @submit.prevent="saveProgress">
              <b-field label="Nome">
                <b-input type="text" required v-model="user_data.name"></b-input>
              </b-field>
              <b-field label="Email">
                <b-input type="email" required v-model="user_data.email"></b-input>
              </b-field>
              <button class="button" type="submit">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import cards from '@/components/CardAction.vue';
import countdown from '@/components/CountDown.vue';
require('moment/locale/pt-br');
const moment = require('moment');
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'GamePage',
  components: {
    cards,
    countdown,
  },
  data: () => ({
    isFullPage: true,
    loadingComponent: null,
    isImageModalActive: false,
    user_data: {
      name: '',
      email: ''
    },
    hide_count: true
  }),
  created() {
    this.showDialog()
  },
  watch: {
    listPeople: function (val) {
      setTimeout(() => this.loadingComponent.close(), 1000)
    }
  },
  methods: {
    showDialog(){
      this.$dialog.alert({
          canCancel: false,
          title: 'Avisos',
          message: `
          <h5>Você tem 2 minutos pra acertar a maior quantidade de personagens possivel</h5></br>
          <h5>Você ganha 10 pontos por acerto sem utilizar as pistas</h5></br>
          <h5>Você ganha 5 pontos por acerto se utilizar a pista</h5></br>
          <b>Boa Sorte</b>
          `,
          confirmText: 'Iniciar',
          onConfirm: () => {
            this.getData()
          }
      })
    },
    updateCart(e) {
      this.hide_count = e
      this.isImageModalActive = true
    },
    saveProgress() {
      this.user_data.score = this.score
      localStorage.setItem('user_data', JSON.stringify(this.user_data));
      this.$toast.open({message: 'Parabens resultado salvo com sucesso!',type: 'is-success'})
      this.user_data.score = 0
      this.isImageModalActive = false
      this.user_data.name = ''
      this.user_data.email = ''
      setTimeout(() => window.location.href = "/", 1500)
    },
    getData(){
      this.loadingComponent = this.$loading.open({container: this.isFullPage ? null : this.$refs.element.$el})
      this.$store.dispatch('setInitial')
    }
  },
  computed: {
    nowTimer(){
      let now = new Date()
      let future = moment(now).add(2, 'minutes')
      return future._d
    },
    ...mapGetters(['listPeople']),
    ...mapState(['score'])
  },
};
</script>
<style scoped lang="sass">
.backgroundGame
  min-height: 100vh
  background-image: linear-gradient(141deg, #3725d4 0%, #7957d5 71%, #9b67df 100%)
.largeTitle
  padding-top: 24px
  padding-bottom: 16px
  h4
    font-size: 32px
    color: white
    font-weight: 600
.coutBox
  align-items: center
  justify-content: center
  display: flex
.finalPoints
  p
    &:first-of-type
      margin-top: 16px
      font-size: 4em
      margin-bottom: 0px
form
  width: 50%
  margin: 0px auto
  margin-top: 16px
  .field
    text-align: left
  button
    background: #ff4566
    border: none
    border-radius: 8px
    color: #fff
    cursor: pointer
    font-size: 17px
    height: 50px
    padding: 10px 28px
    width: 60%
    white-space: nowrap
    margin-bottom: 10px
    overflow: hidden
    transition: all .3s cubic-bezier(.6,0,.4,1)
    margin: 0px auto
    box-shadow: 0 10px 34px rgba(255,68,102,.4),0 2px 16px rgba(255,68,102,.2)
</style>