import { cartsModel } from "../../db/models/carts.model.js";
/* import { prodmanager } from "./productManagerMongo.js"; */

class CartsManager {
    async createCart() {
        const result = await cartsModel.create({products: []});
        return result;
    }


    async getCartProducts(cid) {
        const result = await cartsModel.findById(cid).populate("products.product");
        return result;                    
    }


    async addProductToCart(cid, pid){
        const selectedCart = await cartsModel.findById(cid);        
        const productIndex = selectedCart.products.findIndex(p => p.product.equals(pid));
    
            if (productIndex === -1) {

                selectedCart.products.push({
                    product:pid,
                    quantity: 1,
                });
                
            } else {
                selectedCart.products[productIndex].quantity++;
            }
            await selectedCart.save()
            return selectedCart
            //await cartsModel.updateOne({ _id: cid }, {products: selectedCart.products});            
            //return selectedCart;
        }
        async deleteProduct(cid,pid){
            const selectedCart = await cartsModel.findById(cid);
            const productIndex = selectedCart.products.findIndex(p => p.product.equals(pid));
            if (productIndex !== -1) {
                // Si se encontró el producto en el carrito, elimínalo del array de items
                selectedCart.products.splice(productIndex, 1);
            } else {
                console.log('El producto no se encontró en el carrito.');
            }
            await selectedCart.save()
            return selectedCart;
        }
    }    


export const cManager = new CartsManager();