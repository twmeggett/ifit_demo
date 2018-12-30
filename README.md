# Vue-Pinterest-Layout-Component

> A Vue 2 Pinterest Layout Creator Demo -
Live demo here https://twmeggett.github.io/pint_layout/

## Build & Dev Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev
```

This is an example of a portable Pinterest layout creator component.

#Vue Component Example
```
<flex-grid
  :colSizes="colSizes"
  :cards="cards"
  :fetchMoreCards="pushCards" // component will fetch more cards when one of the columns has been scrolled to the end
  :limitReached="limit"> // component will stop fetching new cards if this is true
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
```

#Props Passed to Component
```
data () {
  return {
    colSizes: { // number of columns you want at this screen size 
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

```
