var userSqlMap = {
    add: 'insert into user(username, password,node) values(?, ?,?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set username=?, password=? ,node=? where id=?',
    list: 'select * from user',
    getById: 'select * from user where id = ?',
    getByUsername: 'select * from user where username = ?'
};

module.exports = userSqlMap;