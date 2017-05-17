let  Mock = require('mockjs');



// INSERT INTO `zxy`.`user_info` (`Id`, `username`, `password`, `usertype`, `enabled`, `realname`, `logo`, `qq`, `email`, `tel`, `student_group_ids`) VALUES ('1', 'test1', '12345678', '1', '1', '吴云强2', NULL, '842269153', '32323@qq.com', '18711180761', NULL);
// INSERT INTO `zxy`.`user_info` (`Id`, `username`, `password`, `usertype`, `enabled`, `realname`, `logo`, `qq`, `email`, `tel`, `student_group_ids`) VALUES ('2', 'test2', 'aaaa', '2', '1', '吴云强', NULL, '842269153', '32323@qq.com', '18711180761', NULL);


var data = Mock.mock({
  'data|120': [{
    'id|+1': 100,
    'username|+1': 201340922101,
    'password': '123456',
    'realname':'@cname',
    'qq':/[1-9]\d{4,10}/,
    'tel':/^1[34578]\d{9}$/,
    'email':'@email'
    // 'logo':'@image("24x24",@color,@cfirst)',


  }]
}).data.map(function(res){
  with(res){
    // return tel;
      var logo = Mock.mock('@image(24x24,@color,'+realname.substr(0,1)+')');
      return `INSERT INTO USER_INFO( username, password, usertype, enabled, realname, logo, qq, email, tel) VALUES('${username}','123456',2,1, '${realname}','${logo}','${qq}','${email}','${tel}');`;
  }

}).join("\n");


console.log(data)
