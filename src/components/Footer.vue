<template>
  <div class="footer">
    <div class="links">
      <ul>
        <li><a href="#">Blog+Videos</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Company</a></li>
        <li><a href="#">Press</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Support</a></li>
        <li><a href="#">Legal</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <ul class="social_links">
        <li><a href="#"><FbIcon /></a></li>
        <li><a href="#"><TwitIcon /></a></li>
        <li><a href="#"><GPlusIcon /></a></li>
        <li><a href="#"><PintIcon /></a></li>
        <li><a href="#"><InstaIcon /></a></li>
        <li><a href="#"><YtIcon /></a></li>
      </ul>
    </div>
    <div class="copy_and_lang">
      <p class="copywrite">Copyright © iFit.com, All rights reserved.</p>
      <p class="lang_select">LANGUAGE: ENGLISH<a href="#"><DropDownIcon /></a></p>
    </div>
  </div>
</template>

<script>
import FbIcon from '../../static/fb_icon.svg'
import GPlusIcon from '../../static/g_plus_icon.svg'
import InstaIcon from '../../static/insta_icon.svg'
import PintIcon from '../../static/pinterest_icon.svg'
import TwitIcon from '../../static/twitter_icon.svg'
import YtIcon from '../../static/yt_icon.svg'
import DropDownIcon from '../../static/dropdown_icon.svg'
export default {
  name: 'Footer',
  components: {
    FbIcon,
    GPlusIcon,
    InstaIcon,
    PintIcon,
    TwitIcon,
    YtIcon,
    DropDownIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  a {
    text-decoration: none !important;
  }

  .footer {
    height: 50px;
    background-color: #151515;
    padding: 0 29px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
      display: inline-block;
    }

    li, a {
      font-size: 10px;
      color: #747475;
      font-family: "Proxima Nova", "Roboto", sans-serif;
      font-weight: bold;
    }

    li {
      display: inline-block;
      margin-right: -4px;

      &:after { 
        content: "/";
        margin: 0 10px;
      }
      &:last-child:after {
        content: "";
        margin: 0;
      }
    }

    .social_links {
      margin-left: 25px;

      li {
        margin-right: 16px;

        &:after { 
          content: "";
          margin: 0;
        }
      }
    }

    .copy_and_lang {
      p {
        display: inline-block;
      }

      .copywrite {
        font-size: 10px;
        line-height: 14px;
        color: #747475;
        font-family: "Proxima Nova", "Roboto", sans-serif;
      }
      .lang_select {
        margin-left: 12px;
        font-size: 10px;
        color: #747475;
        font-family: "Proxima Nova", "Roboto", sans-serif;
        font-weight: bold;
        text-align: right;

        a {
          position: relative;
          top: -2px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
