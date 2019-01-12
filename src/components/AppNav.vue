<template>
	<div>
	  <div class="header">
	  	<div class="logo_container">
	  		<img :src="iconUrl" />
	  	</div>
	  	<div class="header_links_container">
	  		<a href="#"><p>LOGIN</p></a>
	  		<a href="#"><p>SIGN UP</p></a>
	  		<a href="#">
	  			<p>MENU<span class="hamburger_icon_container"><HamburgerIcon /></span></p>
	  		</a>
	  	</div>
	  </div>
	  <div class="nav_bar">
	  	<div class="nav_left_container">
	  		<a href="#"><p>Weight Loss</p></a>
	  	</div>
	  	<div class="nav_right_container">
	  		<a href="#" v-on:click="changeNav('overview')"><p :class="selectedNav === 'overview' ? 'selected' : ''">OVERVIEW</p></a>
	  		<a href="#" v-on:click="changeNav('features')"><p :class="selectedNav === 'features' ? 'selected' : ''">FEATURES</p></a>
	  		<a href="#" v-on:click="changeNav('programs')"><p :class="selectedNav === 'programs' ? 'selected' : ''">PROGRAMS</p></a>
	  		<a href="#" v-on:click="changeNav('training')"><p :class="selectedNav === 'training' ? 'selected' : ''">TRAINING</p></a>
	  		<p class="search_icon" v-on:click="toggleSearchOpen"><SearchIcon /></p>
	  		<div :class="`nav_search_box_container ${searchAnimClass}`">
		  		<input type="text" name="search">
		  	</div>
	  	</div>
	  </div>
	</div>
</template>

<script>
import HamburgerIcon from '../../static/Hamburger_Icon.svg'
import SearchIcon from '../../static/Search_Icon.svg'
export default {
  name: 'AppNav',
  data () {
    return {
      selectedNav: 'programs',
      searchOpen: null
    }
  },
  methods: {
    changeNav: function (nav) {
      this.selectedNav = nav
    },
    toggleSearchOpen: function () {
      if (this.searchOpen && this.searchOpen === 'open') {
        this.searchOpen = 'close'
      } else {
        this.searchOpen = 'open'
      }
    }
  },
  computed: {
    searchAnimClass () {
      if (this.searchOpen) {
        if (this.searchOpen === 'open') {
          return 'roll_in_anim'
        }
        return 'roll_out_anim'
      }
    },
    iconUrl () {
      return require('../../static/Ifit_Logo.png')
    }
  },
  components: {
    HamburgerIcon,
    SearchIcon
  },
  created: function () {

  }
}
</script>

<style lang="scss" scoped>
	a {
    text-decoration: none !important;
  }
  
	p {
		margin: 0;
	}

	.header {
		position: relative;
		display: flex;
		justify-content: space-between;
		height: 70px;
		background-color: #141414;
		opacity: .9;
		padding: 0 30px;

		.logo_container {
			margin-top: 20px;
		}
		.header_links_container {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100%;

			p {
				display: inline-block;
				margin-left: 20px;
				font-size: 13px;
				letter-spacing: 0px;
				line-height: 31px;
				color: #fdfdfd;
				font-family: "Proxima Nova", "Roboto", sans-serif;
				font-weight: bold;
			}

			.hamburger_icon_container {
				margin-left: 5px;
			}
		}
	}

	.nav_bar {
		height: 51px;
		background-color: #fdfdfd;
		opacity: .8;
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.nav_left_container {
			p {
				color: #000000;
				font-size: 18px;
				letter-spacing: -1px;
				line-height: 26px;
				font-family: "Proxima Nova", "Roboto", sans-serif;
				font-weight: bold;
			}
		}

		.nav_right_container {
			p {
				display: inline-block;
				margin-left: 20px;
				font-size: 12px;
				letter-spacing: 0px;
				line-height: 26px;
				color: #929292;
				font-family: "Proxima Nova", "Roboto", sans-serif;

				&.selected {
					font-size: 12px;
					letter-spacing: 0px;
					line-height: 12px;
					color: #424242;
					font-family: "Proxima Nova", "Roboto", sans-serif;
					font-weight: bold;
					border-bottom: 1px #929292 solid;
				}
			}
			.search_icon {
				margin-left: 30px;
				cursor: pointer;

				svg {
					position: relative;
    			top: 4px;
    			font-size: 30px;
				}
			}
			.nav_search_box_container {
				display: inline-block;
				width: 0px;
				opacity: 0;
			}

			.nav_search_box_container.roll_in_anim {
				animation: roll_in 1s forwards;
			}
			.nav_search_box_container.roll_out_anim {
				animation: roll_out 1s forwards;
			} 
		}
	}
	@keyframes roll_in {
	  from { opacity: 0; width: 0 }
	  to   { opacity: 1; width: 150px}
	}
	@keyframes roll_out {
	  from { opacity: 1; width: 150px }
	  to   { opacity: 0; width: 0}
	}
</style>
