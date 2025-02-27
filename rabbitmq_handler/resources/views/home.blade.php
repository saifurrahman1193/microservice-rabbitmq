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
    <script src="{{ asset('/assets/js/vue/axios.min.js') }}"></script>

    <script src="{{ asset('/assets/js/vue/mixins/common.js') }}"></script>
    <script src="{{ asset('/assets/js/vue/components/singlelogfile.js') }}"></script>
    <script src="{{ asset('/assets/js/vue/components/login.js') }}"></script>
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
                                            <v-text-field name="RABBITMQ_QUEUE_NAME" label="Write a rabbitmq queue name"
                                                id="RABBITMQ_QUEUE_NAME" v-model="publishDetails.RABBITMQ_QUEUE_NAME"
                                                prepend-icon="queue" :rules="RABBITMQ_QUEUE_NAMERules"
                                                :error-messages="publishDetailsError.RABBITMQ_QUEUE_NAME"></v-text-field>

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
                                                :value='alert?.status' sm v-if="!loader_p"></v-alert>

                                            <v-progress-circular indeterminate color="success"
                                                v-if="loader_p"></v-progress-circular>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" type="submit" text @click="loader_p=true">
                                                    <v-icon>mail</v-icon>
                                                    Publish Message
                                                </v-btn>
                                            </v-card-actions>
                                        </v-form>
                                    </v-card-text>
                                </v-card>

                                <v-card class="mx-auto mt-4 mb-2" floating>
                                    <v-card-title>
                                        <h2 class="mx-auto font-weight-light">Publish Message Multi</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form @submit.prevent="publish_message_multi()">
                                            <v-text-field name="total_hit" label="Enter the number of messages"
                                                id="total_hit" v-model.number="total_hit" type="number"
                                                prepend-icon="mdi-numeric" >
                                            </v-text-field>

                                            <v-alert v-text="alert2?.message" text
                                                :type="alert2?.type == 'success' ? 'success' : 'error'"
                                                :value='alert2?.status' sm v-if="!loader_p2"></v-alert>

                                            <v-progress-circular indeterminate color="success"
                                                v-if="loader_p2"></v-progress-circular>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" type="submit" text @click="loader_p2=true">
                                                    <v-icon>mdi-email</v-icon>
                                                    Publish Message
                                                </v-btn>
                                            </v-card-actions>
                                        </v-form>

                                    </v-card-text>
                                </v-card>


                                <v-card class="mx-auto mt-4 mb-2" floating>
                                    <v-card-title>
                                        <h2 class="mx-auto font-weight-light">Send Message To A Number</h2>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form @submit.prevent="send_message_to_a_number()">
                                            <v-alert v-text="alert3?.message" text
                                                :type="alert3?.type == 'success' ? 'success' : 'error'"
                                                :value='alert3?.status' sm v-if="!loader_p3"></v-alert>

                                            <v-progress-circular indeterminate color="success"
                                                v-if="loader_p3"></v-progress-circular>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" type="submit" text @click="loader_p3=true">
                                                    <v-icon>mdi-email</v-icon>
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
                                        <v-form @submit.prevent="consume_message()">
                                            <v-text-field name="RABBITMQ_QUEUE_NAME" label="Write a rabbitmq queue name"
                                                id="RABBITMQ_QUEUE_NAME" v-model="publishDetails.RABBITMQ_QUEUE_NAME"
                                                prepend-icon="queue" :rules="RABBITMQ_QUEUE_NAMERules"
                                                :error-messages="publishDetailsError.RABBITMQ_QUEUE_NAME"></v-text-field>


                                            <v-progress-circular indeterminate color="success"
                                                v-if="loader_c"></v-progress-circular>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" type="submit" text @click="loader_c=true">
                                                    <v-icon>mail</v-icon>
                                                    Consume Message
                                                </v-btn>
                                            </v-card-actions>

                                        </v-form>
                                        Please use job otherwise it will block everything
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
                RABBITMQ_QUEUE_NAMERules: [
                    v => !!v || 'Queue name is required',
                ],
                loader_c: false,
                loader_c2: false,
                loader_c3: false,
                loader_p: false,
                loader_p2: false,
                loader_p3: false,
                publishDetails: {
                    exchangeType: 'default',
                    RABBITMQ_QUEUE_NAME: 'export_default_queue',
                    message: ''
                },
                singleSMSDetails: {
                    token:'d2luOndpbnBhc3M=',
                    mobileno:'8801703188752',
                    SMSText:'Welcome to wintel A2P Service',
                    ismasking:false,
                    masking:null,
                    messagetype:1,
                },
                publishDetailsError: {
                    error: false,
                    publishError: '',
                    RABBITMQ_QUEUE_NAME: '',
                    message: ''
                },
                publishDetailsValid: {
                    valid: false,
                    validMessage: ''
                },
                alert: {
                    status: null,
                    message: null
                },
                alert2: {
                    status: null,
                    message: null
                },
                alert3: {
                    status: null,
                    message: null
                },
                total_hit: 1
            },
            methods: {

                publish_message() {
                    this.loader_p = true
                    var _this = this

                    axios.post(`/api/saifur/rabbitmq/publish/send-message-${this?.publishDetails?.exchangeType}`,
                            this
                            .publishDetails)
                        .then(function(response) {
                            console.log(response)
                            _this.loader_p = false
                            _this.alert = {
                                status: true,
                                type: 'success',
                                message: 'Message successfully published to RabbitMQ queue!'
                            };
                        })
                        .catch(function(error) {
                            console.log(response)
                            _this.loader_p = false
                            _this.alert = {
                                status: true,
                                type: 'failed',
                                message: 'Failed to send message!'
                            };
                        })
                },

                publish_message_multi() {
                    this.loader_p2 = true
                    var _this = this

                    for (let index = 0; index < this.total_hit; index++) {
                        axios.post(
                                `/api/saifur/rabbitmq/publish/send-message-${this?.publishDetails?.exchangeType}`,
                                this
                                .publishDetails)
                            .then(function(response) {
                                console.log(response)
                                _this.loader_p2 = false
                                _this.alert2 = {
                                    status: true,
                                    type: 'success',
                                    message: 'Message successfully published to RabbitMQ queue!'
                                };
                            })
                            .catch(function(error) {
                                console.log(response)
                                _this.loader_p2 = false
                                _this.alert2 = {
                                    status: true,
                                    type: 'failed',
                                    message: 'Failed to send message!'
                                };
                            })
                    }
                },

                send_message_to_a_number() {
                    this.loader_p3 = true
                    var _this = this

                    for (let index = 0; index < this.total_hit; index++) {
                        axios.post(`/api/send-message-to-a-number`, this.singleSMSDetails)
                            .then(function(response) {
                                console.log(response)
                                _this.loader_p3 = false
                                _this.alert3 = {
                                    status: true,
                                    type: 'success',
                                    message: 'Message successfully published to RabbitMQ queue!'
                                };
                            })
                            .catch(function(error) {
                                console.log(response)
                                _this.loader_p3 = false
                                _this.alert3 = {
                                    status: true,
                                    type: 'failed',
                                    message: 'Failed to send message!'
                                };
                            })
                    }
                },

                consume_message() {
                    this.loader_c = true
                    var _this = this

                    axios.post(`/api/saifur/rabbitmq/consume/consume-message-${this?.publishDetails?.exchangeType}`,
                            this
                            .publishDetails)
                        .then(function(response) {
                            console.log(response)
                            _this.loader_c = false
                            _this.alert = {
                                status: true,
                                type: 'success',
                                message: 'Message successfully published to RabbitMQ queue!'
                            };
                        })
                        .catch(function(error) {
                            console.log(response)
                            _this.loader_c = false
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
