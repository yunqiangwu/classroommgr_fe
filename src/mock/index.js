import Mock from 'mockjs';
import {vuetable} from './vuetable.js';
import {datasource} from './datasource.js';

let data = [].concat(vuetable,datasource);

data.forEach(function(res){
    Mock.mock(res.path, res.data);
});
window.Mock = Mock;
export default Mock;
