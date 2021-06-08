export const TITLES = ["Mr.", "Mrs.", "Ms.", "Prof.", "Dr."];
export const SUBJECTS = [
    "Mathematics",
    "Mathematical Literacy",
    "Life Orientation",
    "Accounting",
    "Business Studies",
    "Computer Applications Technology",
    "Dramatic Art",
    "Economics",
    "History",
    "Information Technology",
    "Life Science",
    "Music",
    "Physical Science",
    "Visual Arts",
    "IsiZulu",
    "English",
    "Afrikaans",
    "IsiXhosa",
    "IsiNdebele"
];
export const GRADES = [
    "Grade RR",
    "Grade R",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12"
];
export const CUSTOMER = 'CUSTOMER';
export const TEACHER = 'Teacher';
export const LEARNER = 'Learner';
export const IMAGE_CROP_SIZE = 1500;
export const ADMIN = 'Admin';
export const SUPER = 'Super';
export const SYSTEM = 'System';
export const IMAGE_DONE = 'assets/images/done.svg';
export const IMAGE_ERROR = 'assets/images/error.svg';
export const IMAGE_WARN = 'assets/images/warn.svg';
export const TIMER_LIMIT_WAIT = 1000;
export const NOTIFY_EMAILS = 'mrnnmthembu@gmail.com';
export const JOB_MATERIAL = 'Material';
export const JOB_LABOUR = 'Labour';
export const JOB_MAKUP = 'Markup';
export const JOB_TYPE_INTERNAL = 'Internal';
export const JOB_TYPE_CUSTOM = 'Custom';
export const ORDER_TYPE_SALES = 'Invoice';
export const ORDER_TYPE_QOUTE = 'Quote';
export const STOCK_CHANGE_INCREASE = 'Increase';
export const STOCK_CHANGE_DECREASE = 'Decrease';
export const PRODUCT_TYPE_STOCK = 'Stock product';
export const PRODUCT_TYPE_JIT = 'Just in time';
export const PRODUCT_ORDER_LIMIT_MAX = 999999;
export const INTERRACTION_TYPE_LIKE = 'Like';
export const INTERRACTION_TYPE_CHAT = 'Chat';
export const COMPANY_DESCRIPTION = 'Hey there! I am using Prosperity.';


export const SEND_EMAIL_RESET_PASSWORD = 'https://prosperity.tybo.co.za/api/email/email-reset-password-link.php';
export const SEND_EMAIL_ACTIVATE_ACCOUNT = 'https://prosperity.tybo.co.za/api/email/email-welcome-activate-account.php';
export const SEND_EMAIL_GENERAL_TEXT = 'https://prosperity.tybo.co.za/api/email/general-email.php';
export const SEND_EMAIL_BILLING = 'https://prosperity.tybo.co.za/api/email/email-billing.php';

export const COMMON_CONN_ERR_MSG = 'it looks like there is an internet connection problem.';
export const STATUS_DELETED = 99;
export const STATUS_PENDING_PAYMENTS = 5;
export const STATUS_ACTIIVE = 1;
export const STATUS_ACTIIVE_STRING = 'Active';
export const STATUS_TRASHED_STRING = 'Trashed';
export const STATUS_PENDING_EMAIL_VERIFICATION = 4;
export const DEFAULT_DATE = '0000-00-00 00:00:00';

export const GET_PRODUCTS_URL = `api/product/get-products.php`;
export const GET_PRODUCTS_FOR_SHOP_URL = `api/product/get-products-for-shop.php`;
export const GET_PRODUCT_URL = `api/product/get-product.php`;
export const GET_ALL_PRODUCT_URL = `api/product/get-all-products.php`;

export const GET_USERS_URL = `api/user/get-users.php`;
export const GET_USERS_BY_COMPANY_URL = `api/user/get-users-by-company-id.php`;
export const GET_ALL_USERS_URL = `api/user/get-all-users.php`;
export const GET_USER_URL = `api/user/get-user.php`;
export const UPDATE_USER_URL = `api/user/update-user.php`;
export const ADD_USER_URL = `api/user/add-user.php`;
export const ADD_USER_COMPANY_URL = `api/user/add-user-company.php`;

export const GET_CUSTOMERS_URL = `api/customer/get-customers.php`;
export const GET_CUSTOMER_URL = `api/customer/get-customer.php`;
export const GET_CUSTOMER_BY_COMPANY_AND_EMAIL_URL = `api/customer/get-customer-by-comapny-and-email.php`;
export const UPDATE_CUSTOMER_URL = `api/customer/update-customer.php`;
export const ADD_CUSTOMER_URL = `api/customer/add-customer.php`;

export const GET_ORDERS_BY_USER_ID_URL = `api/orders/get-orders-by-user.php`;
export const GET_ORDERS_URL = `api/orders/get-orders.php`;
export const GET_ORDER_URL = `api/orders/get-order-by-id.php`;
export const ADD_ORDER_URL = `api/orders/add-order.php`;
export const PRINT_URL = `api/pdf/inv/i-2.php`;
export const UPDATE_ORDER_URL = `api/orders/update-order.php`;


export const DISCOUNT_TYPES = ['Percentage Off', 'Fixed Amount Off', 'Free Shipping', 'Buy X get Y'];
export const DISCOUNT_APPLIES_TO = ['All Products', 'Specific Products']; //, 'Specific Collections'
export const DISCOUNT_MIN_RQS = ['No Minimum Requirements', 'Minimum Purchase Amount', 'Minimum Purchase Quantity'];
export const DISCOUNT_GROUP = ['Automatically Apply The Discount.', 'Customer Must Enter Promo Code To Get The Discount'];
export const CURRENCY = 'ZAR';
export const COMPANY_TYPE = 'Fashion';
export const MAX_PAGE_SIZE = 20;




