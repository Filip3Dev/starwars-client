/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import api from './plugins/api_service';


Vue.use(Vuex);

const arrays = function (params) {
  const lista = []
  params.results.forEach(element => {
    var numberPattern = /\d+/g;
    let resulter = element.url.match(numberPattern)
    resulter = resulter[0]
    element.id = resulter
    lista.push(element)
  });
  params.results = lista;
  return params;
}

export default new Vuex.Store({
  state: {
    people: null,
    people_img: null,
    score: 0,
  },
  mutations: {
    SET_INITIAL(state, payload) {
      state.people = payload;
    },
    SET_IMG(state, payload) {
      state.people_img = payload;
    },
    ADD_SCORE(state, payload) {
      state.score += payload;
    }
  },
  actions: {
    setInitial(context) {
      api.getData()
      .then((answers) => {
        let retorno = arrays(answers)
        context.commit('SET_INITIAL', retorno);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    addScore(context, payload) {
      context.commit('ADD_SCORE', payload);
    }
  },
  getters: {
    listPeople: state => {
      try {
        return state.people.results
      } catch (error) {

      }
    }
  }
});
