"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";


const incrementProductQuatity = async (productId: string) => {
    await new Promise(r => setTimeout(r, 3000));
    const cart = (await getCart()) ?? (await createCart()); // ?? is nullish coalescing operator

    const articleInCart = cart.items.find(item => item.productId === productId);

    if (articleInCart) {
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: {
                    update: {
                        where: { id: articleInCart.id },
                        data: { quantity: { increment: 1 } },
                    }
                }
            }
        })

        // await prisma.cartItem.update({
        //     where: { id: articleInCart.id },
        //     data: { quantity: { increment: 1 } }
        // })
    } else {
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: {
                    create: {
                        productId,
                        quantity: 1,
                    }
                }
            }
        })

        // await prisma.cartItem.create({
        //     data: {
        //         cartId: cart.id,
        //         productId,
        //         quantity: 1,
        //     }
        // })
    }

    revalidatePath("/products/[id]")
}

export default incrementProductQuatity;