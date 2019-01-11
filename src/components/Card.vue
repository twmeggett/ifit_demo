<template>
  <div class="card">
    <a href="#">
      <div class="img">
        <img :src="src">
      </div>
      <div class="title">
        <p>{{ title }}</p>
      </div>
      <div class="sub_title">
        <p>{{ subTitle }}</p>
      </div>
    </a>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: ['src', 'title', 'subTitle'],
  computed: {
    jillianImgUrl () {
      return require('../../static/Jillian_Image.jpg')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card {
    position: relative;
    border: 0;
    animation: moveDown .5s;
    &:hover {
      animation: moveUp .5s forwards;
    }

    img {
      height: 241px;
      width: 240px;
    }
    .title {
      p {
        margin: 0;
        padding: 0;
        margin-top: 10px;
        font-size: 16px;
        line-height: 17px;
        color: #424242;
        font-family: "Proxima Nova", "Roboto", sans-serif;
        font-weight: bold;
      }
    }
    .sub_title {
      p {
        margin: 0;
        padding: 0;
        font-size: 12px;
        letter-spacing: 0px;
        color: #929292;
        font-family: "Georgia", "Roboto", sans-serif;
        font-style: italic;
      }
    }
  }

@keyframes moveUp {
  from { top: 0; }
  to   { top: -15px; }
}

@keyframes moveDown {
  from { top: -15px; }
  to   { top: -0; }
}

</style>
