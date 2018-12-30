<template>
  <div class="body" align="center">
    <h1>Album Page</h1>
    <flex-grid
      :colSizes="colSizes"
      :cards="cards"
      :fetchMoreCards="pushCards"
      :limitReached="limit">
      <template slot="Card" slot-scope="slotProps">
        <div class="card-container">
          <img class="card-slot" :src="slotProps.card.src">
          <div class="overlay">
            <div class="title">{{slotProps.card.title}}</div>
            <div class="date">{{slotProps.card.date}}</div>
          </div>
        </div>
      </template>
    </flex-grid>
  </div>
</template>

<script>
import moment from 'moment'
import FlexGrid from './FlexGrid.vue'

const createPicSrc = function () {
  const createDim = () => {
    let randomNum = Math.round(Math.random() * 5) * 100
    if (randomNum < 100) {
      randomNum = 200
    }
    return randomNum
  }
  return `https://picsum.photos/${createDim()}/${createDim()}`
}
const cards = [
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') },
  { src: createPicSrc(), title: 'Title', date: moment().format('MM/DD/YYYY') }
]
export default {
  name: 'AlbumPage',
  data () {
    return {
      colSizes: {
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5
      },
      cards: cards
    }
  },
  computed: {
    limit: function () { return this.cards.length > 150 }
  },
  methods: {
    pushCards: function () {
      cards.forEach(card => this.cards.push(card))
    }
  },
  created () {},
  components: {
    FlexGrid: FlexGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body {
  margin: 2px 10px;
}
.card-slot {
  animation: fadein 1.5s;
}
.card-container {
  position: relative;
}
.overlay {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  position: absolute;
  background: black;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  color: white;
  padding: 10px 15px;
}
.overlay div {
  width: 100%;
}
.overlay:hover {
  opacity: .5;
}
.overlay .title {
  text-align: left;
  font-size: 20px;
}
.overlay .date {
  align-self: flex-end;
  text-align: right;
  font-size: 15px;
}
img {
  width: 100%;
}

h1, h2 {
  font-weight: normal;
}

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
