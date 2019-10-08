import http from '../util/axios'

export class DeviceApi{
    static deviceState(){
        let url = '/DeviceService/getDeviceStatus'
        return http.get(url)
    }
    static getCurrentAsh (id){
        let url = '/getCurrentAsh/'+id
        return http.get(url)
    }
    static getLaserCurve(){
        let url = '/ash/showLaserLine'
        return http.get(url)
    }
    static getASHCurve(type){ //4是检测，0 是瞬时
        let url = '/ash/curve/'+type
        return http.get(url)
    }
}

export class AlarmApi{
    static search(data){
        let url = '/alarm'
        return http.post(url,data)
    }
}