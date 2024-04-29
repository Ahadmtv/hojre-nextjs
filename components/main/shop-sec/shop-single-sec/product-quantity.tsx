import { Dispatch, FC, SetStateAction } from "react"
import persian from "persianjs"

interface Iprops {
    stock: number
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}
const ProductQuantity: FC<Iprops> = ({ quantity, setQuantity, stock }) => {

    //  تابع افزایش
    const handleUp = () => {
        setQuantity((prev) => prev === stock ? prev : prev + 1);
    }
    // تابع کاهش
    const handleDown = () => {
        setQuantity((prev) => prev === 1 ? prev : prev - 1);
    }
    return (
        <div className="flex">
            <div className=" rounded-r-lg cursor-pointer border-2 flex justify-center items-center text-2xl w-1/3 hover:bg-amber-300 duration-150 ease-linear select-none" onClick={handleUp}>+</div>
            <input className="pointer-events-none w-1/3 text-center border-y-2" type="text" value={persian(quantity).englishNumber().toString()} onChange={(e) => setQuantity(Number(e.target.value))} />
            <div className=" rounded-l-lg cursor-pointer border-2 flex justify-center items-center text-2xl w-1/3 hover:bg-amber-300 duration-150 ease-linear select-none" onClick={handleDown}>-</div>
        </div>
    )
}

export default ProductQuantity