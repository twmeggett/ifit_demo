<template>
  <div class="programs_page">
    <div class="hero_container">
      <Hero />
    </div>
    <div class="body_container">
      <div class="description">
        <h5>Weight Loss</h5>
        <p>Welcome to the center of it all. The Fitness Shop presents you with hundreds of workout<br />programs designed to guide your weight loss journey.</p>
      </div>
      <div class="grid-container">
        <div class="grid-item" v-for="card in cards">
          <Card
            :src="card.src"
            :title="card.title"
            :subTitle="card.subTitle"
          />
        </div>
      </div>
      <div class="view_more">
        <button>VIEW MORE</button>
      </div>
      <div class="quote">
        <div class="quote_symbol">
          <img :src="quote_symbol_url" />
        </div>
        <div class="text">
          <p>{{ quotes[quoteDot - 1].text }}</p>
        </div>
        <div class="author">
          <p>—{{ quotes[quoteDot - 1].author }}</p>
        </div>
        <div class="selectors">
          <img :src="quoteDot === 1 ? option_dot_selected_url : option_dot_url" v-on:click="changeQuoteDot(1)" />
          <img :src="quoteDot === 2 ? option_dot_selected_url : option_dot_url" v-on:click="changeQuoteDot(2)" />
          <img :src="quoteDot === 3 ? option_dot_selected_url : option_dot_url" v-on:click="changeQuoteDot(3)" />
        </div>
      </div>
      <div class="get_started">
        <p>Get started on your weight loss journey.</p>
        <button>JOIN IFIT TODAY</button>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from './Hero.vue'
import Card from './Card.vue'
export default {
  name: 'ProgramsBody',
  components: {
    Card,
    Hero
  },
  computed: {
    quote_symbol_url () {
      return require('../../static/quote_symbol.png')
    },
    option_dot_url () {
      return require('../../static/option_dot.png')
    },
    option_dot_selected_url () {
      return require('../../static/option_dot_selected.png')
    }
  },
  data () {
    return {
      quoteDot: 1,
      quotes: [
        {
          text: 'To date I have lost 14 Kilos (30 pounds) and my fitness level is at least the same as when I was actively engaged in sports (if not better), thanks to iFit and the range and variation of fitness programs available.',
          author: 'Graham Lambourne'
        },
        {
          text: 'Placeholder Text 2',
          author: 'Placeholder Author 2'
        },
        {
          text: 'Placeholder Text 3',
          author: 'Placeholder Author 3'
        }
      ],
      cards: [
        {
          src: require('../../static/Jillian_Image.jpg'),
          title: 'Get Fit with Jillian Michaels',
          subTitle: 'weight loss'
        },
        {
          src: require('../../static/weight_loss_programs(2).jpg'),
          title: 'Grand Canyon',
          subTitle: 'incline trainer'
        },
        {
          src: require('../../static/weight_loss_programs(3).jpg'),
          title: 'Power Walk',
          subTitle: 'walking'
        },
        {
          src: require('../../static/weight_loss_programs(9).png'),
          title: 'Elliptical Weight Loss',
          subTitle: 'weight loss'
        },
        {
          src: require('../../static/weight_loss_programs(4).jpg'),
          title: 'Off Season Weight Loss',
          subTitle: 'cycling'
        },
        {
          src: require('../../static/weight_loss_programs(5).jpg'),
          title: 'Central Park',
          subTitle: 'fitness'
        },
        {
          src: require('../../static/weight_loss_programs(6).jpg'),
          title: '5K Beginner Training',
          subTitle: 'running'
        },
        {
          src: require('../../static/weight_loss_programs(10).png'),
          title: 'Going Coastal',
          subTitle: 'running'
        },
        {
          src: require('../../static/Jillian_Image.jpg'),
          title: 'Elliptical Weight Loss',
          subTitle: 'weight loss'
        },
        {
          src: require('../../static/weight_loss_programs(7).jpg'),
          title: 'Incline Train',
          subTitle: 'incline trainer'
        },
        {
          src: require('../../static/weight_loss_programs(8).jpg'),
          title: 'Paris',
          subTitle: 'running'
        },
        {
          src: require('../../static/Jillian_Image.jpg'),
          title: 'Get Fit with Jillian Michaels',
          subTitle: 'weight loss'
        }
      ]
    }
  },
  methods: {
    changeQuoteDot: function (num) {
      this.quoteDot = num
    }
  },
  created () {
    let showing = false

    document.addEventListener('load', function () {
      const gridContainer = document.getElementsByClassName('grid-container')[0]
      if (window.scrollY + window.innerHeight >= 1000 && !showing) {
        gridContainer.classList.add('fadeInClass')
        showing = true
      }
    })
    window.onscroll = (ev) => {
      const gridContainer = document.getElementsByClassName('grid-container')[0]
      if (window.scrollY + window.innerHeight >= 1000 && !showing) {
        gridContainer.classList.add('fadeInClass')
        showing = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  a {
    text-decoration: none !important;
  }

  .description {
    text-align: center;
    margin-top: 27px;

    h5 {
      margin: 0;
      font-size: 34px;
      letter-spacing: -1px;
      line-height: 61px;
      color: #424242;
      font-family: "Proxima Nova", "Roboto", sans-serif;
    }

    p {
      margin: 0; 
      margin-top: 9px;
      font-size: 18px;
      line-height: 24px;
      color: #424242;
      font-family: "Proxima Nova", "Roboto", sans-serif;
      text-align: center;
    }
  }
  .grid-container {
    opacity: 0;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 20px;
    grid-row-gap: 50px;
    width: 1024px;
    margin: 50px auto 0 auto;
    &.fadeInClass {
      animation: fadein 2s forwards;
    }
  }
  .view_more {
    display: flex;
    justify-content: center;
    margin: 48px auto 0 auto;

    button {
      height: 61px;
      width: 222px;
      background-color: #0097d9;
      color: white;
      font-size: 17px;
      letter-spacing: 1px;
      line-height: 26px;
      color: #fdfdfd;
      font-family: "Proxima Nova", "Roboto", sans-serif;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }
  }
  .quote {
    position: relative;
    height: 274px;
    background-color: #1e1e1e;
    margin-top: 73px;
    //padding-top: 59px;
    //padding-left: 231px;

    .quote_symbol {
      display: inline-block;
      margin-left: 231px;
      position: relative;
      margin-top: 45px;
      margin-right: 40px;
    }
    .text {
      display: inline-block;
      position: absolute;
      margin-top: 59px;
      width: 848px;
      font-size: 18px;
      line-height: 24px;
      color: #fdfdfd;
      font-family: "Proxima Nova", "Roboto", sans-serif;

      p {
        margin: 0; 
      }
    }
    .author {
      position: absolute;
      top: 140px;
      right: 189px;
      font-size: 18px;
      line-height: 24px;
      color: #0096d6;
      font-family: "Georgia";
      font-style: italic;
    }
    .selectors {
      display: flex;
      justify-content: center;
      position: absolute;
      width: 100%;
      bottom: 21px;

      img {
        margin: 0 3px;
        cursor: pointer;
        width: 6px;
        height: 6px;
      }
    }
  }
  .get_started {
    display: flex;
    height: 136px;
    justify-content: center;
    align-items: center;

    p {
      font-size: 34px;
      line-height: 24px;
      color: #424242;
      font-family: "Proxima Nova", "Roboto", sans-serif;
      margin-right: 31px;
    }
    button {
      width: 222px;
      height: 61px;
      background-color: #0097d9;
      cursor: pointer;
      letter-spacing: 1px;
      line-height: 26px;
      color: #fdfdfd;
      font-family: "Proxima Nova", "Roboto", sans-serif;
      font-weight: bold;
      font-size: 17px;
      text-align: center;
    }
  }

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fadeinAndup {
  from { opacity: 0; padding: 30px 15px 10px 15px }
  to   { opacity: 0.5; padding: 10px 15px;}
}

</style>
