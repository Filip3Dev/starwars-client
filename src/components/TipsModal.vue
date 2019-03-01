<template>
  <div>
    <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep" @onCancel="closes()">
      <div class="card differModal">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column is-two-fifths">
              <div class="card-image">
                <figure class="image">
                  <img :src="getImg(data)" alt="Image">
                </figure>
              </div>
            </div>
            <div class="column moreClean">
              <p class="title is-4">
                Altura: <span>{{data.height / 100}}</span>
              </p>
              <p class="title is-4">
                Peso: <span>{{data.mass}}KG</span>
              </p>
              <p class="title is-4">
                Cor da pele: <span>{{data.skin_color}}</span>
              </p>
              <p class="title is-4">
                Cor do cabelo: <span>{{data.hair_color}}</span>
              </p>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <p class="title is-4">
                Pais de origem: <span>{{getWorld(data.id)}}</span>
              </p>
              <p class="title is-4">
                Cor dos olhos: <span>{{data.eye_color}}</span>
              </p>
            </div>
            <div class="column">
              <p class="title is-4">
                Especie: <span>{{getSpecies(data.id)}}</span>
              </p>
              <p class="title is-4">
                Pais de origem: <span>{{getWorld(data.id)}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import json from '../assets/all.json'
export default {
  props: ['active', 'data'],
  data: () => ({
    isCardModalActive: true,
    full_list: json
  }),
  created() {
    
  },
  watch: {
    isCardModalActive: function (news) {
      this.$emit('updateCart', this.isCardModalActive)
      this.isCardModalActive = false
    }
  },
  methods: {
    getImg(data){
      let url = '0'
      this.full_list.forEach(element => {
        if (element.id == data.id) {
          url = element.image
        }
      });
      return url
    },
    getWorld(data){
      let url = '0'
      this.full_list.forEach(element => {
        if (element.id == data) {
          url = element.homeworld
        }
      });
      return url
    },
    getSpecies(data){
      let url = '0'
      this.full_list.forEach(element => {
        if (element.id == data) {
          url = element.species
        }
      });
      return url
    }
  },
}
</script>
<style lang="sass" scoped>
.differModal
  height: 60vh
  .container
    margin: 16px 24px
    figure
      height: 100%
      padding: 0px !important
      display: flex
      height: 220px
      text-align: center
      justify-content: center
      img
        height: 220px
        width: auto
    .column
      &.moreClean
        p
          margin-bottom: 10px
          display: flex
          flex-direction: column
      p
        margin: 0px
        margin-bottom: 8px
        color: gray
        font-size: 20px
        font-weight: 500
        span
          font-size: 24px
          font-weight: 600
          color: black
</style>
