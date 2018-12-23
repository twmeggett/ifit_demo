<template>
  <div class="hello" align="center">
    <h1>Payments Page</h1>
    <vue-table :columns="columns" :rows="payments" filterable>
      <template slot="Date" slot-scope="slotProps"><p>{{displayDate(slotProps.colData)}}</p></template>
      <template slot="Amount" slot-scope="slotProps"><p>{{usDollarFormatter(slotProps.colData)}}</p></template>
    </vue-table>
  </div>
</template>

<script>
import Vuex from 'vuex'
import moment from 'moment'
import VueTable from './VueTable.vue'
import Payments from '../../static/payments-data.csv'
import { usDollarFormatter } from '../util/formatMoney'

export default {
  name: 'PaymentsPage',
  data () {
    return {
      columns: [
        {
          header: 'Name',
          accessor: 'Name',
          minWidth: 120,
          sortMethod: function (a, b) { // custom sort by last name 
            if(a['Name'].split(' ')[1] > b['Name'].split(' ')[1]) { return 1 }
            if(a['Name'].split(' ')[1] < b['Name'].split(' ')[1]) { return -1 }
            return 0
          }
        },
        {
          header: 'Amount',
          accessor: 'Amount',
          minWidth: 150,
          customCell: true
        },
        {
          header: 'Description',
          accessor: 'Description',
          minWidth: 400,
          editable: true
        },
        {
          header: 'Date',
          accessor: 'Date',
          minWidth: 120,
          customCell: true,
          filterMethod: function(rowValue, filterValue) {
            const re = new RegExp(String(filterValue), 'i')
            const dateFormatted = moment(rowValue).format('MM/DD/YYYY')
            return String(dateFormatted).search(re) >= 0
          },
        }
      ],
      payments: Payments
    }
  },
  computed: Vuex.mapState(['count', 'user']),
  methods: {
    increment () {
      this.$store.dispatch('incrementAsync')
    },
    decrement () {
      this.$store.commit('decrement')
    },
    displayDate (date) {
      return moment(date).format('MM/DD/YYYY')
    },
    usDollarFormatter (amount) {
      return usDollarFormatter(amount)
    }
  },
  created () {
    let countRef = this.$store.state.firebaseApp.database().ref(
        (this.user ? `user/${this.user.uid}/count` : 'public/count'))
    // create the counter if it doesn't exist
    countRef.once('value', function (snapshot) {
      if (!snapshot.exists()) {
        countRef.child('value').set(0)
      }
    })
    this.$store.dispatch('setCountRef', countRef)
  },
  components: {
    VueTable: VueTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter {
  margin: 10px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
  margin-top: 20px;
}
h1, h2 {
  font-weight: normal;
}
</style>
