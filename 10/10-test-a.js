import axios from 'axios'
import assert from 'assert'




describe("Nodejs", () => {
    describe("Todo app(", () => {
        it('POST item', (done) => {
            axios.post('http://127.0.0.1/todo', {
                text: "methi"
            }).then((response) => {
                if(response.data.hasOwnProperty('id' && response.data.message === "Todo added to database successfuly :))")){
                    done()
                }else{
                    done(new Error())
                }
            }).catch((err) => {
                console.log(err);
            })
            assert.equal([1, 2, 3].indexOf(4), -1)
        })
    })
})