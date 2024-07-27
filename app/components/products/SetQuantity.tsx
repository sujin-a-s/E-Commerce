import { CartProductType } from "../ProductDetails";



interface SetQuantityProps {
    cartCounter? : boolean;
    cartProduct : CartProductType;
    handleQtyIncrease : () => void;
    handleQtyDecrease : () => void
}


export const SetQuantity : React.FC<SetQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return (
        <div className="flex gap-8 items-center">{cartCounter ? null : <div className="font-semibold">QUANTITY :</div>}
            <div className="flex gap-4 items-center text-base">
                <button className="border-[1.2px] border-slate-300 px-2 rounded" onClick={handleQtyDecrease}>-</button>
                <div>{cartProduct.quantity}</div>
                <button className="border-[1.2px] border-slate-300 px-2 rounded" onClick={handleQtyIncrease}>+</button>
            </div>
        </div>
    )
}