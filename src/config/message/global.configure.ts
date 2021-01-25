export enum MESSAGE {
    // TOKEN_TIMEOUT = <any>{ code:1 ,message: 'token timeout , login again' },
    // CREATE_USER_SUCCEED = <any>{ code:2 ,message: 'create user succeed' },
    NOT_HAVE_PRODUCT_SIZE = <any>{ code: 1, message: 'There is no information in the database.'},
    DELETE_PRODUCT_SUCCEED = <any>{ code: 2, message: 'Delete product succeed.'},
    VALUE_DELETED = <any>{ code: 3,message:  'The data has been deleted.'},
    CREATE_PRODUCT_SUCCESS = <any>{ code: 4, message: 'Create product succeed'},
    CREATE_STATUS_SUCCESS = <any>{ code: 5, message: 'Create status succeed'},
    DELETE_STATUS_SUCCEED = <any>{ code: 6, message: 'Delete status succeed.'},
    CREATE_WORK_SUCCESS = <any>{ code: 7, message: 'Create work succeed'},
    DELETE_WORK_SUCCEED = <any>{ code: 8, message: 'Delete work succeed.'},
    UPDATE_WORK_SUCCESS = <any>{ code: 9, message: 'Update work succeed.'},
    USERNAME_OR_PASSWORD_INCORRECT = <any>{ code: 10, message: 'Invalid username or password.'},
    SIGNUP_ERROR = <any>{ code: 11, message: 'Signup error.'},
    CREATE_WORKFLOW_ERROR = <any>{ code: 12, message: `Create workflow error.`}
  }