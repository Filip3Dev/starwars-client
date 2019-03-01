<template>
  <div class="">
    <div class="card custumCard" v-bind:class="{ acept: isActive, decline: hasError }">
      <div class="card-content">
        <div class="contentImg">
          <img :src="getImg(data)">
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <button class="myButton answer" @click="checkname" :disabled="disable_btn">
            ???
          </button>
        </p>
        <p class="card-footer-item">
          <button class="myButton ask" @click="callModal">
            ...
          </button>
        </p>
      </footer>
       <transition name="custom-class" enter-active-class="animated pulse"
          leave-active-class="animated bounceOutRight">
          <div v-if="!input" class="baseInput">
            <div class="serviceClose">
              <button @click="closeBaby">
                <span class="icon is-small">
                  <i class="material-icons">clear</i>
                </span>
              </button>
            </div>
            <form @submit.prevent="checks">
              <b-field label="Nome do personagem">
                <b-input v-model="name" :id=" 'id-' + data.id"></b-input>
              </b-field>
              <div>
                <button type="submit" class="button is-success is-fullwidth">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </transition>
    </div>
    <modals :active="modal_state" :data="data" v-if="modal_state" @updateCart="updateCart"></modals>
  </div>
</template>
<script>
import api from '../plugins/api_service';
import json from '../assets/all.json'
import modals from '@/components/TipsModal.vue';
import { mapGetters } from 'vuex'
export default {
  name: 'GamePage',
  components: {
    modals
  },
  props: ['data'],
  data: () => ({
    full_list: json,
    name: '',
    input: true,
    user_point: 10,
    isActive: false,
    hasError: false,
    modal_state: false,
    disable_btn: false
  }),
  created() {

  },
  methods: {
    updateCart(e) {
      this.modal_state = e
    },
    filtername: function(val){
      var numberPattern = /\d+/g;
      let resulter = val.url.match(numberPattern)
      resulter = resulter[0]
      val.id = resulter
      return resulter;
    },
    checkname(){
      this.input = !this.input
      let id = 'id-'+this.data.id
      let nodes = document.getElementById(id)
    },
    closeBaby(){
      this.input = !this.input
      this.name = ''
    },
    callModal(){
      this.modal_state = true
      this.user_point = 5
    },
    checks(){
      let user_input = this.name.toLowerCase();
      let namer = this.data.name.toLowerCase();
      let result = user_input.localeCompare(namer);
      if (result === 0) {
        this.closeBaby()
        this.isActive = true
        this.hasError = false
        this.disable_btn = true
        this.$store.dispatch('addScore', this.user_point)
      }else{
        this.closeBaby()
        this.disable_btn = true
        this.isActive = false
        this.hasError = true
      }
    },
    getImg(data){
      let url = '0'
      this.full_list.forEach(element => {
        if (element.id == data.id) {
          url = element.image
        }
      });
      return url
    }
  },
  computed: {
    ...mapGetters(['listPeople']),
  },
};
</script>
<style scoped lang="sass">
.myButton
  border: none
  border-radius: 4px
  cursor: pointer
  font-size: 15px
  height: 40px
  padding: 4px 8px
  width: 100%
  white-space: nowrap
  margin-bottom: 10px
  overflow: hidden
  transition: all .3s cubic-bezier(.6,0,.4,1)
  margin: 0px auto
  &.answer
    color: #fff
    font-weight: 600
    background: #9668e1
    box-shadow: 0 8px 20px rgba(151, 104, 226, 0.4), 0 2px 16px rgba(150, 104, 225, 0.2)
  &.ask
    color: #fff
    font-weight: 600
    background: #2e2dd8
    box-shadow: 0 8px 20px rgba(46, 45, 216, 0.4), 0 2px 16px rgba(46, 45, 216, 0.2)
.contentImg
  margin: 0px auto
  text-align: center
  img
    width: auto
    height: 200px
    margin: 0px auto
.custumCard
  position: relative
  .baseInput
    transition: all 0.5s ease-in
    position: absolute
    width: 100%
    background: rgba(255, 255, 255, 0.9)
    top: 0px
    height: 100%
    padding: 8px
    padding-top: 38px
  .card-footer-item
    padding: 0.5rem
.serviceClose
  display: flex
  align-items: center
  justify-content: flex-end
  position: absolute
  top: 2px
  right: 2px
  button
    margin: 0px
    padding: 0px
    height: 30px
    width: 30px
    display: flex
    align-items: center
    justify-content: center
    align-self: flex-end
    background: black
    color: white
    border-radius: 100%
    cursor: pointer
.card
  &.acept
    background: #7de27d
    border-radius: 8px
    border: 1px solid #0ca000
    box-shadow: 0px 0px 10px 3px #7de27d
    button
      user-select: none
      pointer-events: none
  &.decline
    background: #e27d7d
    border-radius: 8px
    border: 1px solid #da0400
    box-shadow: 0px 0px 10px 3px #e37f7d
    button
      user-select: none
      pointer-events: none
</style>