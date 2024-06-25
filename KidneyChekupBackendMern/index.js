const express = require("express");
const app = express()

app.use(express.json());

const user = [{
    name: 'john',
    kidneys: [
        { healthy: false, },
        { healthy: true, }
    ]
}]



function sum(n) {
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

//
app.get('/', (req, res) => {cd 
    const userName = user[0].name;
    const userKidneys = user[0].kidneys;
    const numOfKidneys = userKidneys.length;
    console.log(userName, numOfKidneys);
    let data = userKidneys.filter((val) => {
        return val.healthy === true;
    });
    let healthyKidneys = data.length;
    let unHealthyKidney = numOfKidneys - healthyKidneys
    
    res.json({
        numOfKidneys,
        healthyKidneys,
        unHealthyKidney
    })
})


app.post('/', (req, res) => {
    const isHealthy = req.body.isHealty;

    user[0].kidneys.push({ healthy: isHealthy });
    
    console.log(user[0].kidneys.length);
    res.send(`Added new kidneys`)
})


app.put('/', (req,res) => {
    user[0].kidneys.forEach((val) => {
        val.healthy = true;
    })

    res.json({
        msg: "Done"
    })
})


app.delete('/', (req, res) => {
    if(isThereAtLeastOneHealthyKidney()){
        let newHealthyKidneys =  [];
        user[0].kidneys.forEach((val) => {
            if (val.healthy === true) {
                newHealthyKidneys.push(val);
            }
        })
        user[0].kidneys = newHealthyKidneys;
        res.json({
            msg: "Done"
        })
    }else{
        res.status(411).json({
            msg : "you have came at wrong address"
        })
    }
})


function isThereAtLeastOneHealthyKidney() {
    let isThereAtLeastOneHealthyKidney = false
    for(let i = 0; i < user[0].kidneys.length; i++){
        if(!user[0].kidneys[i].healthy){
            isThereAtLeastOneHealthyKidney = true;
            break;
        }
    }
}

app.listen(3001, () => {
    console.log("Server is running on port 3000");
})