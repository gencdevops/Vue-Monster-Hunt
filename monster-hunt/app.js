new Vue({
    el : "#app",
    data : {

        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : [],
        attack_multiple : 10,
        special_attack_multiple : 25,
        heal_up_multiple : 20,
        monster_attack_multiple : 25,


    },
    methods : {
        start_game : function() {
        this.game_is_on = true

        },

        attack : function() {
        var point = Math.ceil(Math.random() * this.attack_multiple)
           // alert(point)
        this.monster_heal -= point
            this.add_to_log({turn : "p" , text : "OYUNCU ATAGI ("+ point +")"})

            this.monster_attack()


        },

        special_attack : function() {
            var point = Math.ceil(Math.random() * this.special_attack_multiple)
            // alert(point)
            this.monster_heal -= point
            this.add_to_log({turn : "p" , text : "ÖZEL OYUNCU ATAGI ("+ point +")"})
            this.monster_attack()

        },

        heal_up : function() {
            var point = Math.ceil(Math.random() * this.heal_up_multiple)
            // alert(point)
            this.player_heal += point
            this.add_to_log({turn : "p" , text : "İLK YARDIM("+ point +")"})

        },

        give_up : function() {
            this.player_heal = 0
            this.add_to_log({turn : "p" , text : "OYUNCU PES ETTI"})


        },

        monster_attack : function () {
            var point = Math.ceil(Math.random() * this.monster_attack_multiple)
            // alert(point)
            this.player_heal -= point
            this.add_to_log({turn : "m" , text : "CANAVAR ATAGI ("+ point +")"})

        },

        add_to_log : function (log) {
            this.logs.push(log)
        },

    },

    watch : {
        player_heal : function(value) {
            if(value <= 0) {
                this.player_heal = 0;
                if(confirm("Oyunu KAYBETTIN. Tekrar denemek ister misin?")){
                    this.monster_heal  = 100
                    this.player_heal = 100
                    this.logs = [];
                }
            }


            else if(value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal : function(value) {
            if(value <= 0) {
                this.monster_heal = 0
                if(confirm("Oyunu KAZANDIN. Tekrar denemek ister misin?")) {
                    this.monster_heal = 100
                    this.player_heal = 100
                    this.logs = [];
                }
            }
        }
    }

});