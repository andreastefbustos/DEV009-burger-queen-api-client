import { createProduct, updateProduct } from '../../../api';
import { Params, redirect } from 'react-router-dom';

export async function createProductAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price =  formData.get("price") as unknown as number;
    const image =  formData.get("image") as string;
    const type =  formData.get("type") as string;
    const response = await createProduct(name, price, image, type);
    if (response.status !== 201) {
        return redirect("/error")
    }
    
    return redirect('/dashboard');
}

export async function updateProductAction({params, request}: {params: Params<string>, request: Request}) {
    const formData = await request.formData();
    const productId = params.id!;
    const name = formData.get("name") as string;
    const price =  formData.get("price") as unknown as number;
    const image =  formData.get("image") as string;
    const type =  formData.get("type") as string;
    const response = await updateProduct(productId, name, price,image,type);
    if (response.status !== 200) {
        return redirect("/error")
    }
    
    return redirect('/dashboard');
}