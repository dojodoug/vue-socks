Vue.component('product-details', {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: `
		<ul>
			<li v-for="detail in details">{{ detail }}</li>
		</ul>

	`
})

Vue.component('product-sizes', {
	props: {
		sizes: {
			type: Array,
			required: true
		}
	},
	template: `
		<ul>
			<li v-for="size in sizes">{{ size }}</li>
		</ul>

	`
})

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		},
	},
	template: `
		<div class="product">
			<div class="product-image">
				<img v-bind:src="image" >
			</div>
			<div class="product-info">
				<h1>{{ title }}</h1>
				<p v-if="inStock">In Stock</p>
				<p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
				<p v-if="inStock">{{ onSale }}</p>
				<p>Shipping: {{ shipping }}</p>

				<p>Details</p>
				<product-details :details="details"></product-details>

				<p>Sizes</p>
				<product-sizes :sizes="sizes"></product-sizes>

				<div v-for="(variant, index) in variants" 
					:key="variant.variantId" 
					class="color-box"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="updateProduct(index)" >
				</div>

				<button v-on:click="addToCart" 
					:disabled="!inStock"
					:class="{ disabledButton: !inStock }">Add to Cart</button>
				<button v-on:click="removeFromCart"
					:disabled="!inStock"
					:class="{ disabledButton: !inStock }">Remove from Cart</button>
			</div>
		</div>
	`,
	data() {
		return {
			brand: 'Vue',
			product: 'Socks',
			// image: './assets/vmSocks-green.jpg',
			selectedVariant: 0,
			// inventory: 0,
			// inStock: false,
			// onSale: true,
			details: ["80% cotton", "20% polyester", "Gender-neutral"],
			sizes: ["Small", "Medium", "Large"],
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: './assets/vmSocks-green.jpg',
					variantQuantity: 10
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: './assets/vmSocks-blue.jpg',
					variantQuantity: 0
				}
			],
			// cart: 0
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId, 'add')
		},
		removeFromCart() {
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
		},
		updateProduct(index) {
			this.selectedVariant = index
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedVariant].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		onSale() {
			return this.brand + ' ' + this.product + ' are ON SALE NOW!'
		},
		shipping() {
			if (this.premium) {
				return "Free"
			}
			return 2.99
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []
	},
	methods: {
		updateCart(id, add) {
			if (add) {
				this.cart.push(id)
			} else {
				if (this.cart.length) {
					let revised_cart = this.cart.filter(cart =>
						cart.id === id
					) 
					this.cart = revised_cart
				}
			}
		}
	}
})