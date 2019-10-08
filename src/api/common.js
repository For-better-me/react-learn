import http from '../util/axios'

export class CommonApi{
    static login(data){
        let url = '/login'
        return http.post(url,data)
    }
    static menu(id) {
        let url = '/functions/'+id
        return http.get(url)
    }
}