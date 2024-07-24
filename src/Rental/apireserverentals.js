const { Router } = require('express');
const router = new Router();
const { connectToDatabase } = require('../../modules/mongoconect');
router.post('/', async (req, res) => {
    try {
        const { idrentals, selectedReservation } = req.body;
        const db = await connectToDatabase();
        const InsertRental = db.collection("rentals");
        const body = {
            idrent: idrentals,
            idreserve: selectedReservation,
        }
        const result = await InsertRental.insertOne(body);
        res.status(201).json("Rental successfully created");
    } catch (error) {
        res.status(500).json("error: " + error);
    }
});

router.get('/:idclients', async (req, res) =>{
    try {
        const {idclients} = req.params;
        const db = await connectToDatabase();
        const getReserves = db.collection("reservations");
        const query = {
            idclient: idclients,
            state: "Pending"
        }
        const result = await getReserves.find(query)
        .toArray();
        if(result.length){  
            res.status(200).json(result);
        }else{
            res.status(404).json("You don't have reservations");
        }
    } catch (error) {
        
    }
})

module.exports = router;