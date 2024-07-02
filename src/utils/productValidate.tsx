
interface ProductValidateProps {
    productName: string,
    category: string,
    price: number,

}
const productValidate = ({ productName, category, price }: ProductValidateProps) => {
    const error: string[] = [];
    if (!/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/.test(productName))
        error.push('nameError')
    if (!/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/.test(category))
        error.push('categoryError')
    if (price < 100 || price > 100000)
        error.push('priceError')
    return error
}

export default productValidate
