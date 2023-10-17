import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";

function truncateText(text, maxWords) {
  const words = text.split(' ');
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(' ') + '...';
}

const Home = () => {
  const { items , status } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {items &&
              items?.map((product) => (
                <div key={product._id} className="product">
                  <div style={{ maxWidth: "100px" }}>
                  <img style={{ width: "200px", height: "150px" }} src={product.imageUrl} alt={truncateText(product.name, 3)} />
                  </div>
                  <h3>{truncateText(product.name, 3)}</h3>
                  <div className="details">
                    <span>{truncateText(product.description, 3)}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
