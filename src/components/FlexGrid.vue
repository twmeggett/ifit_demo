<template inline-template>
  <div class="grid-container" :style="gridStyle">
    <div class="column" v-for="column in columns">
      <div class="item" v-for="card in column">
        <slot name="Card" :card="card"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.component('FlexGrid', {
    props: ['colSizes', 'cards', 'fetchMoreCards', 'limitReached'],
    data () {
      return {
        columns: []
      }
    },
    computed: {
      gridStyle: function () {
        let style = {
          width: '100%',
          display: 'grid',
          gridGap: '10px',
          gridTemplateColumns: this.columns.map(col => '1fr').join(' ')
        }
        return style
      }
    },
    methods: {
      createColumns: function () {
        let cols = []
        let colSize = 'xs'
        let screenWidth = window.innerWidth
        let colIndex = 0
        const addCard = (card) => {
          cols[colIndex].push(card)
          colIndex += 1
          if (colIndex >= cols.length) {
            colIndex = 0
          }
        }
        if (screenWidth >= 786 && screenWidth < 992) {
          colSize = 'sm'
        } else if (screenWidth >= 992 && screenWidth < 1200) {
          colSize = 'md'
        } else if (screenWidth >= 1200) {
          colSize = 'lg'
        }
        for (let x = 0; x < this.colSizes[colSize]; x++) {
          cols.push([])
        }
        this.cards.forEach((card, index) => {
          addCard(card)
        })
        this.columns = cols
      }
    },
    watch: {
      cards: function () {
        this.createColumns()
      }
    },
    created () {
      this.createColumns()
      document.getElementsByTagName('BODY')[0].onresize = () => {
        this.createColumns()
      }
      window.onscroll = (ev) => {
        const cols = document.getElementsByClassName('column')

        for (let i = 0; i < cols.length; i++) {
          const colOffsetTop = cols[i].offsetTop
          const colChildren = cols[i].children
          let childrenHeight = 0
          for (let y = 0; y < colChildren.length; y++) {
            childrenHeight += colChildren[y].offsetHeight
          }
          if (window.scrollY + window.innerHeight - colOffsetTop > childrenHeight && !this.limitReached) {
            this.fetchMoreCards()
          }
        }
      }
    }
  })
</script>

<style scoped>
  .grid-container {
    display: grid;
  }
  .item {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
