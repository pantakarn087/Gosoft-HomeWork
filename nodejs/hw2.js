

const  a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


  async function by (){ 
    let test = [];
    let re = [];
    
    for(let i=0;i<=24;i++){
        let o = i+1;
        // console.log(a[o]);
        re.push(a[o]);
         i++ 
         
        let u = i-1
        // console.log(a[u]); 
        re.push(a[u]);
 }

 //console.log(re)
 return re+test;
}

    function delaySaysuccess() {
    return new Promise((resolve, reject) => {
    setTimeout(()=>{
    resolve("success");
    }, 1000);
    });
    }

    async function longTimeHello(){
    await setTimeout(()=>{}, 1000); 
    return "Long Time Hello";
    }

    
    async function main(){
      try {
    let a = by();
    let b = await delaySaysuccess();
    let c = await longTimeHello();
    console.log(c);
    console.log(a);
    console.log(b);  
  } catch (error) {

    console.log("**********Error**********");
     
  }
    }
  
    main();
       



      