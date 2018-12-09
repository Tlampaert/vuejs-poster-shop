new Vue({
    el:"#app",
    data: {
        total: 0,
        items: [],
        cart: [],
        searchValue: 'baby',
        lastSearch:'',
        loading:false,
        price: 9.99
    },
    methods: {
        addItem: function(index){
            this.total += this.items[index].unitPrice;
            if(this.items[index].quantity == 0){
                this.cart.push(this.items[index]);
            }
            this.items[index].quantity ++
        },
        inc: function(item)
        {
            item.quantity ++;
            this.total += 9.99;
        },
        dec: function(item)
        {
            item.quantity --;
            this.total -=9.99;
            if(item.quantity == 0)
            {
                this.cart.splice(this.cart[this.cart.indexOf(item)], 1);
            }
        },
        searchSubmit: function()
        {
            this.loading = true;
            items = [];
            this.$http.get('/search/'.concat(this.searchValue))
                      .then(function(res){ 
                            this.lastSearch = this.searchValue;
                            this.items = res.data;
                            this.loading = false;
                       });
        }
    },
    filters: 
    {
        currency: function(price)
        {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function(){
        this.searchSubmit();
    }
});