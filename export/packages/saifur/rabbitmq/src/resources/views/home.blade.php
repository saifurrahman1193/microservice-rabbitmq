<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Saifur RabbitMQ</title>

    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
    @if (preg_match('/127.0/', Request::ip()))
        <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
    @else
        <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.min.js"></script>
    @endif

    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
    <script src="{{ asset('vendor/saifur/rabbitmq/assets/js/vue/axios.min.js') }}"></script>

    <script src="{{ asset('vendor/saifur/rabbitmq/assets/js/vue/mixins/common.js') }}"></script>
    <script src="{{ asset('vendor/saifur/rabbitmq/assets/js/vue/components/singlelogfile.js') }}"></script>
    <script src="{{ asset('vendor/saifur/rabbitmq/assets/js/vue/components/login.js') }}"></script>
</head>

<body>

    <div class="content-wrapper" style="min-height: 0px;" id="app">

        <v-app style="background-color: #fafafa !important;">
            <v-sheet class=" ma-2" elevation="0" color="grey lighten-5">

                <v-main>

                    <v-card elevation="0">
                        <v-card-title primary-title>
                            <v-spacer></v-spacer>
                            RabbitMQ Management
                            <v-spacer></v-spacer>
                        </v-card-title>

                        <v-card-text>



                            <v-btn color="success" type="submit" text @click="publish_message">
                                <v-icon>mail</v-icon>
                                Send Message
                            </v-btn>
                            <v-span v-text='message_status'></v-span>


                        </v-card-text>
                    </v-card>

                </v-main>

            </v-sheet>


        </v-app>
    </div>


    <script>
        var _this = this
        var app = new Vue({
            vuetify: new Vuetify(),
            el: '#app',
            mixins: [commonMixin],
            components: {  },
            mounted() {
            },
            data: {
                message_status: '',
            },
            methods: {

                publish_message() {
                    this.isLoading=true
                    var _this = this

                    axios.post('/saifur/rabbitmq/publish/send-message', {message: 'hello world!'})
                        .then(function(response) {
                            console.log(response)
                            _this.isLoading=false
                            _this.message_status = 'Message successfully published to RabbitMQ queue!';
                        })
                        .catch(function(error) {
                            _this.files = []
                            _this.isLoading=false
                            _this.message_status = 'Failed to send message!';
                        })
                },

            },
            computed: {

            },
            watch: {
            },
        })
    </script>
    <style>
        .pointer {cursor: pointer;}
    </style>
</body>
</html>
