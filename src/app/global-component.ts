import { environment } from "src/environments/environment"
import { CookieManager } from './utils/cookie-manager';

export const TOKEN_KEY = 'token';
export const CURRENT_USER_KEY = 'currentUser';

const token = sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || CookieManager.get(TOKEN_KEY);

export const GlobalComponent = {
    // Api Calling
    // API_URL : 'https://api-node.themesbrand.website/',
    API_URL : environment.fileUrl,
    headerToken : {'Authorization': `Bearer ${token}`},

    // Auth Api
    // AUTH_API:"https://api-node.themesbrand.website/auth/",
    AUTH_API:environment.apiUrl + "/auth/",

    
    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',
    
    role:'/master/role',
    user:'/master/user',
    projectFlow:'/master/project-flow',
    projectFlowState:'/dashboard/project/state',
    projectTeam:'/project/team',
    projectTask:'/project/task',
    
    TOKEN_KEY,
    CURRENT_USER_KEY,
}