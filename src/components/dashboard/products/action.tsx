import { checkUnauthorize } from '../../../services/token';
import { createProduct, updateProduct } from '../../../services/products';
import { Params, redirect } from 'react-router-dom';
import { getFormData } from '../../../utilities/utils';

export async function createProductAction({ request }: { request: Request }) {
  const formData = await getFormData(request);
  const name = formData.name as string;
  const price =  formData.price as unknown as number;
  const image =  formData.image as string;
  const type =  formData.type as string;
  const response = await createProduct(name, price, image, type);

  if (checkUnauthorize(response)) {
    return redirect("/")
  }

  if (response.status !== 201) {
    return redirect("/error")
  }
  
  return redirect('/dashboard?tab=products');
}

export async function updateProductAction({params, request}: {params: Params<string>, request: Request}) {
  const formData = await getFormData(request);
  const productId = params.id!;
  const name = formData.name as string;
  const price =  formData.price as unknown as number;
  const image =  formData.image as string;
  const type =  formData.type as string;
  const response = await updateProduct(productId, name, price,image,type);
  
  if (checkUnauthorize(response)) {
    return redirect("/")
  }
  
  if (response.status !== 200) {
    return redirect("/error")
  }
  
  return redirect('/dashboard?tab=products');
}