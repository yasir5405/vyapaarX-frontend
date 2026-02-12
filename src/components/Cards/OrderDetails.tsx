import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return <div>OrderDetails</div>;
};

export default OrderDetails;
