
const Navebar = () => {
    return (
        <div className='flex justify-center space-x-5 py-2 border-y-2 border-gray-200 shadow-sm'>
            <div>
                ALL CATEGORIES
            </div>
            <div className='flex justify-center space-x-3'>
                <p>Cars</p>
                <p>Motorcycles</p>
                <p>Mobile Phones</p>
                <p>For Sale: House & Apartments</p>
                <p>Scooters</p>
                <p>Commercila & other vehicles</p>
                <p>For Rent: House & Apartments</p>
            </div>
        </div>
    )
}

export default Navebar
