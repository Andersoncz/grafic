import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import VendaMensal from './vendaMensal.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Deu erro ao Connected to MongoDB', error);
    }
};

connectDB();
//CREATE
app.post("/vendas", async (req, res) => {
    try {
        const novaVendaMensal = await VendaMensal.create(req.body);
        res.json(novaVendaMensal);
    } catch(error) {
        res.json({ error: error });
    }

    });
    //READ
    app.get("/vendas", async (req, res) => {
        try {
            const vendasMensais = await VendaMensal.find();
            res.json(vendasMensais);
        } catch(error) {
            res.json({ error: error });
        }
    });
    //UPDATE
    app.put("/vendas/:id", async (req, res) => {
        try {
            
            const novaVendaMensal = await VendaMensal.findByIdAndUpdate (
                req.params.id,
                req.body,
                 { new: true }
            );
            res.json(novaVendaMensal);
        } catch(error) {
            res.json({ error: error });
        }       
    }
    );

    //DELETE
    app.delete("/vendas/:id", async (req, res) => {
        try {
            await VendaMensal.findByIdAndDelete(req.params.id);
            res.json({ message: "Venda deletada com sucesso!" });   
        } catch(error) {
            res.json({ error: error });
        }
    }
    );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


