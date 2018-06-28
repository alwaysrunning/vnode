export default {
    filterSpecialCharacter:(s)=>{
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！·@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        let rs = "";
        for (let i = 0; i < s.length; i++) {
            rs = rs+s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }
}
