import { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { formatVND } from '../../utils';

const FoodServiceCard = (p) => {
  const {
    img,
    name,
    price,
    id,
    quantity:orderedQty,
    handleAddBtnClick,
    inventory,
    restrictedMode
  } = p
  const [quantity, setQuantity] = useState(orderedQty);
  const [isValidApply, setIsValidApply] = useState(false)


  useEffect(() => {
      if(quantity === orderedQty) setIsValidApply(false)
      else if(quantity !== orderedQty) setIsValidApply(true)

  }, [quantity, orderedQty]);

  return (
    <div className="card">
      <img src={img} alt={name} className="lob-img" />
      <div className="content">
        <h5>{name} 
        {restrictedMode && <span>({orderedQty})</span>}
        </h5>
        <p className="price">{restrictedMode ? formatVND(Number(price) * orderedQty) :formatVND(price)}</p>

        {!restrictedMode && <div className="action-wrapper">
          <div className="quantity-group">
            <FaMinus
              className={quantity === 0 ? 'disable icon' : 'icon'}
              onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
            />
            <div className="quantity">
              <input
                type="number"
                value={quantity}
                onInput={(e) => setQuantity(Number(e.currentTarget.value))}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '3px',
                }}
              />
            </div>
            <FaPlus
              className="icon"
              onClick={() => setQuantity(quantity + 1)}
            />
          </div>
          <div className="btn-group">
            <div className="btn reset" onClick={() => setQuantity(0)}>
              reset
            </div>
            {isValidApply && <div
              className="btn"
              onClick={() => {
                handleAddBtnClick({ id, count: quantity, name, price }, () => {});
              }}
            >
              Save
            </div>}
          </div>
        </div>}
        <p className="inventory">
          <strong>Remain:</strong> {inventory}
        </p>
      </div>
    </div>
  );
};
export default FoodServiceCard;
