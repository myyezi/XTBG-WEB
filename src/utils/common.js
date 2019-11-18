import ajax from '@/utils/request'
import $ from 'jquery-slim'

export const tool = {
    data() {
        return {
            searchParam: {},
            pageSize: 10,
            pageSizeSetting: [10, 20, 40, 100],
            page: 1,// 当前页
            listCount: 1,
            listUrl: "",
            pageLayout: "total, sizes, prev, pager, next, jumper",
            list: [],
            loading:false,
        }
    },
    watch:{
        loading(val){
            this.$root.$children[0].loading = val;
        },
    },
    // 返回页面调用
    activated(){
        this.getList();
    },
    methods: {
        // 切换列表Url
        getListByUrl(url) {
            this.listUrl = url;
            this.resetList();
        },
        //重置筛选
        resetList() {
            this.searchParam = {};
            this.handleCurrentChange(1);
        },
        //切换页容量
        handleSizeChange(val) {
            this.pageSize = val;
            this.page = 1;
            this.getList();
        },
        //翻页
        handleCurrentChange(val) {
            this.page = val;
            this.getList();
        },
        getListBefore(params){},
        getListAfter(callback){},
        //查询列表
        getList(callback) {

            if(!this.listUrl){
                return;
            }
            const params = Object.assign({},this.searchParam);
            params.size = this.pageSize;
            params.current = this.page;
            // params.rows = this.pageSize;
            // params.page = this.page;
            this.getListBefore(params);
            ajax.get(this.listUrl, params).then(res => {

                if(typeof res.records === "object"){
                    this.list = res.records;
                    this.listCount = res.total;
                }
                if(typeof res.rows === "object"){
                    this.list = res.rows;
                    this.listCount = res.records;
                }
                if(typeof res.list === "object"){
                    this.list = res.list;
                    this.listCount = res.total;
                } else {
                    $.isFunction(callback) && callback(res);
                    this.getListAfter();
                }
            })
        },

        showMessage(text, type, callback) {
            this.$message({
                showClose: true,
                message: text,
                duration: 2000,
                type: type || 'error',
                onClose: callback || function () {
                }
            });
        },
        checkResponse(res, disabledMessage) {
            if (res && res.status === 0) {
                return true;
            } else {
                this.showMessage(res.message);
                return false;
            }
        },
        closeCurPage(url){
            let tag = $(".tags-view-item.active .el-icon-close");
            this.$router.push({path:url});
            window.setTimeout(_ =>{
                tag.click();
            },500);
        },
        getCurrentUserInfo(){
            return this.extend(true,{},this.$store.getters.user);
        },
        getCurrentUserAuthority(url) {
            let auth = this.$store.getters.auth;
            return auth.indexOf(url) !== -1;
        },
        downloadFile(filePath, fileName) {
            var param = "filePath=" + filePath +
                "&fileName=" + fileName;

            location.href = encodeURI(this.exportUrl("file/download/downloadFile?" + param));
        },
        exportUrl(url){
            var token = this.$store.getters.token;
            if (token) {
                if (url.indexOf("?") != -1)
                    return process.env.BASE_API + url + "&access_token=" + token + "&t=" + new Date().getTime();
                else {
                    return process.env.BASE_API + url + "?access_token=" + token + "&t=" + new Date().getTime();
                }
            }
            else {
                if (url.indexOf("?") != -1) {
                    return process.env.BASE_API + url + "&t=" + new Date().getTime();
                }
                else {
                    return process.env.BASE_API + url + "?t=" + new Date().getTime();
                }

            }
        },
        add() {
            if(~this.$route.fullPath.indexOf("/add?")){
                return;
            }
            let url = this.$route.fullPath + '/add';
            this.$router.push({path:url});
        },
        edit(id) {
            if(~this.$route.fullPath.indexOf("/edit?")){
                return;
            }
            let url = this.$route.fullPath + '/edit?id='+id;
            this.$router.push({path:url});
        },
        close(){
            let i;
            if(this.$route.fullPath.indexOf('/detail/') !== -1){
                i = this.$route.fullPath.lastIndexOf('/detail/');

            }else{
                i = this.$route.fullPath.lastIndexOf('/');
            }
            let url = this.$route.fullPath.substring(0,i);
            this.closeCurPage(url);
        },
        toDetail(row) {
            if(~this.$route.fullPath.indexOf("/detail/")){
                return;
            }
            let url = this.$route.fullPath + '/detail/' + row.id;
            this.$router.push({path:url});
        },
        toPage(url){
            this.$router.push({path:url});
        },
        extend:$.extend,
        showBigImg(e){
            let img = $("<img>");
            img[0].src=e.target.src;
            let div = $("<div class='full-big-img'>").append(img);
            div.on("click",function(){
                $(this).remove();
            });
            $("body").append(div);
        },
    },
    mounted() {

    }
};

export const ruleTool ={
    data(){
        return {
            rules:{
                // 必填规则
                required(msg = '请输入') {
                    return { required: true, message: msg, trigger: 'change' };
                },
                // 税率规则
                cess(required=true,msg = '请输入100以下非负数'){
                    return { validator: formRule.cess, message: msg, trigger: 'change' };
                },
                // 金额规则
                money(required=true,msg = '请输入正确格式的金额'){
                    return { validator: formRule.money,required:required, message: msg, trigger: 'change' };
                },
                // 整数规则
                int(required=true, size=[], msg = '请输入正整数'){
                    return {validator: formRule.numberSize,required:required ,size:size, message: msg, trigger: 'change'};
                },
            },
        }
    },
}

export const statConfig = {
    methods: {
        // 公用饼图配置
        getChartPieOption() {
            return {
                color: ['#2a78fd', '#f73b3b', '#58d24c', '#ff5824', '#ff9600'],
                legend: {
                    show: false,
                    top: 40,
                    right: 30,
                    orient: 'vertical',
                    icon: "circle"
                },
                grid: {
                    left: "30px",
                    right: "30px",
                    top: "330px",
                    bottom: "20px",
                },
                series: {
                    radius: '40%',
                    center: ['22%', '50%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            formatter: '{b} {d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                        },
                    },
                },
            }
        },
    }
};

export const formRule = {
    /**
     * 通用验证 reg可自定义验证正则
     * 常用正则：http://note.youdao.com/noteshare?id=537934c2896cad5aa2cb50e323102d8e&sub=EE59464E3EDC46A08A5F71E4E928CC62
     * field: [{ validator: formRule.common, reg:/^[1][3,4,5,7,8][0-9]{9}$/, message: 'xxxx', trigger: 'change' }],
     */
    common(rule, value, callback){
        if(!rule.required && !value && value !== 0){
            return callback();
        }
        if(!rule.reg.test(value)){
            return callback(new Error(rule.message));
        }else{
            return callback();
        }
    },
    /**
     * 验证数字大小
     * field: [{ validator: formRule.number, size:[1,10], message: 'xxxx', trigger: 'change' }],
     */
    number(rule, value, callback) {
        if(!rule.required && !value && value !== 0){
            return callback();
        }
        if(isNaN(value)){
            return callback(new Error(rule.message));
        }else if(rule.size && rule.size.length == 2 && (value<rule.size[0]||value>rule.size[1])){
            return callback(new Error("请输入"+rule.size.join("-")+"的数字"));
        }else{
            return callback();
        }
    },
    /**
     * 验证数字长度
     * field: [{ validator: formRule.numberSize, size:[1,10], message: 'xxxx', trigger: 'change' }],
     */
    numberSize(rule, value, callback) {
        if(!rule.required && !value && value !== 0){
            return callback();
        }
        if(isNaN(value) || (rule.size && rule.size.length == 2 && (value<rule.size[0]||value>rule.size[1]))){
            return callback(new Error(rule.message));
        }else{
            return callback();
        }
    },
    /**
     * 验证整数
     * field: [{ validator: formRule.numberSize, size:[1,10], message: 'xxxx', trigger: 'change' }],
     */
    standardSize(rule, value, callback) {
        if(!rule.required && !value && value !== 0){
            return callback();
        }
        if(isNaN(value) || (rule.size && rule.size.length == 2 && (value<rule.size[0]||value>rule.size[1]))
            || (value.toString().indexOf(".") != -1) || (value.toString().charAt(0) == "0" && value.length > 1)){
            return callback(new Error(rule.message));
        }else{
            return callback();
        }
    },
    /**
     * 验证手机号码
     * field: [{ validator: formRule.phone, message: 'xxxx', trigger: 'change' }],
     */
    phone(rule, value, callback) {
        if(!rule.required && !value && value !== 0){
            return callback();
        }
        if (isNaN(value) || (value.length != 11) || (value.toString().indexOf(".") != -1)) {
            return callback(new Error(rule.message));
        } else {
            return callback();
        }
    },
    /**
     * 验证手机号码（与required配合使用，空值时不校验）
     */
    isMobilePhone(rule, value, callback) {
        if(!rule.required && !value && value !== 0) {//只有有值时才进行校验
            return callback();
        }else {
            let reg = /^((1[3-9][0-9])+\d{8})$/;
            if(reg.test(value)) {
                return callback();
            }else {
                return callback(new Error(rule.message));
            }
        }
    },
    /**
     * 验证固定电话（与required配合使用，空值时不校验）
     */
    isFixedPhone(rule, value, callback) {
        if(!rule.required && !value && value !== 0) {//只有有值时才进行校验
            return callback();
        }else {
            let reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            if(reg.test(value)) {
                return callback();
            }else {
                return callback(new Error(rule.message));
            }
        }
    },
    /**
     * 税率(<=100，2位小数)
     */
    cess(rule, value, callback) {
        if(!rule.required && !value && value !== 0){
            return callback();
        }else{
            let reg = /^\d{1,2}(?:\.\d{1,2})?$/;
            if(reg.test(value) || parseFloat(value) == 100) {
                return callback();
            }else {
                return callback(new Error(rule.message));
            }
        }
    },
    /**
     * 金额校验(11位整数，2位小数)
     * @param rule
     * @param value
     * @param callback
     */
    money(rule, value, callback) {
        if(!rule.required && !value && value !== 0){
            return callback();
        }else{
            let reg = /^\d{1,11}(?:\.\d{1,2})?$/;
            if(reg.test(value)) {
                return callback();
            }else {
                return callback(new Error(rule.message));
            }
        }
    },
    /**
     * 校验车牌号
     * @param rule
     * @param value
     * @param callBack
     */
    validatePlate(rule,value,callBack){
        if(!value){
            callBack();
        }else if(value.length>=7){
            var provinceArray=['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','黔','滇','藏','陕','甘','青','宁','新','台','港','澳']
            var plateProvince=value.substring(0,1);
            var plateNo=value.substring(1,value.length)
            if(provinceArray.indexOf(plateProvince)>0){
                if(/^[A-Z][A-Z0-9]{5,6}$/.test(plateNo)){
                    callBack();
                }else{
                    callBack(new Error('车牌号格式有误'));
                }
            }else{
                callBack(new Error('车牌号格式有误'));
            }
        }else{
            callBack(new Error('车牌号格式有误'));
        }
    },
    /**
     * 校验小数
     * @param rule
     * @param value
     * @param callBack
     */
    validateNumber(rule,value,callBack){
        if(!value){
            callBack();
        } else if (!(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value.replace(new RegExp(/,/g),'')) || /^(0|0[.]0|0[.]00)$/.test(value.replace(new RegExp(/,/g),'')))) {
            callBack(new Error('数字格式有误'));
        } else if( value>99999999999.99){
            callBack(new Error('您输入的金额太大'));
        } else {
            callBack();
        }
    }
};
