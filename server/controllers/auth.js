
// Authenticate related logic
export default class AuthController{

    async authenticate(data){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    /*
    POST http://localhost:8080/api/v1/user/register
    * @param :{
        "username": "",
        "password": ""
    }
    */
    async login(data){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    async generateOTP(){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    async generateOTP(){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    async createResetSession(){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    async resetPassword(){
        return {
			status: true,
			message: '',
			data: {},
		};
    }
}