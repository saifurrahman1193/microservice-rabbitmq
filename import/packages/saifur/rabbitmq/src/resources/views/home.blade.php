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

                    <v-container>

                        <v-card elevation="0">
                            <v-card-title primary-title>
                                <v-spacer></v-spacer>
                                RabbitMQ Playground
                                <v-spacer></v-spacer>
                            </v-card-title>
                        </v-card>


                        <v-row>
                            <v-col cols="6">

                                <v-card class="mx-auto mt-4 mb-2" floating>
                                    <v-card-title>
                                        <h1 class="display-1 mx-auto font-weight-light">Publish Message</h1>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container fluid>
                                            <v-radio-group v-model="publishDetails.exchangeType" inline>
                                                <v-radio label="Default" color="primary" value="default"></v-radio>
                                                <v-radio label="Direct" color="primary" value="direct"></v-radio>
                                                <v-radio label="Fanout" color="primary" value="fanout"></v-radio>
                                                <v-radio label="Topic" color="primary" value="topic"></v-radio>
                                                <v-radio label="Headers" color="primary" value="headers"></v-radio>
                                            </v-radio-group>
                                        </v-container>
                                        <v-form @submit.prevent="publish_message()">
                                            <v-text-field name="message" label="Write a message" id="message"
                                                v-model="publishDetails.message" prepend-icon="mail"
                                                :rules="messageRules"
                                                :error-messages="publishDetailsError.message"></v-text-field>

                                            <v-divider></v-divider>
                                            <p v-if="publishDetailsError?.error"
                                                class="text-danger mt-1 red--text lighten-1 text-center"
                                                v-text="publishDetailsError.publishError"></p>
                                            <p v-if="publishDetailsValid?.valid"
                                                class="text-success mt-1 green--text lighten-1 text-center"
                                                v-text="publishDetailsValid.validMessage"></p>

                                            <v-alert v-text="alert?.message" text
                                                :type="alert?.type == 'success' ? 'success' : 'error'"
                                                :value='alert?.status' sm v-if="!loading"></v-alert>

                                            <v-progress-circular indeterminate color="success"
                                                v-if="loading"></v-progress-circular>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" type="submit" text @click="loading=true">
                                                    <v-icon>mail</v-icon>
                                                    Send Message
                                                </v-btn>
                                            </v-card-actions>

                                        </v-form>
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col cols="6">

                                <v-card class="mx-auto mt-4 mb-2" floating>
                                    <v-card-title>
                                        <h1 class="display-1 mx-auto font-weight-light">Consume Message</h1>
                                    </v-card-title>

                                    <v-card-text>
                                        {{-- <v-container fluid>
                                            <v-radio-group v-model="publishDetails.exchangeType" inline>
                                                <v-radio label="Default" color="primary" value="default"></v-radio>
                                                <v-radio label="Direct" color="primary" value="direct"></v-radio>
                                                <v-radio label="Fanout" color="primary" value="fanout"></v-radio>
                                                <v-radio label="Topic" color="primary" value="topic"></v-radio>
                                                <v-radio label="Headers" color="primary" value="headers"></v-radio>
                                            </v-radio-group>
                                        </v-container>
                                        <v-form @submit.prevent="publish_message()">
                                            <v-text-field name="message" label="Write a message" id="message"
                                                v-model="publishDetails.message" prepend-icon="mail"
                                                :rules="messageRules"
                                                :error-messages="publishDetailsError.message"></v-text-field>

                                            <v-divider></v-divider>
                                            <p v-if="publishDetailsError?.error"
                                                class="text-danger mt-1 red--text lighten-1 text-center"
                                                v-text="publishDetailsError.publishError"></p>
                                            <p v-if="publishDetailsValid?.valid"
                                                class="text-success mt-1 green--text lighten-1 text-center"
                                                v-text="publishDetailsValid.validMessage"></p>

                                            <v-alert v-text="alert?.message" text
                                                :type="alert?.type == 'success' ? 'success' : 'error'"
                                                :value='alert?.status' sm v-if="!loading"></v-alert>

                                            <v-progress-circular indeterminate color="success"
                                                v-if="loading"></v-progress-circular>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" type="submit" text @click="loading=true">
                                                    <v-icon>mail</v-icon>
                                                    Send Message
                                                </v-btn>
                                            </v-card-actions>

                                        </v-form> --}}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

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
            components: {},
            mounted() {},
            data: {
                message_status: '',
                messageRules: [
                    v => !!v || 'Message is required',
                ],
                loading: false,
                publishDetails: {
                    exchangeType: 'default',
                    message: ''
                },
                publishDetailsError: {
                    error: false,
                    publishError: '',
                    message: ''
                },
                publishDetailsValid: {
                    valid: false,
                    validMessage: ''
                },
                alert: {
                    status: null,
                    message: null
                }
            },
            methods: {

                publish_message() {
                    this.loading = true
                    var _this = this

                    axios.post(`/saifur/rabbitmq/publish/send-message-${this?.publishDetails?.exchangeType}`, this
                            .publishDetails)
                        .then(function(response) {
                            console.log(response)
                            _this.loading = false
                            _this.alert = {
                                status: true,
                                type: 'success',
                                message: 'Message successfully published to RabbitMQ queue!'
                            };
                        })
                        .catch(function(error) {
                            console.log(response)
                            _this.loading = false
                            _this.alert = {
                                status: true,
                                type: 'failed',
                                message: 'Failed to send message!'
                            };
                        })
                },

            },
            computed: {

            },
            watch: {},
        })
    </script>
    <style>
        .pointer {
            cursor: pointer;
        }
    </style>
</body>

</html>
