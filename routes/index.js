
const express= require('express');
const router=express.Router();

// home page
router.get('/', (req, res, next)=> {

  
  const {con}=req;
  //let data;
  const {user}=req.query;

  // var filter = "";
  let filter="";
  if (user) {
      filter = 'WHERE userid = ?';
  }

  con.query(`SELECT * FROM account ${filter}`, user, (err, rows)=> {
      if (err) {
          console.log(err);
      }
   
      let data=rows;
      // use index.ejs
      res.render('index', { title: 'Account Information', data, user});
  });

});

  //use userAdd.ejs
router.get('/add',(req, res,next)=>{
  res.render('userAdd',{title:'Add User'});

});

//add post
router.post('/userAdd',(req, res, next)=>{
    //var db=req.con;
    const {con}=req;
    const {userid,password,email}=req.body;


    const sql={
      userid,
      password,
      email,
    };
    console.log(sql);
    con.query('INSERT INTO account SET ?', sql,(err,rows)=>{  
        if(err){
            console.log(err);
        }
        res.setHeader('Content-Type','application/jason');
        res.redirect('/')
    });
});

// edit page
router.get('/userEdit', (req, res, next) =>{


  const {id}=req.query;
  const {con}=req;
  //let data="";

  con.query('SELECT * FROM account WHERE id = ?', id,(err, data)=>{
      if (err) {
          console.log(err);
      }

     
      //let data=rows
      res.render('userEdit', { title: 'Edit Account', data });
  });

});

router.post('/userEdit', (req, res, next)=> {


  const {con}=req;
  const {id}=req.body;
  const {userid,password,email}=req.body;



  const sql={
    userid,
    password,
    email,
  };
      con.query('UPDATE account SET ? WHERE id = ?', [sql, id],(err, data)=> {
      if (err) {
          console.log(err);
      }

      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});
//====================================================================
router.get('/userDelete', (req, res, next)=> {

  const {id}=req.query;
  const {con}=req;

      con.query('DELETE FROM account WHERE id = ?', id, (err, data)=>{
      if (err) {
          console.log(err);
      }
      res.redirect('/');
  });
});

module.exports = router;
