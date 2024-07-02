
interface ProductValidateProps {
    productName: string,
    category: string,
    price: number,
    image: File | null

}
const productValidate = ({ productName, category, price, image }: ProductValidateProps) => {
    const error: string[] = [];
    if (!/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/.test(productName))
        error.push('nameError')
    if (!/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/.test(category))
        error.push('categoryError')
    if (price < 100 || price > 100000)
        error.push('priceError')
    if (image === null || !(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(image.name)))
        error.push('imageError')
    return error
}

export default productValidate
