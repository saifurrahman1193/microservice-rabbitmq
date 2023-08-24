// User Route
export const LOGIN = '/login'
export const FORGOT_PASSWORD_REQUEST = '/forgot-password-request'
export const FORGOT_PASSWORD_CODE_VERIFY = '/forgot-password-code-verify'
export const PASSWORD_RESET = '/password-reset'

export const LOGOUT = '/logout'
export const CHANGE_PASSWORD = '/changePassword'
export const UPDATE_PROFILE = '/profileUpdate'
export const ME = '/me'


// users route
export const USERS = '/getAllUsers_p'
export const CREATE_USER = '/createUser'
export const SINGLE_USER_INFO = '/getUser'
export const UPDATE_USER = '/updateUser'

// roles route
export const ROLES_P = '/role/getAllRoles_p'
export const ROLES_ALL = '/role/getAllRoles'
export const ROLE_DELETE = '/role/deleteRole'
export const SINGLE_ROLE_INFO = '/role/getRole'
export const UPDATE_ROLE = '/role/updateRole'
export const CREATE_ROLE = '/role/createRole'

// permission routes
export const PERMISSION_ALL = '/permission/getAllpermissions'
export const PERMISSION_P = '/permission/getAllPermissions_p'
export const CREATE_PERMISSION = '/permission/createPermission'
export const SINGLE_PERMISSION_INFO = '/permission/getPermission'
export const UPDATE_PERMISSION = '/permission/updatePermission'


// permission modules routes
export const MODULE_ALL = '/module/getAllModules'

// reports
export const TRANS_RECHARGE_REP = '/reports/trans_recharge_rep'
export const TRANS_RECHARGE_REP_STATUS_CHANGE = '/reports/transaction_amount_status_change'
export const TRANS_RECHARGE_RETRY = '/reports/transaction_amount_retry'
export const TRANS_RECHARGE_REP_DL_CUSTM_CSV_CHUNK_INSTNT = '/reports/trans_recharge_rep_dl_custm_csv_chunk_instnt'
export const TRANS_RECHARGE_REP_DL_CUSTM_CSV_CHUNK_QUEUE = '/reports/trans_recharge_rep_dl_custm_csv_chunk_queue'

export const TRANS_RECHARGE_REP_DL_CUSTM_CSV_INSTNT = '/reports/trans_recharge_rep_dl_custm_csv_instnt'
export const TRANS_RECHARGE_REP_DL_XL_QUE_CHUNK_BASED = '/reports/trans_recharge_rep_dl_xl_que_chunk_based'
export const TRANS_RECHARGE_REP_DL_XL_FASTEXCEL_INSTANT = '/reports/trans_recharge_rep_dl_xl_fastexcel_instant'
export const TRANS_RECHARGE_REP_DL_CSV_FASTEXCEL_INSTANT = '/reports/trans_recharge_rep_dl_csv_fastexcel_instant'
export const TRANS_RECHARGE_REP_DL_ODS_FASTEXCEL_INSTANT = '/reports/trans_recharge_rep_dl_ods_fastexcel_instant'

export const TRANSACTION_AMOUNT_REDUCTION = '/reports/transaction_amount_reduction'
export const TRANSACTION_AMOUNT_REDUCTION_LIST = '/reports/transaction_amount_reduction_list'

export const RETRY_APP_STATUS_LIST = '/reports/getRetryAppStatusList'

export const IBBL_Transaction_SEARCH_P = '/ibbl-transaction-search/ibbl-transaction-search-paginate'



// trigger amount
export const TRIGGER_AMOUNT = '/trigger-amount/trigger_amount'
export const TRIGGER_AMOUNT_NP = '/trigger-amount/trigger_amount_np'
export const TRIGGER_AMOUNT_SINGLE = '/trigger-amount/get_single_trigger_amount'
export const TRIGGER_AMOUNT_LIST = '/trigger-amount/getTriggerAmounts'
export const TRIGGER_AMOUNT_UPDATE = '/trigger-amount/trigger_amount_update'
export const TRIGGER_AMOUNT_OFFER_EXPIRE = '/trigger-amount/offer_expire'
export const TRIGGER_AMOUNT_CLIENT_BULK_EXPIRE_PROCESSED_DATA = '/trigger-amount/client_bulk_expire_processed_data'
export const TRIGGER_AMOUNT_CLIENT_BULK_EXPIRE = '/trigger-amount/client_bulk_expire'
// ALLOW ALL TRIGGER AMOUNT TO CLIENT
export const ALLOW_ALL_TRIGGER_AMOUNT_TO_CLIENT_PROCESSED_DATA = '/trigger-amount/allow_all_trigger_amount_to_client_processed_data'
export const ALLOW_ALL_TRIGGER_AMOUNT_TO_CLIENT = '/trigger-amount/allow_all_trigger_amount_to_client'
// ADD NEW TRIGGER AMOUNT TO CLIENTS
export const ADD_NEW_TRIGGER_AMOUNT_TO_CLIENTS = '/trigger-amount/add_new_trigger_amount_to_clients'
// blocked amount
export const BLOCKED_AMOUNT_LIST = '/trigger-amount/blocked-amount-list'
export const SINGLE_BLOCKED_AMOUNT = '/trigger-amount/single-blocked-amount'
export const UPDATE_BLOCKED_AMOUNT = '/trigger-amount/update-blocked-amount'
export const ADD_BLOCKED_AMOUNT = '/trigger-amount/add-blocked-amount'




export const OPERATORS_ALL = '/operators/getOperators'
export const CLIENTS_ALL = '/clients/getClients'
export const RECHARGE_STATUS_CODES_ALL = '/recharge_status_codes/getRechargeStatusCodes'
export const RECHARGE_CONNECTION_TYPES_ALL = '/general/getRechargeConnectionTypes'


// Activity log
export const CREATE_ACTIVITY_LOG = '/activity-log/createActivityLog'
export const ALL_ACTIVITY_LOG_P = '/activity-log/getAllActivityLog_p'
export const ALL_ACTIVITY_SUPPORT_DATA = '/activity-log/activity-support-data'



// Manage

// callback
export const GET_CALLBACK_LIST_P = '/callback/getCallbackList_p'
export const CREATE_CALLBACK = '/callback/createCallback'
export const UPDATE_CALLBACK = '/callback/updateCallback'
export const DISABLE_CALLBACK = '/callback/disableCallback'
export const GET_CALLBACK_REPLY_FIELDS = '/callback/getCallbackReplyFields'

// Client IP
export const CLIENT_IP_ADD = '/manage/client/client-ip/client-ip-add'
export const CLIENT_IP_UPDATE = '/manage/client/client-ip/client-ip-update'
export const CLIENT_IP_LIST_P = '/manage/client/client-ip/client-ip-list-paginate'
export const CLIENT_IP_SINGLE = '/manage/client/client-ip/single-client-ip-data'
export const CLIENT_IP_LIST = '/manage/client/client-ip/client-ip-list'


// Notifications
export const MY_NOTIFICATIONS = '/notifications/getMyNotifications'
export const UPDATE_ALL_MY_NOTIFICATIONS_AS_VIEWED = '/notifications/updateAllMyNotificationsAsViewed'
export const UPDATE_SPECIFIC_NOTIFICATION_AS_VIEWED = '/notifications/updateSpecificNotificationAsViewed'


//LIST 
export const USER_LIST = '/list/getAllUserList'
export const CLIENT_LIST_B_O_OPERATOR_CONN_TYPE = '/list/getClientBOOperatorConnType'
export const LOG_TYPES = '/list/getLogTypes'


// DB Process
export const GET_ALL_DB_PROCESS = '/db-process/getAllDBProcess'
export const KILL_DB_PROCESS = '/db-process/killDBProcess'