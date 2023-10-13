import FormSubmitButton from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Add Product - Teddy Store',
};

const addProduct = async (formData: FormData) => {
    'use server';

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price') || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error('Missing fields');
    }

    await prisma.products.create({
        data: {
            name,
            description,
            imageUrl,
            price,
        },
    });

    redirect('/');
};

const AddProductPage = () => {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add product</h1>
            <form action={addProduct}>
                <input
                    className="mb-3 w-full input input-bordered"
                    required
                    name="name"
                    placeholder="Name"
                />
                <textarea
                    required
                    name="description"
                    placeholder="Description"
                    className="textarea-bordered textarea mb-3 w-full"
                />
                <input
                    className="mb-3 w-full input input-bordered"
                    required
                    name="imageUrl"
                    placeholder="Image URL"
                    type="url"
                />
                <input
                    className="mb-3 w-full input input-bordered"
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                />
                <FormSubmitButton className="btn-block">
                    Add Product
                </FormSubmitButton>
            </form>
        </div>
    );
};

export default AddProductPage;
