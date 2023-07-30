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


                            <v-data-table :headers="headers" :items="files" :search="search"
                                :footer-props="{ 'items-per-page-options': [10, 50, 500, -1] }">
                                <template v-slot:item="{item, index}">
                                    <tr>
                                        <td>
                                            <v-checkbox @click="addRemoveCheckBoxSelectItem(item, index)" :id="`select-${index+1}`"></v-checkbox>
                                        </td>
                                        <td>
                                            <span v-text="index+1"></span>
                                        </td>
                                        <td>

                                            {{-- single log file view --}}
                                            <v-tooltip top >
                                                <template v-slot:activator="{ on }">
                                                    <v-btn  text v-on="on" style="text-decoration:none;" icon
                                                    @click="viewLogFile(item?.file_name, item?.file_path)"
                                                    >
                                                        <v-icon color="light-blue" v-on="on">preview</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>View Log?</span>
                                            </v-tooltip>


                                            {{-- download --}}
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn text v-on="on" style="text-decoration:none;" icon
                                                        @click="downloadLogFile(item?.file_path, item?.file_name)"
                                                        >
                                                        <v-icon color="success darken-1" v-on="on">save_alt
                                                        </v-icon>
                                                    </v-btn>
                                                </template>
                                                <span v-text="`Download`"></span>
                                            </v-tooltip>

                                            {{-- single delete --}}
                                            <v-tooltip top >
                                                <template v-slot:activator="{ on }">
                                                    <v-btn  text v-on="on" style="text-decoration:none;" icon
                                                    @click="deleteLogFile(item?.file_path)">
                                                        <v-icon color="pink" v-on="on">delete</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Delete File?</span>
                                            </v-tooltip>





                                        </td>
                                        <td>
                                            <span v-text="item?.file_name"></span> <br>
                                            <v-chip color="red" outlined  small
                                                v-text="`Memory Limit ${getFileSizeKBMB(info?.memory_limit)} Exceeded`"
                                                v-if="item?.memory_limit_exceeds"
                                            ></v-chip>
                                        </td>
                                        <td>
                                            <span v-text="item?.date"></span>
                                        </td>
                                        <td>
                                            <span v-text="getFileSizeKBMB(item?.size)"></span>

                                        </td>
                                    </tr>
                                </template>

                            </v-data-table>



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
                info: {},
                files: [],
                search: '',
                selected: [],
                log_file: {},
                isLoading: false,
                headers: [
                    {
                        text: 'Select',
                        value: 'select',
                        width: '90px',
                        sortable: false,
                    },
                    {
                        text: 'Id',
                        value: 'index',
                        width: '70px',
                        sortable: false,
                    },
                    {
                        text: 'Action',
                        value: 'action',
                        sortable: false,
                    },
                    {
                        text: 'File',
                        value: 'file_name'
                    },
                    {
                        text: 'Date',
                        value: 'date'
                    },
                    {
                        text: 'Size',
                        value: 'size'
                    },
                ],
            },
            methods: {



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
