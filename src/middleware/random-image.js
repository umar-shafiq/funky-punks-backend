const {loadImage} = require('canvas')
var fs = require('fs');
const path = require('path')
const canvas = require('canvas')




const randomImage =async()=>{

try {
    const parts = ['body','bottom','footwear','top'];
    let images = [];
    let imageName = {}
 

    parts.forEach(async(item)=>{
        console.log("iteration ::",item)
        var files = fs.readdirSync(path.join(__dirname,`../../images/${item}`));
        let random = files[Math.floor(Math.random() * files.length)]
        imageName[`${item}`] = random
        const randomImage = await canvas.loadImage(path.join(__dirname,`../../images/${item}/${random}`));
        images.push(randomImage)
        


    })

    // /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
    // let chosenBody = files[Math.floor(Math.random() * files.length)] 

    // console.log("choosen body ::: ",chosenBody)

    // const body = await canvas.loadImage(path.join(__dirname,`../../images/body/${chosenBody}`));
    // console.log("body ffrom Helper :",body)
    return {images,imageName}
} catch (error) {
    console.log("server error", error);
    next(error)
}
    




}

module.exports = randomImage