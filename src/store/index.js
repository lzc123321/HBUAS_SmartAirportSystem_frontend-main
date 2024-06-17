//import Vue from 'vue'
//import app from '../App'
import { createStore } from 'vuex'


/*
const data = {
    modules: {
        user,
        merchant,
        admin,
        company,
    }
}
*/
export default createStore({
    state: {
        company:{
            companytoken:"2",
        }
      },
      mutations:{
        updateCompany(state, newCompany){
            state.company = newCompany 
        }
      },
      actions:{

      },
      getters: {
        // 定义一个getters
        getCompany (state) {
          return state.company
        }
      },
})