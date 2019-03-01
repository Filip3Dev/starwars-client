<template>
  <div class="hello">
    <section class="hero is-fullheight is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-half is-offset-3">
              <div class="has-text-centered">
                <img src="https://cdn.ecvol.com/s/www.querocase.com.br/produtos/topsocket-estreladamorte/g/0.png" alt="Star" class="star">
              </div>
              <h1 class="title has-text-centered is-size-3-touch is-size-1-desktop">
                Start Wars Quiz !
              </h1>
              <h3 class="subtitle has-text-centered is-size-4">
                Que a força esteja com você
              </h3>
              <div class="has-text-centered">
                  <transition name="custom-classes-transition"
                    enter-active-class="animated tada"
                    leave-active-class="animated bounceOutRight">
                    <button class="myButton" v-if="show" @click="startChallenge()">
                      Iniciar Desafio
                    </button>
                  </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    show: true,
    msg: ''
  }),
  methods: {
    startChallenge(){
      this.show = !this.show
      setTimeout(() => {
      this.show = !this.show
      this.$router.push('/game')
      }, 1000)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@keyframes scale-star
  0%
    transform: scale(0)
    opacity: 1
  100%
    transform: scale(1)
    opacity: 1
.star
  width: 50%
  margin: 0px auto
  animation: scale-star 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both
.myButton
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
@media (max-width: 580px)
  img
    &.star
      width: 60%
      margin: 0px auto
      animation: scale-star 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s both
</style>
