<template>
  <div>
    <div class="hero">
      <div class="wording_background">
        <h1 class="hero_title">WORKING OUT<br />HAS NEVER BEEN SO FUN</h1>
        <p class="hero_description">Welcome to the center of it all. The Fitness Shop<br />presents you with hundreds of workout programs<br />designed to guide your weight loss journey.</p>
      </div>
    </div>
    <div class="background_image parallax" :style="heroImgUrl"></div>
  </div>
</template>

<script>

export default {
  name: 'AlbumPage',
  computed: {
    heroImgUrl () {
      const url = require('../../static/Hero_Image.jpg')
      return {backgroundImage: `url(${url})`}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hero {
    position: relative;
    height: 627px;
    display: flex;
    align-items: flex-end;
    //padding-top: 310px;

    h1 {
      margin: 0;
      font-size: 52px;
      line-height: 44px;
      color: #fdfdfd;
      font-family: "Proxima Nova", "Roboto", sans-serif;
      font-weight: 300;
    }

    p {
      margin: 0;
      font-size: 18px;
      line-height: 18px;
      color: #fdfdfd;
      font-family: "Proxima Nova", "Roboto", sans-serif;
    }

    .hero_title, .hero_description {
      margin-left: 205px;
    }

    .hero_description {
      margin-top: 13px;
    }

    .wording_background {
      margin-bottom: 175px;
      animation: fadeinAndup 2s forwards;
    }
  }
  .background_image {
    position: absolute;
    top: 0;
    left: 0;
    height: 747px;
    width: 100%;
    z-index: -1;
  }
  .parallax {
    background-attachment: fixed;
    background-position: 0% 0%;
    background-repeat: no-repeat;
    background-size: cover;
  }
@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fadeinAndup {
  from { opacity: 0; top: 15px; }
  to   { opacity: 1; top: 0;}
}

</style>
